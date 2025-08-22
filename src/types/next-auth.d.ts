import type { UserRole } from "@/lib/auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      roles: UserRole
    }
    accessToken: string
  }

  interface User {
    roles: UserRole
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    roles?: UserRole
  }
}
