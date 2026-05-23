# BeHEALTH

BeHEALTH is a crowdfunding platform for women and children facing health and medical challenges. It combines traditional account-based campaign workflows with Paystack fiat donations and smart-contract-backed crypto donations.

## Workspace Structure

```text
behealth/
├── frontend/   React 19 + Vite 6 + Tailwind CSS 4
├── backend/    Node.js + Express + Prisma REST API
├── contracts/  Hardhat + Solidity campaign escrow contracts
└── README.md
```

## Development

Install dependencies from the repository root after configuring each workspace:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Run the backend:

```bash
npm run backend:dev
```

Run contract tests:

```bash
npm run contracts:test
```

## Product Roles

- **Donor**: funds active campaigns through Paystack or supported crypto chains.
- **Campaigner**: creates, saves, submits, and manages medical fundraising campaigns.
- **Admin**: reviews private campaign details before campaigns become public.

## Privacy Rule

Public campaign responses must never expose doctor contacts, patient family contacts, bank details, or private financial details. These fields are only available to campaign owners and admins.
