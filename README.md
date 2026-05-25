# Breathe ESG – ESG Ingestion & Review Platform

Prototype ESG operations platform built with Django REST Framework and React for ingesting, normalizing, reviewing, and auditing sustainability activity data from multiple enterprise sources.

## Live Demo

Frontend:  
[https://your-vercel-url.vercel.app
https://breath-esg.vercel.app/](https://breath-esg-xbg1.vercel.app/)
---

# Overview

This project simulates how enterprise ESG data flows through an internal operations system before being finalized for audit and reporting.

The platform supports:
- ingestion of ESG activity records
- normalization of inconsistent source formats
- analyst review workflows
- audit logging
- approval/rejection actions
- suspicious data visibility

The goal was to build something realistic enough to reflect operational ESG workflows while keeping the scope manageable within the assignment timeline.

---

# Supported Data Sources

## 1. SAP Export Data

Handled as flat CSV uploads representing:
- fuel consumption
- procurement activity
- plant-level operational data

The ingestion layer accounts for:
- inconsistent column names
- varying units
- multiple activity categories

---

## 2. Utility Electricity Data

Handled as utility CSV exports.

Supported concepts:
- billing periods
- electricity usage
- meter/account level records
- non-calendar reporting periods

---

## 3. Corporate Travel Data

Handled as travel platform export files.

Supported activity types:
- flights
- hotels
- ground transport

The prototype assumes:
- category-based emission mapping
- partially normalized travel records

---

# Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- Axios
- Framer Motion
- Lucide React

## Backend
- Django
- Django REST Framework
- Pandas
- SQLite
- CORS Headers

## Deployment
- Vercel (frontend)
- Render (backend)

---

# Features

## Analyst Dashboard
- ESG activity table
- filtering by review state
- issue visibility
- approval/rejection actions

## Upload Workflow
- CSV upload support
- ingestion processing
- success/error handling

## Audit Support
- audit log tracking
- immutable review visibility
- raw payload inspection

## Review Workflow
- pending records
- approved/rejected states
- issue highlighting

---

# Project Structure

```bash
frontend/
  src/
  components/
  pages/

backend/
  config/
  ingestion/
  review/
  audit/
  normalization/
  tenants/
```

---

# Running Locally

## Backend

```bash
cd backend

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# API Endpoints

## Upload Data

```http
POST /api/upload/
```

## Fetch Records

```http
GET /api/activity-records/
```

## Approve Record

```http
POST /api/activity-records/<id>/approve/
```

## Reject Record

```http
POST /api/activity-records/<id>/reject/
```

## Audit Logs

```http
GET /api/audit-logs/
```

---

# Design Notes

The project intentionally focuses more on:
- operational workflows
- review visibility
- ingestion realism
- auditability

rather than precise carbon calculations.

The emphasis was on building a realistic analyst-facing ingestion system instead of a generic CRUD dashboard.

---

# Future Improvements

- PDF utility bill parsing
- authentication and RBAC
- true multi-tenant isolation
- async ingestion pipelines
- background job queues
- emission factor libraries
- object storage for uploaded files
- source connector integrations

---

# Author

Hardik Goel

GitHub:  
https://github.com/hardik07777

LinkedIn:  
https://www.linkedin.com/in/hardikgoel07/
