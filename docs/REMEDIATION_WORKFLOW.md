# Slide Deck Remediation Workflow

## Overview

This document outlines the systematic process for reviewing, fixing, and standardizing slide decks across the PFL Academy curriculum. The goal is to ensure all presentation materials meet quality standards, maintain consistent branding, and effectively support teaching objectives.

## Table of Contents

1. [Remediation Scope](#remediation-scope)
2. [Priority Matrix](#priority-matrix)
3. [Review Process](#review-process)
4. [Common Issues Checklist](#common-issues-checklist)
5. [Quality Standards](#quality-standards)
6. [Workflow Steps](#workflow-steps)
7. [File Organization](#file-organization)
8. [Tracking Progress](#tracking-progress)

## Remediation Scope

### Content Areas Requiring Slide Deck Review

| Standard | Chapters | Priority | Status |
|----------|----------|----------|--------|
| Standard 1 | 1.1 - 1.5 | High | Pending |
| Standard 2 | 2.1 - 2.5 | High | Pending |
| Standard 3 | 3.1 - 3.2 | Medium | Pending |
| Standard 4 | 4.1 | Medium | Pending |
| Standard 5 | 5.1 - 5.5 | Medium | Pending |
| Standard 6 | 6.1 | Medium | Pending |
| Standard 7 | 7.1 - 7.5 | Medium | Pending |
| Standard 8 | 8.1 | Medium | Pending |
| Standard 9 | 9.1 - 9.4 | Low | Pending |
| Standard 10 | 10.1 - 10.3 | Low | Pending |
| Standard 11 | 11.1 - 11.3 | Low | Pending |
| Standard 12 | 12.1 - 12.2 | Low | Pending |
| Standard 13 | 13.1 | Low | Pending |
| Standard 14 | 14.1 - 14.2 | Low | Pending |
| Standard 15 | 15.1 - 15.5 | Low | Pending |

## Priority Matrix

### High Priority
- Slide decks with broken links or missing assets
- Content with factual errors or outdated information
- Presentations not meeting accessibility requirements
- Materials for upcoming teaching dates

### Medium Priority
- Slide decks with inconsistent branding
- Presentations with minor formatting issues
- Content with unclear learning objectives
- Materials with font or color inconsistencies

### Low Priority
- Minor cosmetic improvements
- Enhanced animations or transitions
- Additional supplementary content
- Style refinements

## Review Process

### Phase 1: Initial Audit
1. Open each slide deck associated with a chapter
2. Document issues using the checklist below
3. Capture screenshots of critical problems
4. Log findings in the tracking spreadsheet

### Phase 2: Categorization
1. Classify issues by severity (Critical, Major, Minor)
2. Group similar issues across multiple decks
3. Identify patterns requiring batch fixes
4. Prioritize based on teaching schedule

### Phase 3: Remediation
1. Address critical issues first
2. Apply brand-consistent fixes
3. Verify all links and assets work
4. Test interactive elements

### Phase 4: Verification
1. Complete quality checklist for each deck
2. Obtain peer review sign-off
3. Test in presentation mode
4. Document any remaining known issues

## Common Issues Checklist

### Content Issues
- [ ] Factual accuracy verified
- [ ] Financial figures are current and realistic
- [ ] Examples are relevant to target audience
- [ ] Learning objectives align with lesson content
- [ ] No placeholder or Lorem ipsum text
- [ ] Speaker notes are complete and accurate

### Visual Issues
- [ ] PFL Academy branding applied consistently
- [ ] Color scheme follows brand guidelines (Primary: #4F46E5 Indigo)
- [ ] Fonts are consistent (Inter for primary, Georgia for secondary)
- [ ] Images are high resolution and properly licensed
- [ ] Charts and graphs are legible
- [ ] Slide layouts are balanced and readable
- [ ] No stretched or distorted images

### Technical Issues
- [ ] All hyperlinks functional
- [ ] Embedded videos load correctly
- [ ] Interactive elements work as intended
- [ ] File size is optimized (under 50MB recommended)
- [ ] Compatible with standard presentation software
- [ ] Exports correctly to PDF

### Accessibility Issues
- [ ] Sufficient color contrast (WCAG 2.1 AA)
- [ ] Alt text provided for all images
- [ ] Font size minimum 24pt for body text
- [ ] Logical reading order maintained
- [ ] No information conveyed by color alone
- [ ] Slide titles are descriptive and unique

### Alignment Issues
- [ ] Content matches teacher guide
- [ ] Timing aligns with lesson timeline
- [ ] Activities reference correct page numbers
- [ ] Assessment questions match rubric
- [ ] Skill builder instructions are clear

## Quality Standards

### Brand Guidelines

**Colors:**
- Primary: #4F46E5 (Indigo)
- Primary Light: #8e99f3
- Primary Dark: #26418f
- Secondary: #26a69a (Teal)
- Accent Success: #66bb6a
- Accent Warning: #ffa726
- Accent Danger: #ef5350

**Typography:**
- Headlines: Inter Bold, 36-48pt
- Subheads: Inter SemiBold, 28-32pt
- Body: Inter Regular, 24-28pt
- Captions: Inter Light, 18-20pt

**Layout Standards:**
- Maximum 6 bullet points per slide
- Maximum 30 words per slide (excluding activities)
- Consistent margins (0.5" minimum)
- Footer with chapter/slide number
- PFL Academy logo in header

### Content Standards

**Learning Objectives:**
- Use action verbs (Bloom's Taxonomy)
- Measurable and specific
- Aligned with assessment criteria

**Financial Examples:**
- Use realistic, relatable scenarios
- Include current market data where applicable
- Show clear calculations with steps
- Represent diverse economic situations

**Discussion Prompts:**
- Open-ended questions
- Multiple valid perspectives possible
- Connected to real-world applications

## Workflow Steps

### Step 1: Assignment
```
1. Select chapter from remediation queue
2. Download current slide deck and assets
3. Review associated teacher guide and student materials
4. Note the teaching timeline and priorities
```

### Step 2: Documentation
```
1. Open tracking document for the chapter
2. Go through each slide systematically
3. Document each issue with:
   - Slide number
   - Issue category
   - Severity level
   - Recommended fix
   - Screenshot (if applicable)
```

### Step 3: Remediation
```
1. Create backup copy of original deck
2. Work through issues by priority
3. Apply brand templates consistently
4. Update speaker notes as needed
5. Save with versioned filename
```

### Step 4: Review
```
1. Complete self-review checklist
2. Test all interactive elements
3. Run through in presentation mode
4. Submit for peer review
5. Address feedback
6. Mark as complete in tracker
```

### Step 5: Deployment
```
1. Export final version to required formats
2. Update file in appropriate directory:
   src/components/curriculum/standards/standard-X/chapters/X.X/assets/
3. Update references in teacher guide
4. Notify relevant stakeholders
5. Archive previous version
```

## File Organization

### Directory Structure
```
src/components/curriculum/standards/
├── standard-X/
│   ├── chapters/
│   │   ├── X.X/
│   │   │   ├── assets/
│   │   │   │   ├── slides/
│   │   │   │   │   ├── day1-presentation.pptx
│   │   │   │   │   ├── day1-presentation.pdf
│   │   │   │   │   ├── day2-presentation.pptx
│   │   │   │   │   └── day2-presentation.pdf
│   │   │   │   └── assets.md
│   │   │   ├── student/
│   │   │   └── teacher/
```

### Naming Conventions
- Slide decks: `day[1|2]-presentation.[format]`
- Supplementary: `[topic]-supplementary.[format]`
- Exports: Include date stamp for versioning
- Backups: `[original-name]_backup_YYYYMMDD.[format]`

## Tracking Progress

### Status Definitions
- **Not Started**: Chapter not yet assigned
- **In Progress**: Active remediation work
- **In Review**: Submitted for peer review
- **Revisions Needed**: Feedback requires changes
- **Complete**: All checks passed, deployed
- **On Hold**: Blocked by external dependency

### Metrics to Track
- Total chapters requiring remediation
- Chapters completed per week
- Average issues per chapter
- Common issue categories
- Time to completion by priority level

### Reporting Schedule
- Daily: Update status in tracking sheet
- Weekly: Summary of completed chapters
- Monthly: Full progress report with metrics

---

## Quick Reference: Remediation Checklist

### Before Starting
- [ ] Downloaded latest version of slide deck
- [ ] Reviewed teacher guide for context
- [ ] Checked teaching schedule for urgency
- [ ] Created backup of original file

### During Remediation
- [ ] Verified all content for accuracy
- [ ] Applied consistent branding
- [ ] Fixed all broken links/assets
- [ ] Updated speaker notes
- [ ] Tested interactive elements

### Before Submitting
- [ ] Completed full quality checklist
- [ ] Tested in presentation mode
- [ ] Verified accessibility compliance
- [ ] Documented any remaining issues
- [ ] Saved with correct naming convention

### After Approval
- [ ] Deployed to correct directory
- [ ] Updated teacher guide references
- [ ] Archived previous version
- [ ] Marked complete in tracker

---

## Contact and Support

For questions about this workflow or remediation priorities:
- Technical Issues: Check IMPLEMENTATION_GUIDE.md
- Content Questions: Refer to teacher guides
- Brand Guidelines: See design system documentation

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Initial | Initial workflow documentation |
