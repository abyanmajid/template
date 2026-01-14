import SignUpForm from '@/features/auth/components/sign-up-form'
import SignUpWithGoogleButton from '@/features/auth/components/sign-up-with-google-button'
import { Card, CardContent } from "@workspace/ui/components/card"
import { TextSeparator } from '@workspace/ui/components/text-separator'
import A3NxMutiaraLogo from '@/components/brand/a3n-x-mutiara-logo'
import StatementAgreeToPolicies from '@/features/auth/components/statement-agree-to-policies'

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-svh px-4">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="mb-8">
          <A3NxMutiaraLogo width={200} height={80} />
        </div>
        <Card className="w-full max-w-md">
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h1 className="text-2xl text-center">Create an account</h1>
              <p className="text-muted-foreground text-center">Sign up with your Google account</p>
            </div>
            <SignUpWithGoogleButton />
            <TextSeparator>Or</TextSeparator>
            <SignUpForm />
          </CardContent>
        </Card>
        <StatementAgreeToPolicies />
      </div>
    </div>
  )
}
