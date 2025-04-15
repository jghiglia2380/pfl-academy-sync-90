# Asset Specifications for 7.3: Understanding Credit Scores

## DAY 1 ASSETS

### Credit Score Components Chart

**Purpose:** Visually represent the five factors that make up a FICO credit score and their relative importance.

**Design specifications:**
- Pie chart showing: Payment History (35%), Credit Utilization (30%), Length of Credit History (15%), Credit Mix (10%), New Credit (10%)
- Each section should be a different color with clear labels
- Include a brief description of each component beneath the chart

### Skill Builder Worksheet

**Purpose:** Guide students' reflection on credit score factors.

**Design specifications:**
- Digital-first format with fillable text fields
- Include the credit score components chart at the top
- Provide clear space for responding to each reflection prompt
- Include a submission button that saves responses to student portfolio

## DAY 2 LEARNING LAB ASSETS

### Credit Score Simulator

**Purpose:** Allow students to experiment with different financial behaviors and see their impact on credit scores over time.

**Inputs:** N/A (standalone simulator)

**Expected Outputs:** Simulated credit score changes based on student choices.

**Interaction Model:**
- Sequential decision points where students choose actions (e.g., "You need to make a credit card payment. Do you: Pay in full, Pay minimum, Pay late, Skip payment")
- Animated credit score meter that adjusts after each decision
- Timeline acceleration to show long-term impacts

**Integration Needs:** None

### Credit Score Impact Calculator

**Purpose:** Demonstrate the real financial cost of different credit score ranges.

**Inputs:** User-selected loan amounts and terms.

**Expected Outputs:** Comparison of interest rates and total costs across credit score ranges.

**Interaction Model:**
- Dropdown menus for loan type, amount, and term
- Interactive table showing interest rates for different credit score ranges
- Automatic calculation of monthly payments and total interest paid
- Visual graph comparing costs

**Integration Needs:** None

### Personal Credit Strategy Builder

**Purpose:** Help students develop a personalized plan for building/maintaining good credit.

**Inputs:** Student responses from Day 1 Skill Builder.

**Expected Outputs:** A customized credit strategy document.

**Interaction Model:**
- Auto-populated section showing student's Day 1 reflections on easiest/hardest factors
- Guided strategy builder with dropdown menus for selecting specific actions for each credit factor
- Timeline selector for short-term (1-6 months), medium-term (6-24 months), and long-term (2-5 years) goals
- Text fields for adding personal notes

**Integration Needs:** Must import student responses from Day 1 Skill Builder.

### Final Reflection Module

**Purpose:** Solidify learning and encourage application beyond the classroom.

**Inputs:** Student interaction with day's activities.

**Expected Outputs:** Thoughtful reflection on credit strategy application.

**Interaction Model:**
- Text entry fields for reflection responses
- Ability to reference earlier activities
- Option to save reflection to student portfolio

**Integration Needs:** Should be able to reference student's completed strategy.

## BOLT.NEW UI/UX SPECIFICATIONS

### Overall Layout

- Clean, modern interface with financial theme
- Progressive disclosure of activities (each section expands when previous is completed)
- Persistent navigation allowing students to revisit previous sections
- Progress tracker showing completion status

### Color Scheme

- Use financial blue as primary color (#1E3A8A)
- Use contrasting colors for different credit score ranges (excellent: green, good: blue, fair: yellow, poor: orange, very poor: red)
- Ensure all color combinations meet accessibility standards

### Typography

- Sans-serif font for readability on digital screens
- Use size hierarchy to distinguish between instructions, content, and reflections
- Bold important terms that connect to Day 1 vocabulary

### Interactivity

- Include hover states for all interactive elements
- Provide immediate feedback for student inputs
- Use animations sparingly to highlight score changes or important connections

### Specific Page Structure

1. Introduction section with podcast player
2. Credit Score Simulator section with interactive decision points
3. Credit Score Impact Calculator with data visualization
4. Personal Credit Strategy Builder with imported Day 1 data
5. Final Reflection section with submission functionality

### Mobile Responsiveness

- Ensure all components work on tablets and desktop computers
- Adapt layout for different screen sizes while maintaining functionality
- Consider touch interactions for tablet users