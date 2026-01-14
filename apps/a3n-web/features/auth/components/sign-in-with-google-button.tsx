"use client"

import { authClient } from '@/lib/auth-client'
import { urls } from '@/lib/site'
import { toFE } from '@/lib/utils/tofe'
import { Button } from '@workspace/ui/components/button'
import { FaGoogle as GoogleIcon } from "react-icons/fa"

export default function SignInWithGoogleButton() {
  async function handleLogin() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: toFE(urls.home),
      errorCallbackURL: toFE(`${urls.signIn}?error=true`),
    })
  }

  return (
    <Button variant="outline" onClick={handleLogin} className="w-full">
      <GoogleIcon /> Sign in with Google
    </Button>
  )
}
