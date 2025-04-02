import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { compare, hash } from "bcryptjs"
import jwt from "jsonwebtoken"
import User, { type IUser } from "./models/user"
import connectDB from "./db"

const JWT_SECRET = process.env.JWT_SECRET as string

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set")
}

export async function hashPassword(password: string) {
  return await hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword)
}

export async function createUser(userData: Partial<IUser>) {
  await connectDB()

  const existingUser = await User.findOne({ email: userData.email })

  if (existingUser) {
    throw new Error("User already exists")
  }

  const hashedPassword = await hashPassword(userData.password!)

  const user = new User({
    ...userData,
    password: hashedPassword,
  })

  return await user.save()
}

export async function authenticateUser(email: string, password: string) {
  await connectDB()

  const user = await User.findOne({ email })

  if (!user) {
    throw new Error("User not found")
  }

  const isValid = await verifyPassword(password, user.password)

  if (!isValid) {
    throw new Error("Invalid password")
  }

  return user
}

export function generateToken(user: any) {
  return jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "1d" },
  )
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  await cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  })
}

export async function getAuthCookie() {
  const cookieStore = await cookies()
  return cookieStore.get("auth_token")?.value
}

export async function removeAuthCookie() {
  const cookieStore = await cookies()
  await cookieStore.delete("auth_token")
}

export async function getCurrentUser() {
  const token = await getAuthCookie()

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & { userId: string }
    await connectDB()
    const user = await User.findById(decoded.userId).select("-password")
    return user
  } catch (error) {
    return null
  }
}

export async function requireAuth(request: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  return user
}

