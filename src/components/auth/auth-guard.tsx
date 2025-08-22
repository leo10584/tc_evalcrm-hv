"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { canAccessResource } from "@/lib/auth"

interface AuthGuardProps {
  children: React.ReactNode
  resource?: string
  fallback?: React.ReactNode
}

export function AuthGuard({ children, resource, fallback }: AuthGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/signin")
      return
    }

    if (resource && !canAccessResource(session.user, resource)) {
      router.push("/unauthorized")
      return
    }
  }, [session, status, resource, router])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return fallback || null
  }

  if (resource && !canAccessResource(session.user, resource)) {
    return fallback || null
  }

  return <>{children}</>
}
