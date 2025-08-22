# Tatvacare HealthtechCRM

A production-ready CRM application for healthcare RFP to Quote management, built with Next.js 14 and TypeScript.

## Features

- **RFP Management**: Create and track RFPs with automatic opportunity creation
- **Pipeline Management**: Kanban-style opportunity tracking with stage management
- **Quote Builder**: CPQ system with Indian GST calculations (CGST/SGST/IGST)
- **Email Integration**: Send quotes directly from user's mailbox
- **E-Signature**: DocuSign/Adobe integration for contract signing
- **Audit Trail**: Complete audit logging with JSONL export
- **RBAC**: Role-based access control with Auth0 integration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Data Fetching**: TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Authentication**: NextAuth with Auth0 OIDC
- **API**: OpenAPI-generated client
- **Testing**: Playwright (optional)

## Environment Variables

Set these in your Vercel Project Settings:

### Required
- `NEXT_PUBLIC_API_BASE_URL` - Your API gateway URL
- `NEXTAUTH_URL` - Your app URL (auto-set by Vercel)
- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `AUTH0_DOMAIN` - Your Auth0 domain
- `AUTH0_CLIENT_ID` - Auth0 application client ID
- `AUTH0_CLIENT_SECRET` - Auth0 application client secret
- `AUTH0_ISSUER_BASE_URL` - Auth0 issuer URL
- `NEXT_PUBLIC_OPENID_AUDIENCE` - Auth0 API audience

### Optional Features
- `NEXT_PUBLIC_FEATURE_ESIGN=true` - Enable e-signature features
- `NEXT_PUBLIC_FEATURE_CALENDAR=false` - Calendar integration (future)
- `NEXT_PUBLIC_FEATURE_RAZORPAY=false` - Payment integration (future)

## Development

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Generate API types**:
   \`\`\`bash
   npm run codegen
   \`\`\`

3. **Start development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Type checking**:
   \`\`\`bash
   npm run typecheck
   \`\`\`

5. **Linting**:
   \`\`\`bash
   npm run lint
   \`\`\`

## Deployment

1. **Push to GitHub** and connect to Vercel
2. **Set environment variables** in Vercel Project Settings
3. **Deploy** - Vercel will automatically build and deploy

## API Integration

The app uses OpenAPI-generated types and client from `openapi/openapi_core.yaml`. To update:

1. Modify the OpenAPI spec
2. Run `npm run codegen` to regenerate types
3. Update API client methods if needed

## Project Structure

\`\`\`
src/
├── api/           # Generated API client and types
├── components/    # React components
├── hooks/         # Custom hooks including API hooks
├── providers/     # Context providers
└── app/           # Next.js app router pages

openapi/
└── openapi_core.yaml  # API specification
\`\`\`

## User Roles

- **admin**: Full system access
- **sales_manager**: Team management and reporting
- **sales_rep**: Create RFPs, opportunities, quotes
- **pricing_approver**: Approve quote pricing
- **viewer**: Read-only access

## Currency & Localization

- **Currency**: Indian Rupees (₹)
- **Locale**: en-IN
- **Tax System**: GST with CGST/SGST/IGST calculations
