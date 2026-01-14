"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { Field, FieldError, FieldLabel, FieldGroup } from '@workspace/ui/components/field'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import Link from 'next/link'

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
})

type IFormSchema = z.infer<typeof formSchema>

export default function ForgotPasswordForm() {
  const form = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: IFormSchema) {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">
                Email
              </FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="john.doe@example.com"
                autoComplete="email"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" className="w-full">
        Send Reset Link
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Remember your password? <Link href="/sign-in" className="underline">Sign in</Link>
      </p>
    </form>
  )
}
