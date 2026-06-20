import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/pages/legal/LegalPage'
import { termsDoc } from '@/pages/legal/content'

export const Route = createFileRoute('/terms')({
  component: () => <LegalPage doc={termsDoc} />,
})
