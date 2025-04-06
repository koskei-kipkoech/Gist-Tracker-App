import { NextResponse } from 'next/server'
import { authenticateUser, generateToken, setAuthCookie, removeAuthCookie, getCurrentUser } from '@/lib/server-auth'

export async function POST(request: Request) {
  try {
    const { email, password} = await request.json()
    const user = await authenticateUser(email, password)
    const token = generateToken(user)
    await setAuthCookie(token)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    return NextResponse.json(user)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }
}

export async function DELETE() {
  try {
    await removeAuthCookie()
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}