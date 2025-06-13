# 📄 **African Job Board — Requirement Document (MVP)**

**Version:** 1.0
**Date:** June 13, 2025
**Prepared for:** African Job Board Development Team (7 Members)

---

## 📌 1. Executive Summary

Finding tech jobs in Africa can be overwhelming due to fragmented information, narrow search horizons, and lack of visibility. The **African Job Board (AJB)** aims to be a **pan-African open-source job board**, curating verified opportunities across the continent. It connects job seekers—entry level to experienced—to roles they might not otherwise encounter.

The MVP will focus on building the core features necessary to launch a functional, attractive, and culturally resonant platform within 30 days.

---

## 🔍 2. Scope and Deliverables

### In-Scope (MVP)

* A web-based platform
* Job posting and searching functionalities
* Admin portal for job management
* UI with African visual design
* Basic authentication system (email/password)
* Deployment and CI/CD setup

### Deliverables

* Deployed MVP with frontend & backend
* UI/UX design assets
* Source code (public GitHub repository)
* DevOps infrastructure scripts
* Documentation (README, Setup, API docs)

---

## ✨ 3. MVP Features

| Feature              | Description                                                                       |
| -------------------- | --------------------------------------------------------------------------------- |
| Job Listings         | List curated job opportunities with filters (country, job type, experience level) |
| Job Detail Page      | Show detailed info about job roles                                                |
| Job Search           | Keyword search, filter by category, country, experience                           |
| Authentication       | Signup/Login for job seekers and admins                                           |
| Admin Dashboard      | Admins can approve, edit, delete jobs                                             |
| Job Submission Form  | Employers can submit jobs for review                                              |
| Responsive Design    | Works on mobile, tablet, desktop                                                  |
| African Visual Theme | Icons, colors, fonts resonating with African cultures                             |

---

## 🔁 4. Post-MVP Features

* User profiles with resume uploads
* Application tracking
* Job alerts / subscriptions
* AI job recommendations
* Employer dashboard
* Role-based access control
* API integrations (LinkedIn, job aggregators)
* Support for French (multilingual)

---

## 🧭 5. User Flow

1. **Visitor** lands on home → browses jobs → views details → signs up
2. **Job Seeker** logs in → searches → applies (external redirect for now)
3. **Employer** submits a job → admin reviews → job published
4. **Admin** logs in → reviews, edits, or deletes job postings

---

## ⚙️ 6. Technical Requirements

### Frontend

* **Framework:** React (Next.js for SSR/SEO)
* **Styling:** Tailwind CSS + Custom Icon Set (to be defined)
* **State:** Context API or alternative (if needed)
* **Forms:** React Hook Form / HTML native solutions

### Backend

* **Framework:** Node.js with Express or NestJS (to be defined)
* **Database:** PostgreSQL (hosted on Supabase or Neon)
* **ORM:** Drizzle
* **Auth:** JWT-based Auth
* **Email:** SendGrid (or custom)

### DevOps

* **CI/CD:** GitHub Actions or better alternative
* **Hosting:** Vercel (frontend) + Render/Fly.io (to be defined for backend)
* **Monitoring:** UptimeRobot or LogRocket (to be defined)

---

## 📐 7. Non-Functional Requirements

* **Performance:** Load homepage under 2 seconds
* **Availability:** 99% uptime during MVP phase
* **Accessibility:** WCAG AA where possible
* **Security:** Secure authentication, sanitize inputs, HTTPS
* **Scalability:** Containerized backend, scalable DB

---

## 🎨 8. Look and Feel

* **Design Style:** Afrocentric UI (earth tones, patterns, cultural motifs)
* **Fonts:** Free African-inspired fonts (Google Fonts: “Ubuntu”, “Noto Sans” variants)
* **Icons:** African-styled SVG sets (flat, modern)
* **Responsive:** Mobile-first design

---

## 🖼️ 9. Assets Requirements

* African icon set (to be defined)
* Free UI library (e.g., Tailwind UI, DaisyUI, Shadcn-ui for rapid dev)
* Images: African work culture stock images (from \[Unsplash], \[Pexels]) + Optimized in .webp format
* Logo: Simple afro-inspired logo in SVG
* Fonts: Google Fonts + optional display font for headers, or better

---

## 🛠️ 10. Project Constraints & Assumptions

### Constraints

* 30-day MVP delivery
* Team of 7 with varied skills
* Limited budget — open-source tools only

### Assumptions

* Team works full-time on project
* Jobs link to external apply pages
* Admin review is manual (no automation)

---

## 📅 11. Milestones & Acceptance Process

| Week          | Milestone             | Deliverable                              |
| ------------- | --------------------- | ---------------------------------------- |
| 1             | Design + Infra Setup  | Wireframes, architecture, CI/CD scaffold |
| 2             | Frontend Dev Begins   | Home, Job List, Job Details              |
| 2–3           | Backend Dev Begins    | Auth, Job CRUD, Admin Dashboard          |
| 3             | Integration & Styling | Connect frontend/backend, visual polish  |
| 4             | Testing & QA          | Unit tests, bug fixes, acceptance tests  |
| End of Week 4 | MVP Delivery          | Deployed app, demo, and documentation    |

**Acceptance Criteria:**

* Functional on desktop and mobile
* Working job listing/search system
* Admin can approve and manage jobs
* No critical bugs
* Team review and sign-off

---

## 🧱 12. Architecture & Data Exchange Format

### Architecture Overview

* **Frontend (React)** ↔️ **REST API (Express/Nest)** ↔️ **PostgreSQL DB**

### Data Format

* **JSON** for all API exchanges
* Example Job Posting:

```json
{
  "id": "uuid",
  "title": "Frontend Developer",
  "company": "NairobiTech",
  "location": "Kenya",
  "experienceLevel": "Mid",
  "type": "Full-time",
  "description": "Join our growing frontend team...",
  "applyLink": "https://jobs.nairobytech.co.ke/123"
}
```

---

