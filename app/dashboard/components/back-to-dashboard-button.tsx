'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function BackToDashboardButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      variant="outline"
      className="w-full sm:w-auto cursor-pointer bg-blue-500 hover:bg-blue-600 transform hover:scale-105 hover:shadow-md transition-all duration-200"
      size="sm"
      onClick={() => startTransition(() => router.push('/dashboard'))}
      disabled={isPending}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {isPending ? 'Loading...' : 'Back to Dashboard'}
    </Button>
  )
}