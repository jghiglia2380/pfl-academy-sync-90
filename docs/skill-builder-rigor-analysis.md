# Skill Builder Rigor Analysis Report

## Executive Summary

This report analyzes the skill builder components in the PFL Academy Sync-90 repository against five rigor criteria. **Critical finding**: The repository does NOT use L-01 through L-46 lesson numbering. Instead, it uses **Standards-based organization (Standard 1-15)** with React/TypeScript components.

---

## Repository Structure

| Expected | Actual |
|----------|--------|
| L-01 through L-10 HTML files | Standard 1-10 TSX components |
| L-46 as rigor baseline | No L-46 exists; 15 standards total |
| HTML skill builders | React/TSX skill builder components |

**Skill Builder Count by Standard (1-10):**

| Standard | Topic | Skill Builders |
|----------|-------|----------------|
| 1 | Career & Income | 9 (career, fafsa, financial-planning, smart, tax, tax-deductions, tax-documentation, tax-planning, w4) |
| 2 | Banking & Finance | 8 (bank-account, bank-statement, budget, financial-institutions, longevity-retirement, retirement-planning, rule-of-72, saving-vs-investing) |
| 3 | Credit & Debt | 5 (consumer-credit, credit-scores, credit-sources, debt-management, loan-comparison) |
| 4 | Investment | 3 (risk-return-analysis, rule-of-72, saving-vs-investing) |
| 5 | Risk Management | 6 (financial-planning, insurance-choices, medical-costs, risk-return-analysis, risk-scenario, risk-tolerance) |
| 6 | Insurance Planning | 2 (financial-planning, smart) |
| 7 | Consumer Decisions | 5 (credit-card-comparison, credit-sources, debt-management, loan-comparison, online-vs-in-store) |
| 8 | Financial Decisions | 2 (credit-card-comparison, online-vs-in-store) |
| 9 | Media & Marketing | 2 (phishing-scam, theft-protection) |
| 10 | Housing & Transport | 3 (apartment-hunting, housing-comparison, rental-budget-planning) |

---

## Rigor Criteria Analysis

### 1. Calculate-Then-Verify Inputs

**Definition**: Students must perform calculations before seeing the correct answer, rather than click-to-reveal patterns.

**Finding**: ❌ **MOSTLY ABSENT**

| Pattern | Files Found | Issue |
|---------|-------------|-------|
| ShowAnswersButton (click-to-reveal) | 36 files | Students can reveal answers without calculating |
| Calculators with input | 74 files | Calculators exist but don't require prior calculation |
| Verification patterns | 0 files | No calculate-then-verify validation |

**Evidence**:
- `ShowAnswersButton.tsx` in Standard 4 & 5: "Show Possible Answers" button reveals answers immediately
- Tax Calculator (Standard 1): Inputs numbers → sees result (no verification step)
- Rule of 72 (Standards 2, 4): Uses AI feedback, not student-calculated verification

**Gap**: Skill builders allow students to see answers without demonstrating calculation ability first.

---

### 2. Structured Frameworks (like COST)

**Definition**: Decision-making frameworks with specific steps that students must complete systematically.

**Finding**: ⚠️ **LIMITED PRESENCE**

| Framework | Location | Implementation |
|-----------|----------|----------------|
| SMART Goals | Standard 1, 6 | Fully implemented |
| COST Framework | Not found | Missing |
| Decision matrices | Capstones only | Not in skill builders |

**Evidence**:
- `SmartGoalsIntro.tsx` provides SMART framework (Specific, Measurable, Achievable, Relevant, Timebound)
- No other structured decision frameworks in skill builder components
- Capstone projects have structured tables but not skill builders

**Gap**: Only 1 framework (SMART) exists. No COST framework or other structured decision models.

---

### 3. Character Minimums on Textareas

**Definition**: Textareas require minimum character/word counts to ensure substantive responses.

**Finding**: ❌ **LARGELY ABSENT**

| Metric | Count | Location |
|--------|-------|----------|
| Files with `minLength` | 2 | Standards 5 & 11 only |
| Minimum value | 50 characters | ReflectionForm.tsx |
| Word count validation | 15 words | ReflectionForm.tsx |

**Evidence**:
```tsx
// Only found in: standard-5/risk-tolerance/ReflectionForm.tsx
// and: standard-11/risk-tolerance/ReflectionForm.tsx
<textarea
  minLength={50}
  ...
/>
// Plus validation: if (wordCount < 15) { show warning }
```

**Gap**: 425+ other skill builder TSX files have NO character minimums. Students can submit minimal responses.

---

### 4. Teacher Rubrics

**Definition**: Embedded rubrics with criteria, point values, and performance levels for teacher assessment.

**Finding**: ⚠️ **EXISTS BUT SEPARATE FROM SKILL BUILDERS**

| Location | Rubric Type | Accessible to Teachers |
|----------|-------------|------------------------|
| Capstone Projects | Full rubric (criteria, weights, levels) | Yes |
| ProjectLibrary.tsx | Criteria with weights | Yes |
| Type definitions | Rubric interfaces | Development only |
| Skill Builder components | **None embedded** | **No** |

**Rubric Structure (Capstones only)**:
```typescript
interface Rubric {
  criteria: RubricCriterion[];
  totalPoints: number;
}
interface RubricCriterion {
  title: string;
  description: string;
  points: number;
  levels: RubricLevel[];  // Performance levels
}
```

**Gap**: Rubrics exist for capstone projects but are NOT embedded in daily skill builders. Teachers have no built-in assessment criteria for skill builder activities.

---

### 5. Transfer Challenges

**Definition**: Activities requiring students to apply learned concepts to new, unfamiliar scenarios.

**Finding**: ❌ **ABSENT**

| Feature | Present | Notes |
|---------|---------|-------|
| Reflection prompts | Yes | Found in 36 files |
| Scenario-based exercises | Yes | Pre-defined scenarios |
| Novel transfer tasks | **No** | No application to new contexts |
| Real-world application | Limited | Scenarios are provided, not student-generated |

**Evidence**:
- ReflectionPrompt.tsx files ask for reflection on completed activities
- Scenario components provide pre-built cases (no novel application)
- No "apply this to a new situation" type challenges found

**Gap**: Skill builders lack transfer challenges that require applying knowledge to unfamiliar contexts.

---

## Rigor Gap Summary

| Criterion | Status | Gap Severity |
|-----------|--------|--------------|
| Calculate-then-verify | ❌ Missing | **High** |
| Structured frameworks | ⚠️ Limited (SMART only) | **Medium** |
| Character minimums | ❌ Missing (2 of 427 files) | **High** |
| Teacher rubrics | ⚠️ Capstones only | **Medium** |
| Transfer challenges | ❌ Missing | **High** |

---

## Most Rigorous Skill Builder (Baseline Candidate)

Based on analysis, the most rigorous skill builders are:

1. **Risk Tolerance Assessment** (Standard 5 & 11)
   - Has minLength (50 chars) + word count (15 words)
   - AI feedback integration
   - Multi-step form with validation

2. **Tax Deductions vs Credits** (Standard 1)
   - Calculator with explanation requirement
   - Scenario-based with multiple inputs
   - Comparative analysis required

3. **FAFSA Form** (Standard 1 & 15)
   - Complex multi-section form
   - Real-world document simulation
   - Multiple input validation

**However**, none of these meet all 5 rigor criteria.

---

## Recommendations for Rigor Enhancement

### High Priority (Missing entirely)

1. **Add calculate-then-verify pattern**
   - Require students to input their calculation before showing correct answer
   - Provide feedback on calculation accuracy

2. **Add character/word minimums to all textareas**
   - Standardize: minimum 100 characters or 25 words for reflections
   - Provide visible character counter

3. **Add transfer challenges**
   - Create novel scenario generator
   - Require application to student's personal situation

### Medium Priority (Partially present)

4. **Expand structured frameworks**
   - Add COST framework for purchasing decisions
   - Add PACED model for decision-making
   - Implement framework completion validation

5. **Embed rubrics in skill builders**
   - Add visible rubric criteria before student starts
   - Show assessment expectations inline

---

## Appendix: File Counts

```
Total skill builder TSX files: 427
Files with minLength validation: 2 (0.5%)
Files with ShowAnswers pattern: 36 (8.4%)
Files with calculator components: 74 (17.3%)
Files with structured frameworks: 2 (0.5%)
Files with embedded rubrics: 0 (0%)
Files with transfer challenges: 0 (0%)
```

---

*Report generated: 2025-12-06*
*Repository: pfl-academy-sync-90*
*Analysis scope: Standards 1-10 (Skill Builder TSX components)*
