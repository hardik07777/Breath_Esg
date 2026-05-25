# Engineering Decisions

## Overview

This document explains the key architectural and implementation decisions made while building the ESG ingestion and analyst review platform.

The project intentionally prioritizes ingestion correctness, auditability, and realistic workflow modeling over infrastructure complexity.

---

# Why Django + DRF?

Chosen because:
- rapid backend development
- strong ORM support
- built-in admin tooling
- fast API iteration
- clean serializer architecture

Django REST Framework provided:
- request validation
- serialization
- browsable APIs
- clean endpoint structure

This allowed focus on ingestion workflows instead of low-level infrastructure setup.

---

# Why React + Vite?

Chosen because:
- lightweight frontend setup
- fast development environment
- component-driven UI architecture
- simple API integration

Vite was selected over heavier alternatives for:
- fast startup
- fast HMR
- simpler configuration

---

# Why SQLite During Development?

SQLite was intentionally used during development because:
- zero setup for reviewers
- fast onboarding
- simplified local execution
- minimal infrastructure friction

The architecture is compatible with PostgreSQL migration later if needed.

---

# Why Preserve Raw Uploaded Records?

Raw uploaded rows are stored separately from normalized records.

This was one of the most important architectural decisions.

Benefits:
- traceability
- auditability
- source-of-truth preservation
- debugging support
- reproducibility

This mirrors real-world enterprise ingestion pipeline design.

---

# Why Separate RawRecord and ActivityRecord?

Uploaded source data often contains:
- inconsistent units
- source-specific schemas
- invalid values
- vendor-specific formatting

Separating:
- raw ingestion data
from
- normalized ESG activities

allows:
- source-independent analytics
- standardized downstream processing
- flexible normalization rules

---

# Why Use ValidationIssue Model?

Validation issues are modeled explicitly instead of silently failing ingestion.

Purpose:
- analyst visibility
- operational governance
- review workflows
- audit support

Examples:
- unknown units
- missing facilities
- suspicious values
- negative quantities

---

# Why Add Analyst Approval Workflow?

ESG operational data frequently requires human review before downstream reporting.

The approve/reject workflow was added to simulate:
- analyst review processes
- operational QA workflows
- governance controls

This makes the system more realistic compared to a simple ingestion dashboard.

---

# Why Add Audit Logs?

Audit logging supports:
- compliance workflows
- analyst accountability
- change traceability
- historical review visibility

Every approval/rejection action creates an audit entry.

---

# Why Avoid Overengineering?

The assignment intentionally avoids:
- microservices
- Kafka
- OCR ingestion
- distributed event systems
- real ERP integrations

Reason:
The focus of the assignment is ingestion architecture and workflow design rather than infrastructure complexity.

Prioritizing:
- workflow completeness
- auditability
- realistic modeling
provided higher implementation value.