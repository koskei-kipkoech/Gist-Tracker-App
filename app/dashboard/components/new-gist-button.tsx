'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

export default function NewGistButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    router.push('/dashboard/gists/new')
  }

  return (
    <Button 
      onClick={handleClick}
      disabled={isLoading} 
      className="w-full sm:w-auto cursor-pointer bg-amber-700 hover:bg-amber-900 transform hover:scale-105 hover:shadow-md transition-all duration-200"
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
          Loading...
        </div>
      ) : (
        <>
          <PlusIcon className="mr-3 h-4 w-4"/>
          New Gist
        </>
      )}
    </Button>
  )
}