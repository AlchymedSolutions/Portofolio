import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_pdf():
    pdf_path = os.path.join("assets", "lerencer_kibidi_cv.pdf")
    os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
    
    # 0.75 inch margins
    margin = 54
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=margin,
        bottomMargin=margin
    )
    
    styles = getSampleStyleSheet()
    
    # Color Palette (Teal & Slate theme to match the portfolio)
    c_primary = colors.HexColor('#008f7a')     # Deep Teal
    c_accent = colors.HexColor('#0d9488')      # Teal
    c_dark = colors.HexColor('#0f172a')        # Slate 900
    c_text = colors.HexColor('#334155')        # Slate 700
    c_light = colors.HexColor('#64748b')       # Slate 500
    c_border = colors.HexColor('#e2e8f0')      # Slate 200
    
    # Typography Styles
    style_name = ParagraphStyle(
        'Name',
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=c_dark,
        spaceAfter=4
    )
    
    style_title = ParagraphStyle(
        'Title',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=c_primary,
        spaceAfter=10
    )
    
    style_contact = ParagraphStyle(
        'Contact',
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=c_light
    )
    
    style_section_heading = ParagraphStyle(
        'SectionHeading',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=c_primary,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )
    
    style_body = ParagraphStyle(
        'Body',
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=c_text,
        spaceAfter=6
    )
    
    style_bullet = ParagraphStyle(
        'Bullet',
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=c_text,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=3
    )
    
    style_job_title = ParagraphStyle(
        'JobTitle',
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=c_dark,
        keepWithNext=True
    )
    
    style_job_meta = ParagraphStyle(
        'JobMeta',
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=11,
        textColor=c_light,
        spaceAfter=5,
        keepWithNext=True
    )

    story = []
    
    # 1. Header Section
    story.append(Paragraph("LERENCER KIBIDI", style_name))
    story.append(Paragraph("Healthcare Data Analyst & Data Scientist", style_title))
    
    # Contact details in a 3-column table
    contact_data = [
        [
            Paragraph("📍 Chuka, Kenya", style_contact),
            Paragraph("📧 kabeyi24leren@gmail.com", style_contact),
            Paragraph("📞 +254 721 962 802", style_contact)
        ],
        [
            Paragraph("🔗 github.com/AlchymedSolutions", style_contact),
            Paragraph("🔗 linkedin.com/in/lerencer-kibidi", style_contact),
            Paragraph("", style_contact)
        ]
    ]
    
    contact_table = Table(contact_data, colWidths=[180, 180, 144])
    contact_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(contact_table)
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1, color=c_border, spaceBefore=4, spaceAfter=10))
    
    # 2. Professional Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", style_section_heading))
    summary_text = (
        "Highly motivated Healthcare Data Analyst and Data Scientist with over 7 years of "
        "hands-on experience in healthcare operations, medical insurance claims, and hospital administration. "
        "Leverages strong clinical domain knowledge combined with technical expertise in Python, R, Power BI, "
        "and SQL to build predictive machine learning models, design operational dashboards, and optimize hospital "
        "workflows. Proven track record of streamlining processes, reducing denied insurance claims by 30%, "
        "and improving operational efficiency."
    )
    story.append(Paragraph(summary_text, style_body))
    
    # 3. Core Expertise / Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS & CORE COMPETENCIES", style_section_heading))
    skills_data = [
        [
            Paragraph("<b>Data Analytics & ML:</b> Python, R, Pandas, NumPy, Scikit-Learn, Machine Learning, Predictive Modeling", style_body),
            Paragraph("<b>Healthcare Operations:</b> Medical Billing, Insurance Claims Processing, Patient Intake, NHIF/Jubilee/AAR", style_body)
        ],
        [
            Paragraph("<b>BI & Visualization:</b> Power BI, Tableau, Advanced Excel, SQL, Interactive Dashboard Design", style_body),
            Paragraph("<b>Clinical & Compliance:</b> Good Clinical Practice (GCP), Phlebotomy, Specimen Handling, BLS", style_body)
        ]
    ]
    skills_table = Table(skills_data, colWidths=[252, 252])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 4))
    
    # 4. Professional Experience
    story.append(Paragraph("PROFESSIONAL EXPERIENCE", style_section_heading))
    
    # Job 1
    story.append(Paragraph("Front Office Clerk", style_job_title))
    story.append(Paragraph("Optimal Family Limited | 2026 – Present | Nairobi, Kenya", style_job_meta))
    bullets_job1 = [
        "Streamlined the patient registration process, reducing average patient intake and waiting time by 35%.",
        "Implemented a data-driven scheduling system, improving appointment adherence by 20% and optimizing nurse staffing.",
        "Generated weekly operational reports and KPIs using Excel and Power BI for senior management review.",
        "Coordinated NHIF and private insurance pre-authorizations, ensuring high precision in patient records verification."
    ]
    for bullet in bullets_job1:
        story.append(Paragraph(f"• {bullet}", style_bullet))
    story.append(Spacer(1, 6))
    
    # Job 2
    story.append(Paragraph("Basic Administration", style_job_title))
    story.append(Paragraph("Chuka Nursing Home | 2025 | Chuka, Kenya", style_job_meta))
    bullets_job2 = [
        "Managed hospital patient records and ensured data integrity across departmental databases.",
        "Assisted in quarterly internal audits of medical records, ensuring compliance with Ministry of Health regulations.",
        "Supported the digital transformation team in transitioning physical archives to electronic health records (EHR) systems."
    ]
    for bullet in bullets_job2:
        story.append(Paragraph(f"• {bullet}", style_bullet))
    story.append(Spacer(1, 6))
    
    # Job 3
    story.append(Paragraph("Medical Claims Insurance Clerk", style_job_title))
    story.append(Paragraph("Chuka Nursing Home | 2023 – 2025 | Chuka, Kenya", style_job_meta))
    bullets_job3 = [
        "Processed over 500 medical insurance claims monthly with a 98% billing accuracy and documentation rate.",
        "Reduced overall claims rejection and denial rates by 25% through proactive audit and documentation standards.",
        "Developed custom claims tracking and reconciliation spreadsheets in Excel, adopted as the department-wide standard.",
        "Liaised daily with top-tier insurance companies (NHIF, AAR, Jubilee, CIC) to resolve disputed billings and payments.",
        "Conducted monthly financial reconciliations of billed amounts against actual reimbursements."
    ]
    for bullet in bullets_job3:
        story.append(Paragraph(f"• {bullet}", style_bullet))
    story.append(Spacer(1, 6))
    
    # Job 4
    story.append(Paragraph("Hospital Assistant", style_job_title))
    story.append(Paragraph("Chuka Nursing Home | 2022 – 2023 | Chuka, Kenya", style_job_meta))
    bullets_job4 = [
        "Assisted in patient triage and initial vital signs recording under supervisor guidance.",
        "Maintained pharmacy and medical supply inventories, identifying and reporting stock discrepancies.",
        "Supported clinical teams with digital entry of diagnostic results and laboratory orders."
    ]
    for bullet in bullets_job4:
        story.append(Paragraph(f"• {bullet}", style_bullet))
    story.append(Spacer(1, 6))

    # Job 5
    story.append(Paragraph("Front Office Clerk", style_job_title))
    story.append(Paragraph("Chuka Nursing Home | 2018 – 2022 | Chuka, Kenya", style_job_meta))
    bullets_job5 = [
        "Managed daily patient reception, intake, and inquiry workflows for a high-volume outpatient department averaging 80+ admissions per day.",
        "Designed and implemented an organized medical file storage system, reducing patient record retrieval times by 50%.",
        "Trained three new incoming reception and front office administrative staff on scheduling software and customer service standards."
    ]
    for bullet in bullets_job5:
        story.append(Paragraph(f"• {bullet}", style_bullet))
    story.append(Spacer(1, 6))
    
    # 5. Certifications & Credentials
    story.append(Paragraph("CERTIFICATIONS & CREDENTIALS", style_section_heading))
    certs = [
        "<b>Data Analysis, Machine Learning & AI</b> – Specialized technical training covering advanced predictive analytics, ML pipelines, and statistics.",
        "<b>Phlebotomy & Specimen Handling</b> – Clinical certification in blood collection, lab safety, and quality control.",
        "<b>Good Clinical Practice (GCP)</b> – International ethical and scientific quality standards for clinical trials.",
        "<b>Health Administration Excellence</b> – Advanced training in healthcare facility management and operational compliance.",
        "<b>Research Methodology</b> – Training in quantitative research design, data collection, and clinical biostatistics.",
        "<b>Basic Life Support (BLS)</b> – CPR, AED, and cardiovascular emergency response certified.",
        "<b>Training of Trainers (ToT)</b> – Professional certification in curriculum development and instructional design."
    ]
    for cert in certs:
        story.append(Paragraph(f"✓ {cert}", style_bullet))
        
    doc.build(story)
    print("PDF Successfully Generated!")

if __name__ == '__main__':
    generate_pdf()
