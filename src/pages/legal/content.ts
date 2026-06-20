// Legal document content for the on-domain /privacy and /terms pages.
//
// ponytail: this is PLACEHOLDER copy so the page + TOC are reviewable. Replace
// each section's `body` with the exact text from the Notion docs before ship
// (Privacy: beaker.notion.site/Kindred-Privacy-Policy-2afa5d52691580a7ac51d34b8e0f427a,
//  Terms:   beaker.notion.site/Kindred-Terms-of-Service-342a5d52691580aa94afc9f0b95d5100).
// Headings drive the floating TOC, so keep one section per TOC entry.

export type Block = string | { bullets: string[] }

export type LegalSection = {
  id: string
  heading: string
  body: Block[]
}

export type LegalDoc = {
  title: string
  lastUpdated: string
  intro: string
  sections: LegalSection[]
}

export const privacyDoc: LegalDoc = {
  title: 'Privacy Policy',
  lastUpdated: 'June 2026',
  intro:
    'Kindred is a social to-do list — a private record of what you get done, shared only with the people you choose. This policy explains what we collect, how we use it, and the control you have.',
  sections: [
    {
      id: 'information-we-collect',
      heading: 'Information we collect',
      body: [
        'When you create an account we collect your name, email address, and profile details you choose to add.',
        'As you use Kindred we store the tasks, workspaces, photos, and posts you create, along with the friends you connect with and the reactions you send.',
        { bullets: ['Account details you provide', 'Content you create in the app', 'Basic device and usage data needed to run the service'] },
      ],
    },
    {
      id: 'how-we-use-information',
      heading: 'How we use your information',
      body: [
        'We use your information to run Kindred: to sync your tasks across devices, show your activity to the friends you allow, and send notifications you have opted into.',
        'We do not sell your personal information.',
      ],
    },
    {
      id: 'sharing-and-privacy',
      heading: 'Sharing and visibility',
      body: [
        'Everything you create on Kindred is private by default. You choose what your friends can see and which tasks appear on your profile.',
        'Only your friends can see your posts and react to them. Kindred is built to be a close-friends app, and you decide who you connect with.',
      ],
    },
    {
      id: 'data-security',
      heading: 'Data security',
      body: [
        'We use industry-standard safeguards to protect your information in transit and at rest. No method of transmission or storage is ever completely secure, but we work to protect your data and respond promptly to any issues.',
      ],
    },
    {
      id: 'your-choices',
      heading: 'Your choices',
      body: [
        'You can edit or delete your content at any time, control what is visible to friends, and request deletion of your account and associated data.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      body: [
        'We may update this policy from time to time. When we do, we will revise the date above and, for material changes, notify you in the app.',
      ],
    },
    {
      id: 'contact',
      heading: 'Contact us',
      body: ['Questions about this policy? Email us at kindred@kindredtodo.com.'],
    },
  ],
}

export const termsDoc: LegalDoc = {
  title: 'Terms of Service',
  lastUpdated: 'June 2026',
  intro:
    'These terms govern your use of Kindred. By creating an account or using the app, you agree to them.',
  sections: [
    {
      id: 'acceptance',
      heading: 'Acceptance of terms',
      body: [
        'By accessing or using Kindred you agree to be bound by these terms. If you do not agree, please do not use the app.',
      ],
    },
    {
      id: 'eligibility',
      heading: 'Eligibility',
      body: ['You must be at least 13 years old to use Kindred.'],
    },
    {
      id: 'your-account',
      heading: 'Your account',
      body: [
        'You are responsible for keeping your account credentials secure and for all activity that happens under your account.',
      ],
    },
    {
      id: 'acceptable-use',
      heading: 'Acceptable use',
      body: [
        'You agree to use Kindred lawfully and respectfully. You will not:',
        { bullets: ['Harass, abuse, or harm other people', 'Post unlawful, infringing, or harmful content', 'Attempt to disrupt or reverse-engineer the service'] },
      ],
    },
    {
      id: 'your-content',
      heading: 'Your content',
      body: [
        'You retain ownership of the content you create on Kindred. You grant us the limited license needed to host and display that content to the people you choose to share it with.',
      ],
    },
    {
      id: 'termination',
      heading: 'Termination',
      body: [
        'You may stop using Kindred and delete your account at any time. We may suspend or terminate access if these terms are violated.',
      ],
    },
    {
      id: 'disclaimers',
      heading: 'Disclaimers',
      body: [
        'Kindred is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted or error-free.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to these terms',
      body: [
        'We may update these terms from time to time. Continued use of Kindred after changes take effect means you accept the revised terms.',
      ],
    },
    {
      id: 'contact',
      heading: 'Contact us',
      body: ['Questions about these terms? Email us at kindred@kindredtodo.com.'],
    },
  ],
}
