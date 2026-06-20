/**
 * @file POST /api/chat — AI-powered logistics consulting chat.
 * Calls DeepSeek API with logistics expert system prompt.
 * Returns { success: boolean; reply?: string; error?: string }.
 */
import { NextRequest, NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';

const SYSTEM_PROMPT_ZH =
  '你是一个国际物流咨询专家助手。你的知识范围包括：国际货运代理、海关合规、供应链优化、跨境电商物流、项目物流、行业政策法规。回答要专业、简洁、有帮助。如果用户的问题超出你的知识范围，诚实地说"这个问题我需要进一步确认，建议您留下联系方式，我们的专家会为您详细解答。"请用中文回答。';

const SYSTEM_PROMPT_EN =
  'You are an international logistics consulting expert assistant. Your expertise includes: freight forwarding, customs compliance, supply chain optimization, cross-border e-commerce logistics, project logistics, and industry regulations. Answer professionally, concisely, and helpfully. If a question is beyond your knowledge, honestly say: "I need to verify this. Please leave your contact information and our expert will get back to you." Please respond in English.';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, locale, history } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    // Build context from conversation history
    const systemPrompt = locale === 'zh' ? SYSTEM_PROMPT_ZH : SYSTEM_PROMPT_EN;
    const messages: ChatMessage[] = [{ role: 'system', content: systemPrompt }];

    if (Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content.slice(0, 2000) });
        }
      }
    }

    messages.push({ role: 'user', content: message.trim().slice(0, 2000) });

    // No API key configured — return friendly fallback
    if (!DEEPSEEK_API_KEY) {
      const fallbackReply = locale === 'zh'
        ? '感谢您的咨询！我们的AI助手正在配置中，暂时无法自动回复。请通过邮件联系 contact@farhorizon-logistics.com，或使用网站右下角聊天功能留言（工作日24小时内回复），我们的专家将在24小时内为您解答。'
        : 'Thank you for your inquiry! Our AI assistant is being configured and cannot auto-reply at the moment. Please email contact@farhorizon-logistics.com or use the chat widget (reply within 24 hours on business days). Our experts will respond within 24 hours.';
      console.log('[Chat] Fallback (no API key):', message.slice(0, 100));
      return NextResponse.json({ success: true, reply: fallbackReply });
    }

    // Call DeepSeek API
    const response = await fetch(`${DEEPSEEK_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => 'Unknown error');
      console.error('[Chat] DeepSeek API error:', response.status, errText.slice(0, 200));
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) throw new Error('Empty response from API');

    console.log('[Chat] Success:', {
      messageLength: message.length,
      replyLength: reply.length,
      locale,
    });

    return NextResponse.json({ success: true, reply });
  } catch (err) {
    console.error('[Chat] Error:', err);
    const friendlyMessage =
      '当前AI服务繁忙，请稍后再试，或发送邮件至 contact@farhorizon-logistics.com（工作日24小时内回复）。';
    return NextResponse.json({ success: true, reply: friendlyMessage });
  }
}
