/**
 * @file GET /api/debug — Environment variable diagnostics (safe values only).
 * Returns { success: boolean; data: { env, node, platform } }.
 */
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const safeEnv: Record<string, string | undefined> = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    VERCEL_REGION: process.env.VERCEL_REGION,
  };

  return NextResponse.json({
    success: true,
    data: {
      env: safeEnv,
      node: process.version,
      platform: process.platform,
      arch: process.arch,
    },
  });
}