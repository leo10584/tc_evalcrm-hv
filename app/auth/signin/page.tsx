"use client"

import { signIn, getSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignIn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push(callbackUrl)
      }
    })
  }, [router, callbackUrl])

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("auth0", { callbackUrl })
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
            <span className="text-primary-foreground font-bold text-lg">TC</span>
          </div>
          <CardTitle className="text-2xl">Welcome to Tatvacare CRM</CardTitle>
          <CardDescription>Sign in to access your healthcare CRM dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSignIn} disabled={isLoading} className="w-full" size="lg">
            {isLoading ? "Signing in..." : "Sign in with Auth0"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
