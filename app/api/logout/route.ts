import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ success: true })

  // Expire the token immediately
  res.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  return res
}
