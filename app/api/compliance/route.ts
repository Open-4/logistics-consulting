/**
 * @file POST /api/compliance — AI-powered HS code compliance check.
 */
import { NextRequest, NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';

export async function POST(request: NextRequest) {
  try {
    const { hsCode, destination, locale } = await request.json();
    if (!hsCode || !destination) {
      return NextResponse.json({ success: false, error: 'HS code and destination are required' }, { status: 400 });
    }
    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json({ success: false, error: 'AI service not configured', fallback: true }, { status: 200 });
    }

    const systemPrompt = locale === 'zh'
      ? '你是一个专业的国际海关合规专家。用户会提供一个HS编码和目的国。请提供：1. 基础关税税率 2. 需要的清关文件清单 3. 特殊认证要求 4. 注意事项。用中文简洁回答。'
      : 'You are a professional customs compliance expert. Provide: 1. Basic tariff rate 2. Required customs documents 3. Special certifications 4. Notes. Answer concisely.';

    const userPrompt = (locale === 'zh'
      ? '查询HS编码 ' + hsCode + ' 出口到 ' + destination + ' 的关税和合规要求'
      : 'Check HS code ' + hsCode + ' exporting to ' + destination + ' for tariff and compliance');

    const response = await fetch(DEEPSEEK_BASE_URL + '/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + DEEPSEEK_API_KEY },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      return NextResponse.json({ success: false, error: 'AI service error', fallback: true }, { status: 200 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';
    return NextResponse.json({ success: true, data: { reply, hsCode, destination } });
  } catch (err) {
    console.error('Compliance API error:', err);
    return NextResponse.json({ success: false, error: 'Service unavailable', fallback: true }, { status: 200 });
  }
}
