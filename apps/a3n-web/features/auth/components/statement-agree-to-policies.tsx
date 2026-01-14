import { urls } from '@/lib/site'
import Link from 'next/link'

export default function StatementAgreeToPolicies() {
  return (
    <p className="mt-4 w-full max-w-xs text-center text-xs text-muted-foreground">
      By proceeding, you confirm that you agree to our <Link href={urls.termsOfService} className="underline">Terms of Service</Link> and <Link href={urls.privacyPolicy} className="underline">Privacy Policy</Link>
    </p>
  )
}
