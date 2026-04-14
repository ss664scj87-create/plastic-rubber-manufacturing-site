import json
import os
import smtplib
import base64
import email
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from email.parser import BytesParser
from email.policy import default
import re

TO_EMAIL = "Up8002211@yandex.ru"
FROM_EMAIL = "Up8002211@yandex.ru"

def parse_email_content(raw_email: str):
    """Парсит входящее письмо и извлекает поля формы"""
    # Парсим email
    msg = BytesParser(policy=default).parsebytes(raw_email.encode('utf-8'))
    
    # Получаем тело письма
    body = ""
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain":
                body = part.get_content()
                break
            elif part.get_content_type() == "text/html":
                body = part.get_content()
    else:
        body = msg.get_content()
    
    # Пытаемся распарсить как JSON
    try:
        data = json.loads(body)
        email_addr = data.get("email", "—")
        comment = data.get("comment", "—")
        file_base64 = data.get("fileBase64")
        file_name = data.get("fileName", "attachment")
    except:
        # Если не JSON, пробуем извлечь из текста
        email_addr = extract_email_from_text(body)
        comment = body
        file_base64 = None
        file_name = None
        
        # Ищем вложения
        for part in msg.iter_attachments():
            file_base64 = base64.b64encode(part.get_content()).decode('utf-8')
            file_name = part.get_filename()
            break
    
    return email_addr, comment, file_base64, file_name

def extract_email_from_text(text: str) -> str:
    """Извлекает email из текста"""
    pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    match = re.search(pattern, text)
    return match.group(0) if match else "—"

def create_html_email(email: str, comment: str, file_name: str = None) -> str:
    """Создает HTML письмо для отправки"""
    file_note = f"<div style='margin-top: 16px; color: #888; font-size: 12px;'>Файл прикреплён: {file_name}</div>" if file_name else ""
    
    return f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #eee; padding: 24px; border: 1px solid #333;">
      <div style="background: #e85d04; color: #fff; padding: 12px 20px; margin-bottom: 24px;">
        <h2 style="margin: 0; font-size: 18px; letter-spacing: 2px;">НОВАЯ ЗАЯВКА — ТБ №2211</h2>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #888; width: 140px;">Email клиента</td>
        <td><td style="padding: 8px 0; color: #e85d04; font-weight: bold;">{email}</td>
        </tr>
      </table>
      <div style="margin-top: 16px; border-top: 1px solid #333; padding-top: 16px;">
        <div style="color: #888; margin-bottom: 8px;">Описание задачи</div>
        <div style="background: #1a1a1a; padding: 12px; border-left: 3px solid #e85d04; white-space: pre-wrap;">{comment or "—"}</div>
      </div>
      {file_note}
    </div>
    """

def send_email_via_smtp(html_content: str, attachment_data: tuple = None):
    """Отправляет письмо через SMTP"""
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    if not smtp_password:
        raise ValueError("SMTP_PASSWORD not configured")
    
    msg = MIMEMultipart("mixed")
    msg["Subject"] = "Новая заявка с сайта ТБ №2211"
    msg["From"] = FROM_EMAIL
    msg["To"] = TO_EMAIL
    msg.attach(MIMEText(html_content, "html", "utf-8"))
    
    if attachment_data:
        file_data, file_name = attachment_data
        part = MIMEBase("application", "octet-stream")
        part.set_payload(file_data)
        encoders.encode_base64(part)
        part.add_header("Content-Disposition", f'attachment; filename="{file_name}"')
        msg.attach(part)
    
    with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
        server.login(FROM_EMAIL, smtp_password)
        server.sendmail(FROM_EMAIL, TO_EMAIL, msg.as_string())

def handler(event: dict, context) -> dict:
    """Обрабатывает входящие письма от триггера Яндекс Облака"""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token, X-Session-Id",
    }
    
    # Обработка CORS preflight
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}
    
    try:
        # Определяем источник вызова
        if "messages" in event:
            # Вызов от почтового триггера Яндекс Облака
            print("Processing email from Yandex Cloud trigger")
            
            for message in event.get("messages", []):
                # Извлекаем содержимое письма
                raw_email = message.get("message", "")
                if not raw_email:
                    continue
                
                # Парсим письмо
                email_addr, comment, file_base64, file_name = parse_email_content(raw_email)
                
                # Создаем HTML письмо
                html_content = create_html_email(email_addr, comment, file_name)
                
                # Отправляем письмо
                attachment = None
                if file_base64:
                    file_data = base64.b64decode(file_base64)
                    attachment = (file_data, file_name or "attachment")
                
                send_email_via_smtp(html_content, attachment)
                
        elif event.get("httpMethod"):
            # Прямой HTTP запрос (для обратной совместимости)
            print("Processing direct HTTP request")
            
            body = json.loads(event.get("body") or "{}")
            
            email_addr = body.get("email", "—")
            comment = body.get("comment", "—")
            file_base64 = body.get("fileBase64")
            file_name = body.get("fileName", "attachment")
            
            html_content = create_html_email(email_addr, comment, file_name)
            
            attachment = None
            if file_base64:
                file_data = base64.b64decode(file_base64)
                attachment = (file_data, file_name)
            
            send_email_via_smtp(html_content, attachment)
        else:
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"error": "Unsupported event format"}),
            }
        
        print("Email sent successfully")
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"ok": True}),
        }
        
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Invalid JSON format"}),
        }
    except ValueError as e:
        print(f"Value error: {e}")
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": str(e)}),
        }
    except Exception as e:
        print(f"Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": "Internal server error"}),
        }