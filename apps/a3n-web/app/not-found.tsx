import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@workspace/ui/components/button'
import { IconHome } from '@tabler/icons-react'
import { getSession } from '@/features/auth/api'

export default async function NotFound() {
  const session = await getSession()

  // Redirect unauthenticated users to sign-in
  if (!session) {
    redirect('/sign-in')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-8">
          <h1 className="mb-2 text-9xl font-bold text-primary">404</h1>
          <div className="mb-4 h-1 w-24 bg-primary/20 mx-auto rounded-full" />
        </div>

        <h2 className="mb-3 text-2xl font-semibold text-foreground">
          Page Not Found
        </h2>

        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Button asChild variant="default" size="lg">
          <Link href="/">
            <IconHome className="mr-2 size-4" />
            Go to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
