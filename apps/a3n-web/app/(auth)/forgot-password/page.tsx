import ForgotPasswordForm from '@/features/auth/components/forgot-password-form'
import { Card, CardContent } from "@workspace/ui/components/card"
import A3NxMutiaraLogo from '@/components/brand/a3n-x-mutiara-logo'

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-svh px-4">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="mb-8">
          <A3NxMutiaraLogo width={200} height={80} />
        </div>
        <Card className="w-full max-w-md">
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h1 className="text-2xl text-center">Reset your password</h1>
              <p className="text-muted-foreground text-center">We'll send you a link to reset your password</p>
            </div>
            <ForgotPasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
