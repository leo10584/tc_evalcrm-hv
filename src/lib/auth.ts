import type { NextAuthOptions } from "next-auth"

export interface UserRole {
  admin: boolean
  sales_manager: boolean
  sales_rep: boolean
  pricing_approver: boolean
  viewer: boolean
}

export interface ExtendedUser {
  id: string
  email: string
  name: string
  roles: UserRole
}

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "auth0",
      name: "Auth0",
      type: "oauth",
      wellKnown: `${process.env.AUTH0_ISSUER_BASE_URL}/.well-known/openid_configuration`,
      authorization: {
        params: {
          scope: "openid email profile",
          audience: process.env.NEXT_PUBLIC_OPENID_AUDIENCE,
        },
      },
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      client: {
        authorization_signed_response_alg: "HS256",
        id_token_signed_response_alg: "HS256",
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          roles: profile[`${process.env.NEXT_PUBLIC_OPENID_AUDIENCE}/roles`] || {},
        }
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token
        token.roles = user.roles
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.roles = token.roles as UserRole
        session.accessToken = token.accessToken as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
}

export function hasRole(user: ExtendedUser | null, role: keyof UserRole): boolean {
  return user?.roles?.[role] === true
}

export function canAccessResource(user: ExtendedUser | null, resource: string): boolean {
  if (!user) return false

  // Admin can access everything
  if (hasRole(user, "admin")) return true

  switch (resource) {
    case "dashboard":
      return true // All authenticated users can view dashboard
    case "rfp":
      return hasRole(user, "sales_rep") || hasRole(user, "sales_manager")
    case "pipeline":
      return hasRole(user, "sales_rep") || hasRole(user, "sales_manager")
    case "quotes":
      return hasRole(user, "sales_rep") || hasRole(user, "sales_manager") || hasRole(user, "pricing_approver")
    case "reports":
      return hasRole(user, "sales_manager") || hasRole(user, "admin")
    case "audit":
      return hasRole(user, "admin") || hasRole(user, "sales_manager")
    default:
      return hasRole(user, "viewer")
  }
}
