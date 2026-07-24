# PFL Academy: State Variables A/B Test Summary

## Overview
Testing whether enhanced state-specific data presentation improves educational value and competitive positioning.

---

## Version A: Control (Current)
**Features:**
- Basic state variables: `{{STATE_NAME}}`, `{{STATE_MEDIAN_RENT}}`, `{{STATE_MIN_WAGE}}`
- Static data integrated into lesson content
- Standard styling throughout

**Example:** *"In {{STATE_NAME}}, median rent is ${{STATE_MEDIAN_RENT}}/month."*

---

## Version B: Enhanced
**New Features:**

| Feature | Description | Benefit |
|---------|-------------|---------|
| **Data Freshness Banner** | Shows last/next update dates | Builds trust, signals active maintenance |
| **National Comparisons** | "12% below national avg" tags | Adds context, increases engagement |
| **State Resource Links** | Direct links to tenant rights, education dept | Practical utility, differentiator |
| **Source Attribution** | Footer citations (Census, HUD, state agencies) | Credibility, transparency |
| **Visual Distinction** | Gradient backgrounds, color-coded tags | Premium feel, easier scanning |

**Example:**
```
📊 Texas Data | Median Rent: $1,450 [8% below avg]
Updated: Jan 2025 | Next: Jul 2025
📍 Texas Tenant Resources: [Landlord-Tenant Rights] | [Consumer Protection]
```

---

## Implementation Assessment

| Factor | Control (A) | Enhanced (B) |
|--------|-------------|--------------|
| **Dev Time** | Baseline | +8-12 hours |
| **Maintenance** | Low | Medium (semi-annual updates) |
| **Data Sources** | 3-4 per state | 8-10 per state |
| **Complexity** | Simple | Moderate |

---

## Cost-Benefit Analysis

### Costs
- Initial build: ~10 dev hours
- Data sourcing: ~2 hours/state (50 states = 100 hours one-time)
- Semi-annual refresh: ~20 hours/cycle

### Benefits
- **Competitive moat**: Harder to replicate than static content
- **Trust signal**: Dated data shows active curation
- **SEO potential**: State-specific resource pages
- **Engagement**: Comparison tags add context
- **Utility**: Direct links to official resources

---

## Recommendation

**Test Approach:** Deploy Enhanced (B) to 3-5 states, measure:
1. Time on page
2. Resource link clicks
3. Student/teacher feedback
4. Completion rates

**Decision Point:** If engagement increases >15% or qualitative feedback is strongly positive, roll out to all states.

---

## Files Location

| Version | Asset Files | Slide Decks |
|---------|-------------|-------------|
| Control (A) | `/all-chapters-english/` | `/english-decks/` |
| Enhanced (B) | `/all-chapters-english-enhanced/` | `/english-decks-enhanced/` |

---

## Key Question for Stakeholders

> Is the enhanced version's added trust, utility, and competitive differentiation worth the incremental maintenance cost (~40 hours/year)?

---

*Document: PFL Academy A/B Test Summary | December 2024*
