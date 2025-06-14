# set up need
Frontend:
Next.js + React + Redux Toolkit + RTK Query

Backend:
Current Kafka + Mongo system we are building

Deployment:
Vercel (frontend), Railway/Fly.io (backend, free for now)

Monitoring:
Grafana (metrics), Sentry (errors)

# next
Since you already have:

Kafka backend running

DLQ & Retry system built

MongoDB persistence

Prometheus + Grafana

Docker-compose setup

🎯 Your UI features for WhatsApp Lead Capture Tool
Feature	Description
Lead Form UI	Allow users to submit new leads (simulate WhatsApp capture)
Leads List (Active leads)	Fetch valid leads from MongoDB
DLQ Management	Show DLQ queue from MongoDB, retry failed leads
Retry Button	Allow retrying DLQ messages from UI
Metrics Dashboard	(Optional for later): integrate Prometheus metrics visualization
Basic Authentication	Admin login (for later SaaS build)

✅ The Full UI Folder Structure
whatsapp-lead-ui/
│
├── package.json
├── next.config.js
├── public/
├── .env.local
│
├── src/
│   ├── app/  (Next.js app router)
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── features/
│   │   ├── leads/
│   │   │   ├── LeadsList.jsx
│   │   │   ├── leadsSlice.js
│   │   │   └── leadsApi.js (RTK Query)
│   │   ├── dlq/
│   │   │   ├── DlqList.jsx
│   │   │   ├── dlqSlice.js
│   │   │   └── dlqApi.js
│   │   └── retry/
│   │       └── retryApi.js
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── LeadForm.jsx
│   │   └── LeadItem.jsx
│   │
│   ├── services/
│   │   └── api.js (configure axios or fetch)
│   │
│   ├── store/
│   │   ├── store.js
│   │   └── rootReducer.js
│   │
│   └── utils/
│       └── helpers.js
│
└── README.md

#✅ Technologies:
Layer	                     Tech
UI Framework	             Next.js (App Router)
State Management	         Redux Toolkit
Data Fetching	             RTK Query
Component Lib (optional)	 Material UI / TailwindCSS
HTTP Client	             axios (optional, RTK Query can handle this directly)

✅ Development Strategy
1️⃣ ✅ Generate starter boilerplate
2️⃣ ✅ Connect backend APIs (Kafka backend already running)
3️⃣ ✅ Implement DLQ retry from UI
4️⃣ ✅ Deploy on Vercel (free plan for MVP)
5️⃣ ✅ Later SaaSify it
