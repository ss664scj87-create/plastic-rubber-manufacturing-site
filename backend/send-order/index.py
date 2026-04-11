import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

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

    name = body.get("name", "—")
    company = body.get("company", "—")
    phone = body.get("phone", "—")
    email = body.get("email", "—")
    material = body.get("material", "—")
    quantity = body.get("quantity", "—")
    comment = body.get("comment", "—")

    subject = f"Новая заявка с сайта ТБ №2211 — {name}"

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #eee; padding: 24px; border: 1px solid #333;">
      <div style="background: #e85d04; color: #fff; padding: 12px 20px; margin-bottom: 24px;">
        <h2 style="margin: 0; font-size: 18px; letter-spacing: 2px;">НОВАЯ ЗАЯВКА — ТБ №2211</h2>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #888; width: 140px;">Имя</td><td style="padding: 8px 0; font-weight: bold;">{name}</td></tr>
        <tr><td style="padding: 8px 0; color: #888;">Компания</td><td style="padding: 8px 0;">{company}</td></tr>
        <tr><td style="padding: 8px 0; color: #888;">Телефон</td><td style="padding: 8px 0; color: #e85d04; font-weight: bold;">{phone}</td></tr>
        <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;">{email}</td></tr>
        <tr><td style="padding: 8px 0; color: #888;">Материал</td><td style="padding: 8px 0;">{material}</td></tr>
        <tr><td style="padding: 8px 0; color: #888;">Количество</td><td style="padding: 8px 0;">{quantity}</td></tr>
      </table>
      <div style="margin-top: 16px; border-top: 1px solid #333; padding-top: 16px;">
        <div style="color: #888; margin-bottom: 8px;">Описание задачи</div>
        <div style="background: #1a1a1a; padding: 12px; border-left: 3px solid #e85d04;">{comment or "—"}</div>
      </div>
    </div>
    """

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    if not smtp_password:
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True, "note": "no smtp"})}

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = FROM_EMAIL
    msg["To"] = TO_EMAIL
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
        server.login(FROM_EMAIL, smtp_password)
        server.sendmail(FROM_EMAIL, TO_EMAIL, msg.as_string())

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True}),
    }
