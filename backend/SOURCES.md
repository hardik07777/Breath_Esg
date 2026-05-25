# Source Research and Ingestion Assumptions

## Overview

This project simulates ingestion of ESG operational data from three realistic enterprise source categories:

1. SAP exports (fuel and procurement)
2. Utility electricity consumption exports
3. Corporate travel platform exports

The goal was not to perfectly replicate every enterprise integration edge case, but to design realistic ingestion patterns based on how these systems commonly expose operational data in real-world ESG reporting workflows.

---

# 1. SAP Fuel and Procurement Data

## Research Performed

Researched:
- SAP flat-file exports
- SAP IDoc structures
- SAP OData exposure patterns
- common SAP CSV export workflows used by operations teams

Observed characteristics:
- inconsistent units
- internal plant codes
- source-specific naming conventions
- mixed date formats
- ERP-generated CSV exports with operational fields

For assignment scope, a simplified flat-file CSV export approach was selected.

---

## Ingestion Mechanism Chosen

Chosen:
- CSV upload

Reason:
In many ESG workflows, sustainability teams receive exported operational data as CSV or Excel extracts from ERP systems rather than directly integrating with SAP APIs.

This approach:
- simplified prototype implementation
- remained operationally realistic
- allowed focus on normalization and validation workflows

---

## Sample Data Shape

Sample SAP rows include:
- category
- activity type
- quantity
- unit
- facility

Example:

```csv
category,activity_type,quantity,unit,facility
Fuel,Diesel Consumption,1200,L,Mumbai Plant
Procurement,Steel Purchase,5000,KG,Pune Facility