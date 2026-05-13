# Jobber — Advanced invoicing + global discount rules for field service

> **Live demo:** https://jobber-demo-six.vercel.app

<!-- TODO: add hero screenshot to screenshots/jobber-home.png and uncomment:
![Jobber home](screenshots/jobber-home.png)
-->

## About Jobber

**Industry:** Field-service software / Home-services CRM

**What they do:** Jobber is the operations platform for home-services businesses (HVAC, landscaping, cleaning, plumbing, electrical, etc.). It runs scheduling, quoting, jobs, invoicing, and customer communication for hundreds of thousands of small service businesses across North America.

## The case study

**Problem.** Home-services billing is fragmented. A single job can involve a deposit, a progress invoice, a final invoice, line-item costs that need to be marked up, and external pass-through charges — each handled in different places. Discounts, meanwhile, are applied one-off per quote or invoice, so promo campaigns get lost in the cracks.

**Approach.** Two interlocking features. **Advanced Invoicing** turns billing into a staged workflow (deposit → progress → final), with line-item cost breakdowns, external pass-through invoices, and one-click invoice creation from jobs. **Global Discount Rules** lift discounts out of the document layer into a centralized engine that can schedule, stack, exclude, and auto-apply promos across all quotes, jobs, and invoices.

**Outcome.** A field-service back office that finally bills cleanly. The demo shows the rule engine controlling discount behavior across documents from one place — the unique mechanic that turns ad-hoc discounts into a campaign tool.

## What I built

- Dashboard with workflow cards (Requests, Quotes, Jobs, Invoices)
- **Advanced Invoicing** — staged billing (deposit / progress / final), line-item cost breakdown, external pass-through invoices, one-click invoice from job
- **Global Discount Rules** — centralized engine with schedule, stack, and exclude controls; auto-application across quotes/invoices/jobs
- Profitability layer — cost tracking by service and technician
- Insights / analytics page
- New-feature showcase view explaining the two headline features

## Tech stack

- Vite + React 18
- lucide-react for icons
- Deployed on Vercel

## Run locally

```bash
git clone https://github.com/rishabhqueens/jobber-demo.git
cd jobber-demo
npm install
npm run dev
```

## Screenshots

<!-- TODO: capture screenshots and place them in ./screenshots/ -->

---

Part of the [PM Reimagines](https://github.com/rishabhqueens/pm-reimagines) portfolio — a set of product-management case studies built as working demos.

> *This is an unaffiliated personal demo built to explore product ideas in Jobber's space. It is not endorsed by, affiliated with, or representative of Jobber Software Inc. All brand names and trademarks belong to their respective owners.*
