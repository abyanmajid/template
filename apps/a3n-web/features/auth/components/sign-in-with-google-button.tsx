"use client"

import { authClient } from '@/lib/auth-client'
import { toFE } from '@/lib/utils/tofe'
import { Button } from '@workspace/ui/components/button'
import { FcGoogle as GoogleIcon } from "react-icons/fc"

export default function SignInWithGoogleButton() {
  async function handleLogin() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: toFE("/"),
      errorCallbackURL: toFE("/sign-in?error=true"),
    })
  }

  return (
    <Button size="sm" onClick={handleLogin}>
      <GoogleIcon /> Sign in with Google
    </Button>
  )
}
