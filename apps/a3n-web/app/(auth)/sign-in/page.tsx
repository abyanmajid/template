import SignInForm from '@/features/auth/components/sign-in-form'
import SignInWithGoogleButton from '@/features/auth/components/sign-in-with-google-button'
import { Card, CardContent } from "@workspace/ui/components/card"
import { TextSeparator } from '@workspace/ui/components/text-separator'
import A3NxMutiaraLogo from '@/components/brand/a3n-x-mutiara-logo'
import StatementAgreeToPolicies from '@/features/auth/components/statement-agree-to-policies'

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-svh px-4">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="mb-8">
          <A3NxMutiaraLogo width={200} height={80} />
        </div>
        <Card className="w-full max-w-md">
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h1 className="text-2xl text-center">Welcome back!</h1>
              <p className="text-muted-foreground text-center">Sign in with your Google account</p>
            </div>
            <SignInWithGoogleButton />
            <TextSeparator>Or</TextSeparator>
            <SignInForm />
          </CardContent>
        </Card>
        <StatementAgreeToPolicies />
      </div>
    </div>
  )
}
