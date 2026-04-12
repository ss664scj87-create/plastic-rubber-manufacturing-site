import json
import os
import smtplib
import base64
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

TO_EMAIL = "Up8002211@yandex.ru"
FROM_EMAIL = "Up8002211@yandex.ru"


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта ТБ №2211 на почту Up8002211@yandex.ru"""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token, X-Session-Id",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")

    email = body.get("email", "—")
    comment = body.get("comment", "—")
    file_base64 = body.get("fileBase64")
    file_name = body.get("fileName", "attachment")

    subject = "Новая заявка с сайта ТБ №2211"

    file_note = f"<div style='margin-top: 16px; color: #888; font-size: 12px;'>Файл прикреплён: {file_name}</div>" if file_base64 else ""

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #eee; padding: 24px; border: 1px solid #333;">
      <div style="background: #e85d04; color: #fff; padding: 12px 20px; margin-bottom: 24px;">
        <h2 style="margin: 0; font-size: 18px; letter-spacing: 2px;">НОВАЯ ЗАЯВКА — ТБ №2211</h2>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #888; width: 140px;">Email клиента</td><td style="padding: 8px 0; color: #e85d04; font-weight: bold;">{email}</td></tr>
      </table>
      <div style="margin-top: 16px; border-top: 1px solid #333; padding-top: 16px;">
        <div style="color: #888; margin-bottom: 8px;">Описание задачи</div>
        <div style="background: #1a1a1a; padding: 12px; border-left: 3px solid #e85d04; white-space: pre-wrap;">{comment or "—"}</div>
      </div>
      {file_note}
    </div>
    """

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    if not smtp_password:
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True, "note": "no smtp"})}

    msg = MIMEMultipart("mixed")
    msg["Subject"] = subject
    msg["From"] = FROM_EMAIL
    msg["To"] = TO_EMAIL
    msg.attach(MIMEText(html, "html", "utf-8"))

    if file_base64:
        file_data = base64.b64decode(file_base64)
        part = MIMEBase("application", "octet-stream")
        part.set_payload(file_data)
        encoders.encode_base64(part)
        part.add_header("Content-Disposition", f'attachment; filename="{file_name}"')
        msg.attach(part)

    with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
        server.login(FROM_EMAIL, smtp_password)
        server.sendmail(FROM_EMAIL, TO_EMAIL, msg.as_string())

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True}),
    }
