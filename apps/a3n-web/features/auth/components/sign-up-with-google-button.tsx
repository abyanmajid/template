"use client"

import { authClient } from '@/lib/auth-client'
import { urls } from '@/lib/site'
import { toFE } from '@/lib/utils/tofe'
import { Button } from '@workspace/ui/components/button'
import { FaGoogle as GoogleIcon } from "react-icons/fa"

export default function SignUpWithGoogleButton() {
  async function handleSignUp() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: toFE(urls.home),
      errorCallbackURL: toFE(`${urls.signUp}?error=true`),
    })
  }

  return (
    <Button variant="outline" onClick={handleSignUp} className="w-full">
      <GoogleIcon /> Sign up with Google
    </Button>
  )
}
