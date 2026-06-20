/**
 * @file POST /api/contact — Validate and process contact form submissions.
 * Returns { success: boolean; message?: string; error?: string }.
 * Optionally forwards via Nodemailer when SMTP env vars are configured.
 */
import { NextRequest, NextResponse } from 'next/server';

/* ──────── Validation helpers ──────── */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  locale?: string;
  source?: string;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

function validate(payload: ContactPayload): ValidationResult {
  const errors: string[] = [];

  if (!payload.name || payload.name.trim().length === 0) {
    errors.push('姓名不能为空');
  }

  if (!payload.email || payload.email.trim().length === 0) {
    errors.push('邮箱不能为空');
  } else if (!EMAIL_REGEX.test(payload.email.trim())) {
    errors.push('邮箱格式不正确');
  }

  if (!payload.message || payload.message.trim().length === 0) {
    errors.push('咨询内容不能为空');
  } else if (payload.message.trim().length < 10) {
    errors.push('咨询内容至少需要10个字符');
  }

  return { valid: errors.length === 0, errors };
}

/* ──────── Email notification (optional) ──────── */

async function trySendEmail(payload: ContactPayload): Promise<void> {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_EMAIL || 'contact@farhorizon-logistics.com';

  if (!host || !port || !user || !pass) {
    console.log('[Contact] SMTP not configured — skipping email notification');
    return;
  }

  try {
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.default.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: '"Logistics Website" <' + user + '>',
      to,
      subject: '[咨询] ' + payload.name + ' — ' + payload.email,
      text: [
        '收到新的咨询请求：',
        '',
        '姓名：' + (payload.name || '(未填写)'),
        '邮箱：' + (payload.email || '(未填写)'),
        '电话：' + (payload.phone || '(未填写)'),
        '语言：' + (payload.locale || '(未提供)'),
        '来源：' + (payload.source || 'contact_form'),
        '',
        '咨询内容：',
        payload.message || '',
      ].join('\n'),
    });

    console.log('[Contact] Email notification sent');
  } catch (err) {
    console.error('[Contact] Failed to send email notification:', err);
  }
}

/* ──────── Route handler ──────── */

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();
    const { name, email, phone, message, locale, source } = body;

    // Validation
    const { valid, errors } = validate({ name, email, phone, message, locale, source });

    if (!valid) {
      console.warn('[Contact] Validation failed:', errors.join('; '), '— payload:', {
        name: name || '(empty)',
        email: email || '(empty)',
        messageLength: message?.length ?? 0,
        locale: locale || '(not set)',
      });

      return NextResponse.json(
        { success: false, error: errors.join('；') },
        { status: 400 },
      );
    }

    // Logging
    const logEntry = {
      source: source || 'contact_form',
      name: name!.trim(),
      email: email!.trim(),
      phone: phone?.trim() || '(not provided)',
      locale: locale || '(not set)',
      message: message!.trim().slice(0, 500),
      receivedAt: new Date().toISOString(),
    };
    console.log('[Contact] Valid payload received:', logEntry);

    // Email notification (fire-and-forget)
    trySendEmail({ name, email, phone, message, locale, source }).catch(() => {});

    return NextResponse.json(
      { success: true, message: '提交成功' },
      { status: 200 },
    );
  } catch (err) {
    const errorMessage =
      err instanceof SyntaxError
        ? '请求数据格式错误，请检查JSON格式'
        : '服务器内部错误，请稍后重试';

    console.error('[Contact] Request processing failed:', err);

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: err instanceof SyntaxError ? 400 : 500 },
    );
  }
}