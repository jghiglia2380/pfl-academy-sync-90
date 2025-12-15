#!/usr/bin/env python3
"""
Script to add state variables to curriculum markdown files.
- Adds {{STATE_NAME}} to intro paragraph of ALL chapters
- Adds extended state variables to 11 specific chapters
"""

import os
import re
from pathlib import Path

# Mapping of chapters to their extended state variables
EXTENDED_VARIABLES = {
    "1.2": ["{{TUITION_PUBLIC}}", "{{TAX_INCENTIVES}}", "{{MIN_WAGE}}"],
    "1.3": ["{{INCOME_TAX_RATE}}", "{{LOCAL_INCOME_TAX}}", "{{MIN_WAGE}}"],
    "2.1": ["{{INCOME_TAX_RATE}}", "{{SALES_TAX}}", "{{LOCAL_SALES_TAX_MAX}}", "{{COMBINED_SALES_TAX_MAX}}"],
    "2.2": ["{{INCOME_TAX_RATE}}", "{{TAX_INCENTIVES}}"],
    "4.1": ["{{AVG_MONTHLY_FEE}}", "{{AVG_OVERDRAFT_FEE}}"],
    "8.1": ["{{TUITION_PUBLIC}}", "{{TAX_INCENTIVES}}", "{{MIN_WAGE}}"],
    "10.3": ["{{MEDIAN_RENT}}", "{{MEDIAN_HOME_PRICE}}", "{{AVG_MORTGAGE_RATE_30YR}}"],
    "11.1": ["{{MEDIAN_RENT}}", "{{CONSUMER_PROTECTION_AGENCY}}"],
    "11.2": ["{{MEDIAN_HOME_PRICE}}", "{{AVG_MORTGAGE_RATE_30YR}}", "{{PROPERTY_TAX_COUNTY_RATE}}"],
    "12.1": ["{{HOMEOWNERS_AVG_MONTHLY}}", "{{INSURANCE_AVG_TEEN}}", "{{MEDIAN_HOME_PRICE}}"],
}

def add_state_name_to_intro(content, file_type='student'):
    """Add {{STATE_NAME}} to the introduction paragraph."""
    # Find the Introduction section - different pattern for teacher vs student
    if file_type == 'teacher':
        # Teacher guides use "#### Introduction (5 minutes)"
        intro_pattern = r'(#### Introduction \(\d+ minutes\)\n\n)(.*?)(\n\n####)'
    else:
        # Student guides use "## Introduction"
        intro_pattern = r'(## Introduction\n)(.*?)(\n\n)'

    match = re.search(intro_pattern, content, re.DOTALL)
    if match:
        intro_header = match.group(1)
        intro_text = match.group(2)
        separator = match.group(3)

        # Check if {{STATE_NAME}} already exists
        if '{{STATE_NAME}}' in intro_text:
            return content

        # Add {{STATE_NAME}} to the first sentence in a natural way
        if file_type == 'teacher':
            # For teacher guides, add to bullet points
            # Add "In {{STATE_NAME}}, ..." to the second bullet point
            lines = intro_text.strip().split('\n')
            if len(lines) > 1 and lines[1].startswith('- '):
                lines[1] = lines[1].replace('- ', f'- In {{{{STATE_NAME}}}}, ', 1).replace('  ', ' ')
                intro_text = '\n'.join(lines) + '\n'
        else:
            # For student guides, add to prose paragraphs
            if intro_text.startswith('When you'):
                intro_text = re.sub(r'^(When you [^,]+)', r'\1 in {{STATE_NAME}}', intro_text)
            elif intro_text.startswith('Pursuing') or intro_text.startswith('Understanding'):
                intro_text = re.sub(r'(\.)', r' in {{STATE_NAME}}.', intro_text, count=1)
            elif intro_text.startswith('Taxes are') or intro_text.startswith('In today'):
                paragraphs = intro_text.split('\n\n')
                if len(paragraphs) > 1:
                    paragraphs[1] = f'Here in {{{{STATE_NAME}}}}, {paragraphs[1][0].lower()}{paragraphs[1][1:]}'
                    intro_text = '\n\n'.join(paragraphs)
            else:
                intro_text = f'In {{{{STATE_NAME}}}}, {intro_text[0].lower()}{intro_text[1:]}'

        # Reconstruct the content
        if file_type == 'teacher':
            # For teacher, need to preserve the next section marker
            new_content = content[:match.start()] + intro_header + intro_text + '\n' + match.group(3) + content[match.end():]
        else:
            new_content = content[:match.start()] + intro_header + intro_text + separator + content[match.end():]
        return new_content

    return content

def add_extended_variables(content, chapter_num, file_type):
    """Add extended state variables to specific chapters."""
    if chapter_num not in EXTENDED_VARIABLES:
        return content

    variables = EXTENDED_VARIABLES[chapter_num]

    # Check if any extended variables already exist in the content
    if any(var in content for var in variables):
        return content

    # For student files, add variables in the Introduction section
    if file_type == 'student':
        # Find a good place to insert the variables - typically in the second or third paragraph
        intro_pattern = r'(## Introduction\n.*?\n\n.*?\n\n)'
        match = re.search(intro_pattern, content, re.DOTALL)

        if match:
            intro_section = match.group(1)

            # Add variables contextually based on chapter
            var_text = ""
            if chapter_num == "1.2":
                var_text = f"\n\nIn {{{{STATE_NAME}}}}, public university tuition averages {{{{TUITION_PUBLIC}}}} per year, and the state offers tax incentives like {{{{TAX_INCENTIVES}}}} to help families save. With a minimum wage of {{{{MIN_WAGE}}}}, students can also explore work-study opportunities.\n\n"
            elif chapter_num == "1.3":
                var_text = f"\n\nHere in {{{{STATE_NAME}}}}, the state income tax rate is {{{{INCOME_TAX_RATE}}}}%, and the state {'{'}does not have{'}'} local income taxes. With a minimum wage of {{{{MIN_WAGE}}}}, understanding these deductions is crucial for financial planning.\n\n"
            elif chapter_num == "2.1":
                var_text = f"\n\nFor example, in {{{{STATE_NAME}}}}, the state income tax rate is {{{{INCOME_TAX_RATE}}}}%, while the state sales tax is {{{{SALES_TAX}}}}%. With local sales taxes, the combined rate can reach up to {{{{COMBINED_SALES_TAX_MAX}}}}%.\n\n"
            elif chapter_num == "2.2":
                var_text = f"\n\nIn {{{{STATE_NAME}}}}, with a state income tax rate of {{{{INCOME_TAX_RATE}}}}%, understanding tax brackets helps you plan effectively. The state also offers tax incentives like {{{{TAX_INCENTIVES}}}} to reduce your tax burden legally.\n\n"
            elif chapter_num == "4.1":
                var_text = f"\n\nHere in {{{{STATE_NAME}}}}, the average monthly account fee is {{{{AVG_MONTHLY_FEE}}}}, and overdraft fees average {{{{AVG_OVERDRAFT_FEE}}}}. Understanding these costs helps you choose the right banking services.\n\n"
            elif chapter_num == "8.1":
                var_text = f"\n\nIn {{{{STATE_NAME}}}}, public university tuition averages {{{{TUITION_PUBLIC}}}} per year. With state programs like {{{{TAX_INCENTIVES}}}} and a minimum wage of {{{{MIN_WAGE}}}}, students have various options to manage education costs.\n\n"
            elif chapter_num == "10.3":
                var_text = f"\n\nIn {{{{STATE_NAME}}}}, the median rent is {{{{MEDIAN_RENT}}}} per month, while the median home price is {{{{MEDIAN_HOME_PRICE}}}}. With current mortgage rates around {{{{AVG_MORTGAGE_RATE_30YR}}}}%, this decision requires careful analysis.\n\n"
            elif chapter_num == "11.1":
                var_text = f"\n\nHere in {{{{STATE_NAME}}}}, the median rent is {{{{MEDIAN_RENT}}}} per month. Understanding your rights as a tenant is crucial, and resources like {{{{CONSUMER_PROTECTION_AGENCY}}}} can help protect you.\n\n"
            elif chapter_num == "11.2":
                var_text = f"\n\nIn {{{{STATE_NAME}}}}, the median home price is {{{{MEDIAN_HOME_PRICE}}}}, with mortgage rates around {{{{AVG_MORTGAGE_RATE_30YR}}}}%. Property taxes, averaging {{{{PROPERTY_TAX_COUNTY_RATE}}}}% at the county level, are an important consideration.\n\n"
            elif chapter_num == "12.1":
                var_text = f"\n\nIn {{{{STATE_NAME}}}}, homeowners insurance averages {{{{HOMEOWNERS_AVG_MONTHLY}}}} per month, while teen auto insurance averages {{{{INSURANCE_AVG_TEEN}}}}. With a median home price of {{{{MEDIAN_HOME_PRICE}}}}, proper insurance coverage is essential.\n\n"

            # Insert after the intro section
            new_content = content[:match.end()] + var_text + content[match.end():]
            return new_content

    return content

def process_file(file_path, chapter_num, file_type):
    """Process a single markdown file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Add {{STATE_NAME}} to intro
        content = add_state_name_to_intro(content, file_type)

        # Add extended variables if applicable
        content = add_extended_variables(content, chapter_num, file_type)

        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        return True
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Main function to process all files."""
    base_path = Path("src/components/curriculum/standards")

    # Find all student and teacher day1.md files
    student_files = list(base_path.glob("*/chapters/*/student/day1.md"))
    teacher_files = list(base_path.glob("*/chapters/*/teacher/guide-day1.md"))

    print(f"Found {len(student_files)} student files and {len(teacher_files)} teacher files")

    # Process student files
    print("\nProcessing student files...")
    for file_path in sorted(student_files):
        # Extract chapter number (e.g., "1.2" from path)
        parts = file_path.parts
        chapter_num = parts[-3]  # e.g., "1.2"

        print(f"  Processing {chapter_num}/student/day1.md")
        process_file(file_path, chapter_num, 'student')

    # Process teacher files
    print("\nProcessing teacher files...")
    for file_path in sorted(teacher_files):
        # Extract chapter number
        parts = file_path.parts
        chapter_num = parts[-3]  # e.g., "1.2"

        print(f"  Processing {chapter_num}/teacher/guide-day1.md")
        process_file(file_path, chapter_num, 'teacher')

    print("\n✓ Complete!")

if __name__ == "__main__":
    main()
