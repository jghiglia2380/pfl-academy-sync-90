# Pedagogical Rigor Gap Analysis: L-47 to L-69

## Executive Summary

**Critical Finding**: Both the L-46 "quality template" AND all sampled files (L-47, L-50, L-55, L-60, L-65) are **MISSING ALL FIVE** pedagogical rigor elements. L-46 cannot serve as a rigor standard because it also lacks these features.

| Rigor Element | L-46 (Template) | L-47 | L-50 | L-55 | L-60 | L-65 |
|---------------|-----------------|------|------|------|------|------|
| Calculate-then-verify | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| COST framework (80+ chars) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Transfer challenge (no hints) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Teacher rubrics (4-point) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Progressive unlocking | ❌ | ⚠️ | ⚠️ | ❌ | ❌ | ❌ |

**Legend**: ❌ = Missing | ⚠️ = Partial (navigation exists but no validation)

---

## Detailed Analysis by Chapter

### L-47: Introduction to Investment Types

**Files Analyzed:**
- `Investment_Type_Analyzer.html`
- `Portfolio_Builder.html`
- `L-47_Student_Activity_Packet.html`

| Criterion | Present | Evidence |
|-----------|---------|----------|
| **Calculate-then-verify** | ❌ NO | Scenario Builder shows results immediately after input. No "enter your answer first" step. |
| **COST framework** | ❌ NO | No C/O/S/T checkpoints. Reasoning textareas have no minlength attribute. |
| **Transfer challenge** | ❌ NO | All scenarios pre-built with guidance. No novel application task. |
| **Teacher rubrics** | ❌ NO | No rubric criteria in any file. |
| **Progressive unlocking** | ⚠️ PARTIAL | Tabs exist but all accessible immediately. No completion validation. |

**Code Evidence:**
```html
<!-- Portfolio_Builder.html - No minlength on textarea -->
<textarea class="reasoning-input" placeholder="Why did you choose this allocation?"></textarea>

<!-- No verification step - results shown immediately -->
<button class="btn btn-primary" onclick="calculateScenario()">Calculate Projection</button>
```

---

### L-50: Supply and Demand

**Files Analyzed:**
- `Market_Analyzer_Tool.html`
- `L-50_Student_Activity_Packet.html`

| Criterion | Present | Evidence |
|-----------|---------|----------|
| **Calculate-then-verify** | ❌ NO | Market predictions calculated automatically. No student verification step. |
| **COST framework** | ❌ NO | No structured checkpoint framework. Textareas have no minlength. |
| **Transfer challenge** | ❌ NO | Guided scenarios only. Students select from dropdowns, no novel analysis. |
| **Teacher rubrics** | ❌ NO | No rubric criteria embedded. |
| **Progressive unlocking** | ⚠️ PARTIAL | 7-step wizard exists BUT "Next" buttons work without validation. |

**Code Evidence:**
```html
<!-- Market_Analyzer_Tool.html - No input validation before navigation -->
<div class="button-group">
    <button class="btn btn-secondary" onclick="prevStep()">Previous</button>
    <button class="btn btn-primary" onclick="nextStep()">Next: Demand Analysis</button>
</div>

<!-- Textareas with no minimum -->
<textarea id="marketDescription" placeholder="Describe the current state..."></textarea>
```

---

### L-55: International Trade

**Files Analyzed:**
- `Currency_Exchange_Simulator.html`
- `Trade_Impact_Analyzer.html`

| Criterion | Present | Evidence |
|-----------|---------|----------|
| **Calculate-then-verify** | ❌ NO | Currency converter shows results instantly. No student calculation required. |
| **COST framework** | ❌ NO | No framework present. |
| **Transfer challenge** | ❌ NO | "Real-World Scenarios" section has PRE-BUILT answers visible. |
| **Teacher rubrics** | ❌ NO | No rubric criteria. |
| **Progressive unlocking** | ❌ NO | All content visible simultaneously. |

**Code Evidence:**
```html
<!-- Currency_Exchange_Simulator.html - Answers shown directly -->
<p style="margin-top:10px"><strong>Impact:</strong> Your $3,000 now buys only €2,550 instead of €3,000. You effectively lost $529 in purchasing power!</p>

<!-- Immediate calculation, no verification -->
<button class="button" onclick="convert()">Convert Currency</button>
```

---

### L-60: Understanding Financial Contracts

**Files Analyzed:**
- `Contract_Elements_Finder.html`
- `Fine_Print_Analyzer.html`

| Criterion | Present | Evidence |
|-----------|---------|----------|
| **Calculate-then-verify** | ❌ NO | Checkbox activity - students check items, no calculation required. |
| **COST framework** | ❌ NO | No framework. No character minimums. |
| **Transfer challenge** | ❌ NO | Contract elements are LISTED - students just check boxes, no analysis. |
| **Teacher rubrics** | ❌ NO | Score displayed but no rubric criteria. |
| **Progressive unlocking** | ❌ NO | All contracts visible simultaneously. |

**Code Evidence:**
```html
<!-- Contract_Elements_Finder.html - Simple checkbox, no depth required -->
<label class="element-item">
    <input type="checkbox" onchange="updateScore()">
    <span>Parties identified (landlord & tenant names)</span>
</label>

<!-- No minimum response required -->
```

---

### L-65: Investment Portfolio Diversification

**Files Analyzed:**
- `Diversification_Analyzer.html`
- `Asset_Allocation_Optimizer.html`

| Criterion | Present | Evidence |
|-----------|---------|----------|
| **Calculate-then-verify** | ❌ NO | Generic "Analyze" button shows placeholder results. No calculation verification. |
| **COST framework** | ❌ NO | No framework. Generic placeholder text. |
| **Transfer challenge** | ❌ NO | Template file with placeholder content only. |
| **Teacher rubrics** | ❌ NO | No rubric criteria. |
| **Progressive unlocking** | ❌ NO | Single-page form with immediate results. |

**Code Evidence:**
```html
<!-- Diversification_Analyzer.html - Placeholder content only -->
<textarea id="input3" rows="3" placeholder="Provide details..."></textarea>

<!-- Generic results, no actual analysis -->
document.getElementById('summary').textContent='Based on your inputs, here is your analysis summary.';
```

---

## L-46 Analysis (The "Template")

**Critical Finding**: L-46 also lacks all five rigor elements.

| Criterion | Present | Evidence |
|-----------|---------|----------|
| **Calculate-then-verify** | ❌ NO | Calculators show results immediately |
| **COST framework** | ❌ NO | No COST checkpoints, no 80+ char minimums |
| **Transfer challenge** | ❌ NO | All scenarios guided with state data |
| **Teacher rubrics** | ❌ NO | Teacher guide exists but no embedded rubrics |
| **Progressive unlocking** | ❌ NO | All tools accessible immediately |

**Code Evidence from L-46:**
```html
<!-- Auto_Finance_Decision_Calculator.html - Immediate calculation -->
<input type="number" id="newPrice" value="28000" oninput="calculate()">
<!-- Results update in real-time, no verification step -->
```

---

## What Would "High Rigor" Look Like?

### 1. Calculate-Then-Verify Pattern
```html
<!-- CURRENT (Low Rigor) -->
<input type="number" oninput="showResult()">
<div id="result">$24,500</div>

<!-- NEEDED (High Rigor) -->
<label>Calculate the total cost and enter your answer:</label>
<input type="number" id="studentAnswer" placeholder="Enter your calculated answer">
<button onclick="verifyAnswer()">Check My Answer</button>
<div id="feedback" class="hidden">
    <p class="correct">✓ Correct! The answer is $24,500.</p>
    <p class="incorrect">✗ Not quite. Review your calculation. Hint: Don't forget sales tax.</p>
</div>
```

### 2. COST Framework with Character Minimums
```html
<!-- NEEDED -->
<div class="cost-checkpoint" id="checkpoint-1">
    <h3>C - Context Analysis</h3>
    <p>Describe the financial context of this decision.</p>
    <textarea
        minlength="80"
        required
        oninput="validateMinLength(this, 80)"
        placeholder="Minimum 80 characters required...">
    </textarea>
    <span class="char-counter">0/80 characters</span>
</div>
<!-- Repeat for O, S, T sections -->
```

### 3. Transfer Challenge (No Hints)
```html
<!-- NEEDED -->
<div class="transfer-challenge">
    <h3>Transfer Challenge</h3>
    <div class="scenario">
        <p><strong>New Scenario:</strong> Your cousin in [different state] is considering
        buying a motorcycle instead of a car. Using what you learned, analyze their situation.</p>
        <!-- NO hints, NO sample answers, NO guidance -->
    </div>
    <textarea minlength="150" placeholder="Apply your analysis framework..."></textarea>
</div>
```

### 4. Teacher Rubric (4-Point Scale)
```html
<!-- NEEDED -->
<div class="teacher-rubric" data-checkpoint="1">
    <h4>Assessment Rubric</h4>
    <table>
        <tr>
            <th>Criterion</th>
            <th>4 - Exemplary</th>
            <th>3 - Proficient</th>
            <th>2 - Developing</th>
            <th>1 - Beginning</th>
        </tr>
        <tr>
            <td>Cost Analysis</td>
            <td>Identifies all 8+ cost factors with accurate calculations</td>
            <td>Identifies 6-7 factors with mostly accurate calculations</td>
            <td>Identifies 4-5 factors with some calculation errors</td>
            <td>Identifies fewer than 4 factors or major errors</td>
        </tr>
    </table>
</div>
```

### 5. Progressive Unlocking
```javascript
// NEEDED
function validateSection(sectionId) {
    const section = document.getElementById(sectionId);
    const textareas = section.querySelectorAll('textarea[required]');
    const inputs = section.querySelectorAll('input[required]');

    let allValid = true;

    textareas.forEach(ta => {
        if (ta.value.length < parseInt(ta.getAttribute('minlength') || 0)) {
            allValid = false;
            ta.classList.add('invalid');
        }
    });

    if (allValid) {
        unlockNextSection(sectionId);
    } else {
        showValidationError('Please complete all required fields before continuing.');
    }
}
```

---

## Recommendations

### Immediate Priority (All L-47 to L-69 files)

1. **Add Calculate-Then-Verify to ALL calculators**
   - Student enters answer BEFORE seeing correct value
   - Provide feedback on accuracy
   - Track attempts

2. **Implement COST Framework**
   - Add C/O/S/T checkpoint sections
   - Set minlength="80" on all checkpoint textareas
   - Add visible character counters

3. **Create Transfer Challenges**
   - Add one novel scenario per chapter with NO hints
   - Require 150+ character analysis
   - No sample answers visible

4. **Embed Teacher Rubrics**
   - 4-point rubric at each major checkpoint
   - Criteria aligned with learning objectives
   - Print-friendly format

5. **Implement Progressive Unlocking**
   - Validate completion before "Next" buttons work
   - Visual progress indicators
   - Cannot skip sections

### Estimated Scope
- **Files to modify**: 207 HTML files (L-47 to L-69)
- **Average changes per file**: 4-5 major additions
- **New code patterns needed**: 5 (as shown above)

---

## Conclusion

The current HTML files for L-47 to L-69 match L-46's structure but **L-46 itself is NOT a high-rigor template**. All files need significant enhancement to meet the five pedagogical rigor criteria.

**Recommendation**: Before building more files, create a NEW high-rigor template that includes all five elements, then use that as the standard for L-47 to L-69.

---

*Analysis completed: December 7, 2025*
*Repository: all-chapters-english*
*Chapters analyzed: L-46 (template), L-47, L-50, L-55, L-60, L-65*
