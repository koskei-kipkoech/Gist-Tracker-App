// lib/server-cookies.ts
import { cookies, CookieOptions } from "next/headers"
export async function setServerCookie(name: string, value: string, options: CookieOptions = {}) {
  const cookieStore = await cookies()
  cookieStore.set(name, value, options)
}

export async function getServerCookie(name: string) {
  const cookieStore = await cookies()
  return cookieStore.get(name)?.value
}

export async function deleteServerCookie(name: string) {
  const cookieStore = await cookies()
  cookieStore.delete(name)
}