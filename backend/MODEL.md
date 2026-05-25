# ESG Data Platform — Data Model Design

## Overview

This platform is designed to ingest ESG-related operational data from multiple enterprise data sources, normalize the information into a consistent structure, validate potential data quality issues, and support analyst review workflows with auditability.

The architecture intentionally separates raw uploaded data from normalized activity records to preserve traceability and support audit requirements.

---

# Core Models

## Tenant

Represents an organization or customer using the platform.

Purpose:
- Multi-tenant architecture support
- Data isolation between organizations
- Foundation for future scalability

---

## DataSource

Represents the origin of uploaded ESG data.

Examples:
- SAP exports
- Utility provider CSVs
- Travel emissions reports

Purpose:
- Multi-source ingestion support
- Source-specific normalization logic
- Upload traceability

---

## UploadBatch

Represents a single ingestion event.

Tracks:
- uploaded file name
- ingestion status
- row counts
- success/failure metrics

Purpose:
- Operational ingestion tracking
- Batch-level observability
- Audit support

---

## RawRecord

Stores the original uploaded row exactly as received.

Fields:
- source row number
- raw payload JSON
- associated upload batch

Purpose:
- Preserve source-of-truth data
- Regulatory auditability
- Traceability from normalized records back to source data

This separation is intentional and mirrors real-world ingestion pipeline design patterns.

---

## ActivityRecord

Represents normalized ESG activity data.

Examples:
- fuel consumption
- electricity usage
- travel activity

Normalization includes:
- standardized units
- category mapping
- scope assignment

Purpose:
- Provide consistent downstream ESG records
- Decouple analytics workflows from source-specific formats

---

## ValidationIssue

Represents data quality issues detected during ingestion.

Examples:
- unknown units
- negative quantities
- missing facilities
- suspiciously large values

Purpose:
- Surface analyst-reviewable issues
- Support operational data governance workflows
- Prevent silent ingestion failures

---

## AuditLog

Tracks analyst actions performed on records.

Examples:
- approval
- rejection
- review changes

Purpose:
- Workflow auditability
- Compliance traceability
- Historical review tracking

---

# Architectural Design Principles

## Raw Data Preservation

Raw uploaded data is intentionally stored separately from normalized records.

Benefits:
- traceability
- auditability
- reproducibility
- debugging support

---

## Separation of Concerns

The ingestion pipeline separates:
- ingestion
- normalization
- validation
- analyst review
- audit logging

This improves maintainability and mirrors enterprise ingestion system design.

---

## Lightweight but Realistic

The system intentionally avoids overengineering.

Not included:
- Kafka
- OCR pipelines
- real ERP integrations
- distributed microservices

Focus was placed on:
- ingestion correctness
- auditability
- analyst workflows
- realistic ESG operational modeling