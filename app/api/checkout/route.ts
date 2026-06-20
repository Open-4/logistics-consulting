
import { NextRequest, NextResponse } from 'next/server';
function getStripe() { return new (require('stripe'))(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy'); }
const PRICE_ID = process.env.STRIPE_PRICE_ID || "price_placeholder";
export async function POST(request: NextRequest) {
  try {
    const { locale } = await request.json();
    const session = await getStripe().checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      success_url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://znkfhyq.xyz') + '/' + (locale || 'zh') + '/pricing?success=true',
      cancel_url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://znkfhyq.xyz') + '/' + (locale || 'zh') + '/pricing?canceled=true',
    });
    return NextResponse.json({ success: true, url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ success: false, error: 'Checkout failed' }, { status: 500 });
  }
}
