import json
import os
import smtplib
import base64
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

TO_EMAIL = "Tb-2211@yandex.ru"
FROM_EMAIL = "Tb-2211@yandex.ru"


def create_html_email(name: str, phone: str, comment: str) -> str:
    """Создаёт HTML-письмо о новой заявке"""
    rows = ""
    if name:
        rows += f"<tr><td style='padding:8px 0;color:#888;width:140px;'>Имя</td><td style='padding:8px 0;font-weight:bold;'>{name}</td></tr>"
    if phone:
        rows += f"<tr><td style='padding:8px 0;color:#888;'>Телефон</td><td style='padding:8px 0;color:#e85d04;font-weight:bold;'>{phone}</td></tr>"

    return f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#111;color:#eee;padding:24px;border:1px solid #333;">
      <div style="background:#e85d04;color:#fff;padding:12px 20px;margin-bottom:24px;">
        <h2 style="margin:0;font-size:18px;letter-spacing:2px;">НОВАЯ ЗАЯВКА — ТБ №2211</h2>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        {rows}
      </table>
      <div style="margin-top:16px;border-top:1px solid #333;padding-top:16px;">
        <div style="color:#888;margin-bottom:8px;">Описание задачи</div>
        <div style="background:#1a1a1a;padding:12px;border-left:3px solid #e85d04;white-space:pre-wrap;">{comment or "—"}</div>
      </div>
    </div>
    """


def send_email(html_content: str):
    """Отправляет письмо через SMTP Яндекса"""
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    if not smtp_password:
        raise ValueError("SMTP_PASSWORD not configured")

    msg = MIMEMultipart("mixed")
    msg["Subject"] = "Новая заявка с сайта ТБ №2211"
    msg["From"] = FROM_EMAIL
    msg["To"] = TO_EMAIL
    msg.attach(MIMEText(html_content, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
        server.login(FROM_EMAIL, smtp_password)
        server.sendmail(FROM_EMAIL, TO_EMAIL, msg.as_string())


def handler(event: dict, context) -> dict:
    """Принимает заявку с сайта и отправляет письмо на почту"""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "")
    phone = body.get("phone", "")
    comment = body.get("comment", "")

    html_content = create_html_email(name, phone, comment)
    send_email(html_content)

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True}),
    }
