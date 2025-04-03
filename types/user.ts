export interface User {
  id?: string
  name: string
  email: string
  githubUsername?: string
  bio?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ApiError {
  message: string
  code?: string
  status?: number
}