# Asset Specifications for Chapter 5.2: Understanding the Power of Compound Interest and the Rule of 72

## DAY 1 ASSETS

### Compound Interest and Rule of 72 Worksheet

**Purpose:** Help students understand and calculate compound interest growth and apply the Rule of 72.

**Design Requirements:**
- Digital spreadsheet with calculations that students can manipulate
- Print-ready PDF version for classrooms without digital access
- Clear sections for:
  - Variables (initial investment, monthly contribution, interest rate, time horizon)
  - Compound interest calculation example
  - Questions about total savings and growth
  - Rule of 72 calculation table
  - Reflection question

**Content Requirements:**
- Pre-populated example showing $500 growing to $8,587.62 over 10 years
- Formulas that automatically calculate growth based on entered variables
- Table for Rule of 72 calculations with interest rates from 2% to 12%
- Clear instructions for completing each section

### Visual Aid: Simple vs. Compound Interest Graph

**Purpose:** Visually demonstrate the difference between simple and compound interest over time.

**Design Requirements:**
- Clean, professional graph showing both simple and compound interest curves
- X-axis showing time (0-30 years)
- Y-axis showing dollar amount (starting at $1,000)
- Clear labels and legend
- Digital format for display on screen
- Printable format for handouts

**Content Requirements:**
- Plot showing $1,000 with simple interest at 5% over 30 years ($2,500)
- Plot showing $1,000 with compound interest at 5% over 30 years ($4,322)
- Clear annotation pointing out the significant difference ($1,822)

## DAY 2 LEARNING LAB UI/UX DESIGN SPECIFICATIONS

### Overview Page

**Purpose:** Provide an orientation to the Learning Lab activities and review key concepts.
**Design:** Clean, engaging layout with navigation to all activities.
**Elements:**

- Header with title "The Power of Compound Interest in Action"
- Brief introduction text (use Day 2 intro text from student content)
- Navigation cards for each activity with icons representing:
    - Compound Interest Simulator
    - Goal-Setting Activity
    - Time Value of Money Challenge
    - Portfolio Integration

### Asset 1: Compound Interest Simulator

**Purpose:** Allow students to visualize compound interest growth with adjustable variables.
**Inputs:** Student-defined variables (initial investment, monthly contribution, interest rate, time period)
**Expected Outputs:** Visual graph showing growth over time and final amounts
**Interaction Model:**

- Slider controls for each variable:
    - Initial investment ($0-$10,000)
    - Monthly contribution ($0-$1,000)
    - Interest rate (0%-12%)
    - Time period (1-50 years)
- Dynamic graph that updates in real-time as sliders move
- Data table showing year-by-year growth
- Toggle between linear and logarithmic graph scales

**Integration Needs:** None required

### Asset 2: Goal-Setting Activity

**Purpose:** Help students create a personalized savings plan for a specific financial goal.
**Inputs:**

- Student's financial goal (from dropdown or text entry)
- Target amount
- Target date
- Various savings strategies to test

**Expected Outputs:** Completed savings plan with optimal strategy identified
**Interaction Model:**
- Form fields for goal information
- Integration with compound interest simulator
- Strategy comparison table
- Save button to store final plan

**Integration Needs:** Should import responses from Day 1 reflection prompt about savings goals if available

### Asset 3: Time Value of Money Challenge

**Purpose:** Test students' understanding of opportunity cost and long-term financial decisions.
**Inputs:** Student decisions in various scenarios
**Expected Outputs:** Results showing long-term impact of choices
**Interaction Model:**

- Interactive scenario cards with multiple-choice decisions
- Results page after each decision showing the long-term financial impact
- Final summary page showing cumulative results of all decisions

**Integration Needs:** None required

### Asset 4: Portfolio Integration

**Purpose:** Allow students to document their personalized savings and investment strategy.
**Inputs:** Student responses about their financial strategy
**Expected Outputs:** Completed portfolio section on savings and investment approach
**Interaction Model:**

- Text fields for strategy description
- Drop-down menus for selecting time horizons and risk tolerance
- Option to import results from Goal-Setting Activity
- Save button to update portfolio

**Integration Needs:** Should import student responses from Day 1 Skill Builder

### Visual Design Specifications

- Color scheme: Use blues and greens for graphs and financial data (associated with growth and prosperity)
- Typography: Clean, readable sans-serif font for data
- Graphs: Include clear legends, gridlines, and axis labels
- Interactive elements: Use subtle animations for slider movements and graph updates
- Mobile responsiveness: Ensure all tools function on various screen sizes

### Technical Requirements

- Compound interest calculator should use the formula: A = P(1 + r/n)^(nt) + PMT × (((1 + r/n)^(nt) - 1) / (r/n))
Where:
    - A = final amount
    - P = initial principal
    - r = annual interest rate (decimal)
    - n = number of times interest compounds per year
    - t = time in years
    - PMT = regular payment amount
- All calculators should handle decimal inputs appropriately
- Data should persist between page navigation within the Learning Lab
- Results should be exportable to PDF format for students who need printable versions