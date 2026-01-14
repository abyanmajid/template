"use client"

import { authClient } from '@/lib/auth-client'
import { urls } from '@/lib/site'
import { Button } from '@workspace/ui/components/button'
import { useRouter } from 'next/navigation'
import { LogOutIcon } from 'lucide-react'

export default function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(urls.signIn)
        }
      }
    })
  }

  return (
    <Button onClick={handleSignOut}>
      <LogOutIcon /> Sign Out
    </Button>
  )
}
