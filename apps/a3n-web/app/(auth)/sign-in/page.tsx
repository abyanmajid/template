import SignInWithGoogleButton from '@/features/auth/components/sign-in-with-google-button'

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <SignInWithGoogleButton />
      </div>
    </div>
  )
}
