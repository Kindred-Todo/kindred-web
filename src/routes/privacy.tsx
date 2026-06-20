import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/pages/legal/LegalPage'
import { privacyDoc } from '@/pages/legal/content'

export const Route = createFileRoute('/privacy')({
  component: () => <LegalPage doc={privacyDoc} />,
})
