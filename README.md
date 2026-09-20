# Beneficiary 360

## Project Overview

**Beneficiary 360** is a unified government beneficiary management platform designed to improve how beneficiaries are identified, connected with government schemes, tracked through the delivery lifecycle, and supported when problems occur.

The platform uses **Family ID as a common identity layer** to connect household and beneficiary information across multiple government schemes and departments. Instead of treating every scheme as a separate process, the platform provides a consolidated view of a beneficiary's interaction with government programs.

The core objective is:

> **Identify the right beneficiary, connect them to the right schemes, ensure the benefit reaches them, and close the loop when something goes wrong.**

---

## 1. Unified Beneficiary Registry

The platform maintains a centralized registry of families and beneficiaries.

A Family ID acts as the common identity layer through which related beneficiary information can be connected.

The registry can contain:

- Family ID
- Beneficiary details
- Family members
- Demographic information
- Socio-economic information
- Location information
- Relevant documents
- Scheme participation history
- Applications
- Benefits received
- Grievances

This creates a consolidated **Beneficiary 360° view** rather than keeping beneficiary information isolated within individual schemes.

---

## 2. Beneficiary 360° View

Government officials can search for a Family ID or beneficiary and view the complete scheme-related lifecycle in one place.

A beneficiary profile can show:

- Schemes for which the beneficiary is eligible
- Schemes already applied for
- Applications currently in progress
- Approved and rejected applications
- Benefits delivered
- Pending benefit disbursements
- Open grievances
- Previous grievance resolutions
- Potential gaps in scheme coverage

This allows officials to understand the beneficiary's overall interaction with government schemes instead of examining each scheme separately.

---

## 3. Government Scheme Registry

The platform maintains a centralized catalogue of government schemes.

Each scheme can contain:

- Scheme name
- Department
- Target beneficiary group
- Eligibility criteria
- Required documents
- Type of benefit
- Application requirements
- Processing stages
- Expected service timeline

This creates a common representation of schemes that can be used for eligibility assessment, application processing, monitoring, and analytics.

---

## 4. Eligibility Identification

The platform evaluates beneficiary information against the eligibility conditions of different schemes.

It categorizes beneficiaries into areas such as:

- **Eligible**
- **Potentially eligible**
- **Not eligible**
- **Missing information/document**

The platform should also explain the basis of an eligibility result.

For example:

> **Potentially Eligible for Education Assistance**
>
> ✓ Age criteria satisfied  
> ✓ Income criteria satisfied  
> ✓ Location criteria satisfied  
> ✗ Required income document missing

This helps both citizens and government officials understand why a beneficiary is or is not being identified for a particular scheme.

---

## 5. Scheme Application Management

Once a beneficiary is identified as eligible, the platform enables the application lifecycle to be managed from a single system.

The process can include:

```text
Eligibility Identified
        ↓
Application Started
        ↓
Documents Submitted
        ↓
Verification
        ↓
Department Review
        ↓
Approved / Rejected
        ↓
Benefit Processing
        ↓
Benefit Delivered
```

Applications can be linked directly to the beneficiary, Family ID, and relevant scheme.

This provides a consistent view of where every application currently stands.

---

## 6. Application Status and Lifecycle Tracking

Every application maintains a history of its progress.

Officials can identify:

- Newly submitted applications
- Applications awaiting documents
- Applications awaiting verification
- Applications under departmental review
- Approved applications
- Rejected applications
- Applications awaiting benefit processing
- Delayed applications

Citizens can also track their application and understand the current stage instead of repeatedly contacting government offices for status updates.

---

## 7. Benefit Delivery and Last-Mile Monitoring

The platform does not stop at application approval.

It tracks the journey from:

```text
Eligible
   ↓
Applied
   ↓
Verified
   ↓
Approved
   ↓
Benefit Initiated
   ↓
Benefit Delivered
   ↓
Beneficiary Confirmation
```

This allows the government to identify cases where a benefit has been approved but has not successfully reached the intended beneficiary.

For example:

> **Application approved → Payment initiated → Payment not received**

Such cases can be flagged as delivery exceptions and routed for further action.

---

## 8. Beneficiary Gap Analysis

One of the key objectives of the platform is to identify beneficiaries who are eligible but are not successfully receiving scheme benefits.

For each scheme, the system can show:

```text
Potentially Eligible
        ↓
Applications Received
        ↓
Applications Approved
        ↓
Benefits Delivered
        ↓
Benefits Confirmed
```

The difference between these stages helps identify where beneficiaries are being lost in the delivery process.

For example:

```text
Potentially Eligible       100,000
Applications Received       72,000
Approved                    60,000
Benefits Delivered          55,000
```

The platform can then identify the major gaps:

- Eligible but did not apply
- Application incomplete
- Verification pending
- Application rejected
- Approval pending
- Benefit payment pending
- Benefit not received

This converts raw scheme data into actionable beneficiary-management information.

---

## 9. Cross-Scheme Beneficiary Analysis

Because Family ID provides a common identity layer, the platform can analyze beneficiary participation across multiple schemes.

Officials can identify:

- Beneficiaries receiving multiple schemes
- Beneficiaries eligible for several schemes but receiving only some
- Areas or beneficiary groups with low scheme coverage
- Potential duplicate or inconsistent beneficiary records
- Overlap between different schemes
- Beneficiary groups that remain underserved

Any potential duplication or inconsistency is treated as a case requiring verification rather than automatically being considered fraudulent.

---

## 10. Proactive Beneficiary Outreach

The platform can identify beneficiaries who appear eligible for a scheme but have not yet applied.

For example:

```text
Scheme: Housing Assistance

Potentially Eligible      25,000
Applied                   14,200
Not Yet Applied           10,800
```

The government can use this information to prioritize:

- Awareness campaigns
- Assisted application drives
- Local outreach
- Beneficiary communication
- Follow-up with eligible households

This shifts scheme delivery from a purely application-driven model toward a more proactive approach.

---

## 11. Grievance Management

Grievances are connected directly to the beneficiary, scheme, and application involved.

A beneficiary can raise an issue such as:

- Application delay
- Payment not received
- Incorrect rejection
- Missing or incorrect beneficiary information
- Document-related problems
- Benefit delivery problem
- Other scheme-related issues

Each grievance receives a unique reference and can be tracked through its lifecycle.

```text
Grievance Submitted
        ↓
Assigned
        ↓
Under Review
        ↓
Action Taken
        ↓
Resolved
        ↓
Beneficiary Confirmation
```

This ensures that grievances become part of the beneficiary lifecycle rather than remaining as isolated complaints.

---

## 12. SLA and Escalation Management

The platform can associate service timelines with applications and grievances.

When a case approaches or exceeds its expected resolution time, it can be highlighted for administrative attention.

For example:

```text
Normal
   ↓
Approaching SLA
   ↓
SLA Breached
   ↓
Escalation
```

Officials can identify:

- Cases approaching their deadline
- Delayed applications
- Unresolved grievances
- Department-level SLA breaches
- Repeated delays in particular stages

This helps departments focus on exceptions that require intervention.

---

## 13. Beneficiary Feedback and Resolution

After a benefit is delivered or a grievance is resolved, the platform can capture beneficiary confirmation or feedback.

For example:

> **Was the approved benefit received?**
>
> Yes / No

If the beneficiary reports that the benefit was not received, the platform can create or route a delivery-related issue for investigation.

This creates a closed feedback loop:

```text
Scheme
  ↓
Application
  ↓
Approval
  ↓
Benefit Delivery
  ↓
Beneficiary Confirmation
  ↓
Issue Identified
  ↓
Grievance
  ↓
Resolution
```

---

## 14. Government Command Dashboard

The platform provides government officials with a consolidated view of beneficiary and scheme performance.

Key indicators can include:

- Total registered families
- Total beneficiaries
- Active scheme enrollments
- Eligible beneficiaries
- Applications received
- Applications pending
- Benefits delivered
- Benefits pending
- Potentially unserved beneficiaries
- Open grievances
- SLA breaches
- Benefit delivery exceptions

The dashboard can also provide department-wise and scheme-wise views.

---

## 15. Beneficiary Conversion Funnel

The platform can show how beneficiaries move through the complete scheme lifecycle.

```text
                  ELIGIBLE
                 100,000
                    │
                    ▼
                  APPLIED
                  72,000
                    │
                    ▼
                 VERIFIED
                  65,000
                    │
                    ▼
                 APPROVED
                  60,000
                    │
                    ▼
            BENEFIT DELIVERED
                  55,000
                    │
                    ▼
           BENEFIT CONFIRMED
                  52,000
```

This helps officials identify exactly where beneficiaries are dropping out of the delivery process.

---

## 16. Exception-Driven Beneficiary Management

Instead of requiring officials to manually examine every record, the platform highlights cases that need attention.

Examples include:

- Beneficiary eligible but not applying
- Application approaching SLA
- Application stuck at a particular stage
- Approved benefit awaiting disbursement
- Benefit marked delivered but not received
- Potential duplicate beneficiary records
- Unresolved grievances
- Repeated issues associated with a particular scheme or department

This allows government departments to focus their operational effort where intervention is most needed.

---

## 17. Overall Beneficiary Lifecycle

The complete platform connects the entire government-benefit journey:

```text
                    FAMILY ID
                       │
                       ▼
              BENEFICIARY REGISTRY
                       │
                       ▼
              SCHEME IDENTIFICATION
                       │
                       ▼
                  ELIGIBILITY
                       │
                       ▼
                   APPLICATION
                       │
                       ▼
                  VERIFICATION
                       │
                       ▼
                    APPROVAL
                       │
                       ▼
                BENEFIT DELIVERY
                       │
                       ▼
             BENEFICIARY CONFIRMATION
                       │
              ┌────────┴────────┐
              │                 │
           SUCCESS            PROBLEM
              │                 │
              ▼                 ▼
          OUTCOME          GRIEVANCE
                                │
                                ▼
                           RESOLUTION
                                │
                                ▼
                       BENEFICIARY FEEDBACK
```

---

## 18. Core Value of Beneficiary 360

The platform brings together information that is otherwise distributed across individual scheme processes.

It enables government departments to answer questions such as:

- **Who is receiving which benefits?**
- **Who is eligible but not receiving them?**
- **Where are applications getting delayed?**
- **Which beneficiaries are affected by delivery problems?**
- **Which grievances remain unresolved?**
- **Where are there potential overlaps or inconsistencies?**
- **Which beneficiary groups require proactive outreach?**
- **Where is the scheme delivery lifecycle breaking down?**

The ultimate goal is not simply to maintain a Family ID.

It is to create a **complete, beneficiary-centric view of government scheme delivery** and help departments move from fragmented scheme administration toward **coordinated, transparent, and outcome-oriented beneficiary management**.
