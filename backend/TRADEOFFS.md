# Tradeoffs and Scope Decisions

## Overview

This project was intentionally designed as a focused ESG ingestion and analyst review platform rather than a fully productionized enterprise system.

The implementation prioritizes:
- ingestion correctness
- auditability
- workflow realism
- maintainable architecture

over infrastructure complexity.

---

# Deliberately Not Implemented

## Real ERP Integrations

Not implemented:
- SAP APIs
- Oracle integrations
- NetSuite integrations

Reason:
The assignment focuses on ingestion architecture rather than external enterprise connectivity.

CSV ingestion was sufficient to simulate realistic operational workflows.

---

## OCR / Document Extraction

Not implemented:
- PDF parsing
- invoice OCR
- AI extraction pipelines

Reason:
The assignment evaluates ingestion and workflow modeling rather than document intelligence systems.

---

## Kafka / Event Streaming

Not implemented:
- Kafka
- distributed queues
- event streaming pipelines

Reason:
The ingestion scale for the assignment does not justify distributed infrastructure complexity.

Batch-oriented CSV ingestion provides sufficient realism for the use case.

---

## Microservices Architecture

Not implemented:
- service decomposition
- distributed APIs
- service mesh patterns

Reason:
A modular monolith provides:
- simpler reviewer onboarding
- faster development iteration
- lower operational overhead

The current architecture already separates concerns cleanly at the application layer.

---

## Authentication / RBAC

Not implemented:
- user authentication
- role-based permissions
- SSO integration

Reason:
The assignment prioritizes ingestion workflow functionality over identity infrastructure.

The current analyst workflow is simulated using a simplified actor model.

---

## PostgreSQL in Development

SQLite was used during development instead of PostgreSQL.

Tradeoff:
- simpler local setup
- faster reviewer onboarding

vs

- reduced production realism

The ORM model design remains compatible with PostgreSQL migration later.

---

## Advanced ESG Calculations

Not implemented:
- emissions factor calculations
- carbon equivalency conversions
- regulatory reporting exports

Reason:
The assignment scope primarily evaluates ingestion and operational workflow architecture.

---

# Key Design Tradeoff

The project intentionally prioritizes:

- traceability
- normalization
- validation
- review workflows
- auditability

over:

- infrastructure scale
- distributed systems complexity
- production deployment sophistication

This tradeoff was made to maximize implementation quality within assignment scope and time constraints.

---

# Future Extensions

Potential future improvements:
- PostgreSQL migration
- user authentication
- emissions factor engine
- asynchronous ingestion jobs
- advanced reporting
- workflow assignment queues
- source-specific mapping rules