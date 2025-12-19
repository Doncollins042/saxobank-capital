#!/usr/bin/env python3
"""
SaxoBank Capital - Legal Documents Generator
Generates professional PDF documents for the investment platform
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, 
    Table, TableStyle, ListFlowable, ListItem, Image
)
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import os

# Brand Colors
NAVY = HexColor('#0a1628')
GOLD = HexColor('#D4AF37')
GREEN = HexColor('#0FAF76')
LIGHT_GRAY = HexColor('#f5f5f5')

def create_styles():
    """Create custom paragraph styles"""
    styles = getSampleStyleSheet()
    
    styles.add(ParagraphStyle(
        name='CoverTitle',
        parent=styles['Title'],
        fontSize=36,
        textColor=NAVY,
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    ))
    
    styles.add(ParagraphStyle(
        name='CoverSubtitle',
        parent=styles['Normal'],
        fontSize=16,
        textColor=GOLD,
        spaceAfter=40,
        alignment=TA_CENTER,
        fontName='Helvetica'
    ))
    
    styles.add(ParagraphStyle(
        name='SectionTitle',
        parent=styles['Heading1'],
        fontSize=18,
        textColor=NAVY,
        spaceBefore=25,
        spaceAfter=15,
        fontName='Helvetica-Bold'
    ))
    
    styles.add(ParagraphStyle(
        name='SubSection',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=NAVY,
        spaceBefore=15,
        spaceAfter=10,
        fontName='Helvetica-Bold'
    ))
    
    styles.add(ParagraphStyle(
        name='CustomBody',
        parent=styles['Normal'],
        fontSize=11,
        textColor=HexColor('#333333'),
        spaceBefore=6,
        spaceAfter=6,
        alignment=TA_JUSTIFY,
        leading=16
    ))
    
    styles.add(ParagraphStyle(
        name='BulletText',
        parent=styles['Normal'],
        fontSize=11,
        textColor=HexColor('#333333'),
        leftIndent=20,
        spaceBefore=4,
        spaceAfter=4
    ))
    
    styles.add(ParagraphStyle(
        name='Footer',
        parent=styles['Normal'],
        fontSize=9,
        textColor=HexColor('#666666'),
        alignment=TA_CENTER
    ))
    
    # Map BodyText to CustomBody for convenience
    styles.byName['BodyText'] = styles['CustomBody']
    
    return styles

def add_header_footer(canvas, doc):
    """Add header and footer to each page"""
    canvas.saveState()
    
    # Header line
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(2)
    canvas.line(inch, letter[1] - 0.5*inch, letter[0] - inch, letter[1] - 0.5*inch)
    
    # Header text
    canvas.setFont('Helvetica-Bold', 10)
    canvas.setFillColor(NAVY)
    canvas.drawString(inch, letter[1] - 0.4*inch, "SaxoBank Capital")
    
    # Footer
    canvas.setFont('Helvetica', 9)
    canvas.setFillColor(HexColor('#666666'))
    canvas.drawCentredString(letter[0]/2, 0.5*inch, f"Page {doc.page}")
    canvas.drawString(inch, 0.5*inch, "Confidential")
    canvas.drawRightString(letter[0] - inch, 0.5*inch, "© 2024 SaxoBank Capital")
    
    # Footer line
    canvas.setStrokeColor(LIGHT_GRAY)
    canvas.setLineWidth(1)
    canvas.line(inch, 0.75*inch, letter[0] - inch, 0.75*inch)
    
    canvas.restoreState()

def create_cover_page(story, styles, title, subtitle, version):
    """Create a professional cover page"""
    story.append(Spacer(1, 2*inch))
    story.append(Paragraph("SAXOBANK CAPITAL", styles['CoverSubtitle']))
    story.append(Spacer(1, 0.5*inch))
    story.append(Paragraph(title, styles['CoverTitle']))
    story.append(Spacer(1, 0.3*inch))
    story.append(Paragraph(subtitle, styles['CoverSubtitle']))
    story.append(Spacer(1, 2*inch))
    
    # Document info table
    info_data = [
        ['Document Version:', version],
        ['Classification:', 'Confidential'],
        ['Effective Date:', 'January 2024'],
        ['Last Updated:', 'December 2024'],
    ]
    
    info_table = Table(info_data, colWidths=[2*inch, 3*inch])
    info_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('TEXTCOLOR', (0, 0), (0, -1), NAVY),
        ('TEXTCOLOR', (1, 0), (1, -1), HexColor('#666666')),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(info_table)
    story.append(PageBreak())

def create_toc(story, styles, sections):
    """Create table of contents"""
    story.append(Paragraph("Table of Contents", styles['SectionTitle']))
    story.append(Spacer(1, 0.3*inch))
    
    for i, section in enumerate(sections, 1):
        story.append(Paragraph(f"{i}. {section}", styles['CustomBody']))
    
    story.append(PageBreak())

# ============ WHITE PAPER ============
def generate_whitepaper(output_path):
    """Generate comprehensive White Paper"""
    doc = SimpleDocTemplate(output_path, pagesize=letter, 
                           rightMargin=inch, leftMargin=inch,
                           topMargin=inch, bottomMargin=inch)
    styles = create_styles()
    story = []
    
    # Cover Page
    create_cover_page(story, styles, "WHITE PAPER", 
                     "Institutional Investment Platform", "Version 2.1")
    
    # Table of Contents
    sections = [
        "Executive Summary",
        "Company Overview", 
        "Investment Philosophy",
        "Asset Classes & Strategies",
        "Technology Infrastructure",
        "Security & Compliance",
        "Fee Structure",
        "Risk Management",
        "Governance & Team",
        "Roadmap & Future Vision"
    ]
    create_toc(story, styles, sections)
    
    # Section 1: Executive Summary
    story.append(Paragraph("1. Executive Summary", styles['SectionTitle']))
    story.append(Paragraph("""
    SaxoBank Capital is a premier institutional-grade investment platform designed to democratize access 
    to sophisticated investment opportunities traditionally reserved for high-net-worth individuals and 
    institutional investors. Our platform bridges the gap between retail investors and institutional-quality 
    assets through innovative technology, rigorous due diligence, and transparent operations.
    """, styles['CustomBody']))
    
    story.append(Paragraph("""
    Founded with the mission to provide secure, transparent, and profitable investment opportunities, 
    SaxoBank Capital has established itself as a trusted partner for investors seeking diversification 
    across multiple asset classes including real estate, cryptocurrency, equities, and precious metals.
    """, styles['CustomBody']))
    
    story.append(Paragraph("Key Highlights:", styles['SubSection']))
    highlights = [
        "Multi-asset investment platform with institutional-grade opportunities",
        "Rigorous due diligence process with 95% rejection rate on proposed investments",
        "Bank-level security with 256-bit SSL encryption and cold storage for digital assets",
        "Transparent fee structure with no hidden costs",
        "Dedicated customer support available 24/7",
        "Regulatory compliance across multiple jurisdictions"
    ]
    for h in highlights:
        story.append(Paragraph(f"• {h}", styles['BulletText']))
    
    story.append(PageBreak())
    
    # Section 2: Company Overview
    story.append(Paragraph("2. Company Overview", styles['SectionTitle']))
    story.append(Paragraph("2.1 Mission Statement", styles['SubSection']))
    story.append(Paragraph("""
    To provide sophisticated investment opportunities to a broader audience while maintaining the highest 
    standards of security, transparency, and investor protection. We believe that quality investments 
    should not be limited to the ultra-wealthy, and our platform serves as the bridge to institutional-grade 
    opportunities.
    """, styles['CustomBody']))
    
    story.append(Paragraph("2.2 Core Values", styles['SubSection']))
    values = [
        ("Transparency", "Complete visibility into all investment operations, fees, and performance metrics"),
        ("Security", "Industry-leading security measures protecting investor assets and data"),
        ("Excellence", "Unwavering commitment to delivering superior risk-adjusted returns"),
        ("Integrity", "Honest, ethical conduct in all business dealings"),
        ("Innovation", "Continuous improvement through technology and process optimization")
    ]
    for title, desc in values:
        story.append(Paragraph(f"<b>{title}:</b> {desc}", styles['CustomBody']))
    
    story.append(PageBreak())
    
    # Section 3: Investment Philosophy
    story.append(Paragraph("3. Investment Philosophy", styles['SectionTitle']))
    story.append(Paragraph("""
    Our investment philosophy is built on the foundation of diversification, risk management, and 
    long-term value creation. We employ a systematic approach to identifying, analyzing, and executing 
    investment opportunities across multiple asset classes.
    """, styles['CustomBody']))
    
    story.append(Paragraph("3.1 Diversification Strategy", styles['SubSection']))
    story.append(Paragraph("""
    We believe in strategic diversification across uncorrelated asset classes to minimize portfolio 
    volatility while maximizing risk-adjusted returns. Our platform offers exposure to:
    """, styles['CustomBody']))
    
    assets = [
        "Real Estate - Commercial and residential development projects",
        "Cryptocurrency - Blue-chip digital assets and DeFi strategies",
        "Equities - Dividend-paying stocks and growth portfolios",
        "Precious Metals - Gold, silver, and platinum investments",
        "Fixed Income - Corporate bonds and structured products"
    ]
    for a in assets:
        story.append(Paragraph(f"• {a}", styles['BulletText']))
    
    story.append(Paragraph("3.2 Due Diligence Process", styles['SubSection']))
    story.append(Paragraph("""
    Every investment opportunity undergoes our rigorous 5-stage due diligence process:
    """, styles['CustomBody']))
    
    dd_stages = [
        ("Stage 1 - Initial Screening", "Preliminary assessment of opportunity viability and alignment with platform criteria"),
        ("Stage 2 - Financial Analysis", "Deep-dive into financial projections, historical performance, and market conditions"),
        ("Stage 3 - Legal Review", "Comprehensive legal due diligence including regulatory compliance and documentation"),
        ("Stage 4 - Risk Assessment", "Identification and quantification of all material risks"),
        ("Stage 5 - Committee Approval", "Final review and approval by the Investment Committee")
    ]
    for title, desc in dd_stages:
        story.append(Paragraph(f"<b>{title}:</b> {desc}", styles['CustomBody']))
    
    story.append(PageBreak())
    
    # Section 4: Asset Classes
    story.append(Paragraph("4. Asset Classes & Strategies", styles['SectionTitle']))
    
    story.append(Paragraph("4.1 Real Estate Investments", styles['SubSection']))
    story.append(Paragraph("""
    Our real estate portfolio focuses on development funding, income-generating properties, and 
    value-add opportunities in prime markets. Investment structures include:
    """, styles['CustomBody']))
    re_types = [
        "Development Funding - Pre-construction financing with profit-sharing upon sale",
        "Income Properties - Stabilized assets generating consistent rental income",
        "Value-Add Projects - Properties with enhancement potential for capital appreciation",
        "REIT Participation - Exposure to diversified real estate portfolios"
    ]
    for r in re_types:
        story.append(Paragraph(f"• {r}", styles['BulletText']))
    
    story.append(Paragraph("4.2 Cryptocurrency Investments", styles['SubSection']))
    story.append(Paragraph("""
    Our digital asset strategy combines conservative blue-chip holdings with strategic DeFi yield 
    generation. All digital assets are held in institutional-grade custody solutions with 
    comprehensive insurance coverage.
    """, styles['CustomBody']))
    
    story.append(Paragraph("4.3 Equity Investments", styles['SubSection']))
    story.append(Paragraph("""
    Our equity strategies range from conservative dividend-focused portfolios to growth-oriented 
    thematic funds targeting emerging sectors such as artificial intelligence, renewable energy, 
    and biotechnology.
    """, styles['CustomBody']))
    
    story.append(Paragraph("4.4 Precious Metals", styles['SubSection']))
    story.append(Paragraph("""
    Precious metals serve as portfolio insurance and inflation hedge. Our strategies include 
    algorithmic trading, physical holdings, and mining equity investments.
    """, styles['CustomBody']))
    
    story.append(PageBreak())
    
    # Section 5: Technology
    story.append(Paragraph("5. Technology Infrastructure", styles['SectionTitle']))
    story.append(Paragraph("""
    SaxoBank Capital leverages cutting-edge technology to deliver a seamless, secure investment 
    experience. Our platform architecture is designed for scalability, reliability, and security.
    """, styles['CustomBody']))
    
    story.append(Paragraph("5.1 Platform Features", styles['SubSection']))
    features = [
        "Real-time portfolio tracking and performance analytics",
        "Automated investment processing and settlement",
        "Multi-factor authentication and biometric security",
        "API integration for institutional clients",
        "Mobile-responsive design for on-the-go access",
        "Comprehensive reporting and tax documentation"
    ]
    for f in features:
        story.append(Paragraph(f"• {f}", styles['BulletText']))
    
    story.append(Paragraph("5.2 Security Architecture", styles['SubSection']))
    story.append(Paragraph("""
    Our security infrastructure employs multiple layers of protection:
    """, styles['CustomBody']))
    security = [
        "256-bit SSL/TLS encryption for all data transmission",
        "AES-256 encryption for data at rest",
        "Multi-signature wallets for cryptocurrency holdings",
        "Cold storage for 95% of digital assets",
        "Regular third-party security audits",
        "SOC 2 Type II compliance"
    ]
    for s in security:
        story.append(Paragraph(f"• {s}", styles['BulletText']))
    
    story.append(PageBreak())
    
    # Section 6: Security & Compliance
    story.append(Paragraph("6. Security & Compliance", styles['SectionTitle']))
    story.append(Paragraph("""
    SaxoBank Capital maintains the highest standards of security and regulatory compliance to protect 
    investor assets and ensure platform integrity.
    """, styles['CustomBody']))
    
    story.append(Paragraph("6.1 Regulatory Framework", styles['SubSection']))
    story.append(Paragraph("""
    We operate in compliance with applicable securities regulations and maintain licenses where required. 
    Our compliance program includes:
    """, styles['CustomBody']))
    compliance = [
        "Anti-Money Laundering (AML) procedures",
        "Know Your Customer (KYC) verification",
        "FATF recommendation compliance",
        "GDPR data protection compliance",
        "Regular regulatory reporting"
    ]
    for c in compliance:
        story.append(Paragraph(f"• {c}", styles['BulletText']))
    
    story.append(PageBreak())
    
    # Section 7: Fee Structure
    story.append(Paragraph("7. Fee Structure", styles['SectionTitle']))
    story.append(Paragraph("""
    SaxoBank Capital operates on a transparent fee model with no hidden costs. Our fees are structured 
    to align our interests with those of our investors.
    """, styles['CustomBody']))
    
    fee_data = [
        ['Fee Type', 'Rate', 'Description'],
        ['Management Fee', '1.5% annually', 'Charged on assets under management'],
        ['Performance Fee', '15%', 'On profits exceeding hurdle rate'],
        ['Deposit Fee', '0%', 'No fees for deposits'],
        ['Withdrawal Fee', '0.5%', 'Minimum $10, Maximum $100'],
        ['Early Exit Fee', '2%', 'If withdrawn before maturity'],
    ]
    
    fee_table = Table(fee_data, colWidths=[1.8*inch, 1.3*inch, 2.5*inch])
    fee_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('ALIGN', (1, 0), (1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, LIGHT_GRAY]),
    ]))
    story.append(fee_table)
    
    story.append(PageBreak())
    
    # Section 8: Risk Management
    story.append(Paragraph("8. Risk Management", styles['SectionTitle']))
    story.append(Paragraph("""
    Effective risk management is fundamental to our investment process. We employ a comprehensive 
    risk framework designed to identify, measure, and mitigate risks across all investment activities.
    """, styles['CustomBody']))
    
    story.append(Paragraph("8.1 Risk Categories", styles['SubSection']))
    risks = [
        ("Market Risk", "Exposure to adverse market movements; mitigated through diversification"),
        ("Credit Risk", "Risk of counterparty default; managed through thorough due diligence"),
        ("Liquidity Risk", "Inability to exit positions; addressed through liquidity buffers"),
        ("Operational Risk", "System failures or fraud; controlled via robust processes"),
        ("Regulatory Risk", "Compliance changes; monitored through legal counsel")
    ]
    for title, desc in risks:
        story.append(Paragraph(f"<b>{title}:</b> {desc}", styles['CustomBody']))
    
    story.append(PageBreak())
    
    # Section 9: Governance
    story.append(Paragraph("9. Governance & Team", styles['SectionTitle']))
    story.append(Paragraph("""
    SaxoBank Capital is led by an experienced team of investment professionals, technologists, and 
    compliance experts with decades of combined experience in financial services.
    """, styles['CustomBody']))
    
    story.append(Paragraph("9.1 Leadership Team", styles['SubSection']))
    story.append(Paragraph("""
    Our executive team brings diverse expertise from leading financial institutions, technology 
    companies, and regulatory bodies.
    """, styles['CustomBody']))
    
    story.append(Paragraph("9.2 Advisory Board", styles['SubSection']))
    story.append(Paragraph("""
    The Advisory Board comprises industry veterans who provide strategic guidance and oversight 
    on investment decisions, risk management, and corporate governance.
    """, styles['CustomBody']))
    
    story.append(PageBreak())
    
    # Section 10: Roadmap
    story.append(Paragraph("10. Roadmap & Future Vision", styles['SectionTitle']))
    story.append(Paragraph("""
    SaxoBank Capital continues to evolve and expand our offerings to better serve our investors. 
    Our strategic roadmap includes:
    """, styles['CustomBody']))
    
    roadmap = [
        ("Q1 2024", "Launch of mobile application for iOS and Android"),
        ("Q2 2024", "Introduction of automated portfolio rebalancing"),
        ("Q3 2024", "Expansion into European and Asian markets"),
        ("Q4 2024", "Launch of tokenized real estate offerings"),
        ("2025", "Introduction of AI-powered investment recommendations")
    ]
    for period, milestone in roadmap:
        story.append(Paragraph(f"<b>{period}:</b> {milestone}", styles['CustomBody']))
    
    story.append(Spacer(1, inch))
    story.append(Paragraph("---", styles['CustomBody']))
    story.append(Paragraph("""
    <i>This White Paper is for informational purposes only and does not constitute an offer to sell or 
    a solicitation of an offer to buy any securities. Past performance is not indicative of future results. 
    All investments carry risk, including the potential loss of principal.</i>
    """, styles['Footer']))
    
    # Build document
    doc.build(story, onFirstPage=add_header_footer, onLaterPages=add_header_footer)
    print(f"Generated: {output_path}")

# ============ TERMS OF SERVICE ============
def generate_terms_of_service(output_path):
    """Generate Terms of Service document"""
    doc = SimpleDocTemplate(output_path, pagesize=letter,
                           rightMargin=inch, leftMargin=inch,
                           topMargin=inch, bottomMargin=inch)
    styles = create_styles()
    story = []
    
    create_cover_page(story, styles, "TERMS OF SERVICE", 
                     "User Agreement", "Version 3.0")
    
    sections = [
        "Acceptance of Terms",
        "Definitions",
        "Account Registration",
        "Investment Services",
        "User Obligations",
        "Fees and Payments",
        "Intellectual Property",
        "Limitation of Liability",
        "Dispute Resolution",
        "Modifications and Termination"
    ]
    create_toc(story, styles, sections)
    
    # Content
    story.append(Paragraph("1. Acceptance of Terms", styles['SectionTitle']))
    story.append(Paragraph("""
    By accessing or using the SaxoBank Capital platform ("Platform"), you agree to be bound by these 
    Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Platform.
    """, styles['CustomBody']))
    story.append(Paragraph("""
    These Terms constitute a legally binding agreement between you and SaxoBank Capital Limited 
    ("Company," "we," "us," or "our"). Please read these Terms carefully before using our services.
    """, styles['CustomBody']))
    
    story.append(Paragraph("2. Definitions", styles['SectionTitle']))
    definitions = [
        ('"Account"', 'means your registered account on the Platform'),
        ('"Investment"', 'means any financial product or opportunity offered through the Platform'),
        ('"User"', 'means any individual or entity that registers for and uses the Platform'),
        ('"Services"', 'means all investment and related services provided through the Platform'),
        ('"Content"', 'means all text, graphics, data, and other materials on the Platform')
    ]
    for term, defn in definitions:
        story.append(Paragraph(f"<b>{term}</b> {defn}", styles['CustomBody']))
    
    story.append(PageBreak())
    
    story.append(Paragraph("3. Account Registration", styles['SectionTitle']))
    story.append(Paragraph("3.1 Eligibility", styles['SubSection']))
    story.append(Paragraph("""
    To use the Platform, you must: (a) be at least 18 years of age or the age of majority in your 
    jurisdiction; (b) have the legal capacity to enter into binding contracts; (c) not be prohibited 
    from using the Platform under applicable laws; and (d) complete our KYC verification process.
    """, styles['CustomBody']))
    
    story.append(Paragraph("3.2 Account Security", styles['SubSection']))
    story.append(Paragraph("""
    You are responsible for maintaining the confidentiality of your account credentials and for all 
    activities that occur under your account. You agree to immediately notify us of any unauthorized 
    use of your account or any other breach of security.
    """, styles['CustomBody']))
    
    story.append(Paragraph("4. Investment Services", styles['SectionTitle']))
    story.append(Paragraph("""
    The Platform provides access to various investment opportunities across multiple asset classes. 
    All investments are subject to risk, including the potential loss of principal. Past performance 
    is not indicative of future results.
    """, styles['CustomBody']))
    
    story.append(Paragraph("4.1 Investment Decisions", styles['SubSection']))
    story.append(Paragraph("""
    You acknowledge that all investment decisions are made solely by you. The Company does not provide 
    personalized investment advice and any information provided on the Platform is for informational 
    purposes only.
    """, styles['CustomBody']))
    
    story.append(PageBreak())
    
    story.append(Paragraph("5. User Obligations", styles['SectionTitle']))
    story.append(Paragraph("You agree to:", styles['CustomBody']))
    obligations = [
        "Provide accurate and complete information during registration",
        "Keep your account information up to date",
        "Comply with all applicable laws and regulations",
        "Not use the Platform for any unlawful purposes",
        "Not attempt to gain unauthorized access to the Platform",
        "Not interfere with or disrupt the Platform's operations"
    ]
    for o in obligations:
        story.append(Paragraph(f"• {o}", styles['BulletText']))
    
    story.append(Paragraph("6. Fees and Payments", styles['SectionTitle']))
    story.append(Paragraph("""
    You agree to pay all fees associated with your use of the Platform as described in our Fee Schedule. 
    All fees are non-refundable unless otherwise stated. We reserve the right to modify our fees upon 
    30 days' notice.
    """, styles['CustomBody']))
    
    story.append(Paragraph("7. Intellectual Property", styles['SectionTitle']))
    story.append(Paragraph("""
    All content on the Platform, including but not limited to text, graphics, logos, and software, 
    is the property of SaxoBank Capital or its licensors and is protected by intellectual property laws.
    """, styles['CustomBody']))
    
    story.append(PageBreak())
    
    story.append(Paragraph("8. Limitation of Liability", styles['SectionTitle']))
    story.append(Paragraph("""
    TO THE MAXIMUM EXTENT PERMITTED BY LAW, SAXOBANK CAPITAL SHALL NOT BE LIABLE FOR ANY INDIRECT, 
    INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR 
    GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE PLATFORM.
    """, styles['CustomBody']))
    
    story.append(Paragraph("9. Dispute Resolution", styles['SectionTitle']))
    story.append(Paragraph("""
    Any disputes arising from these Terms shall be resolved through binding arbitration in accordance 
    with the rules of the International Chamber of Commerce. The arbitration shall be conducted in 
    English and the seat of arbitration shall be London, United Kingdom.
    """, styles['CustomBody']))
    
    story.append(Paragraph("10. Modifications and Termination", styles['SectionTitle']))
    story.append(Paragraph("""
    We reserve the right to modify these Terms at any time. Material changes will be communicated to 
    you via email or through the Platform. Your continued use of the Platform after such changes 
    constitutes acceptance of the modified Terms.
    """, styles['CustomBody']))
    
    story.append(Spacer(1, inch))
    story.append(Paragraph("""
    <i>Last Updated: December 2024</i>
    """, styles['Footer']))
    
    doc.build(story, onFirstPage=add_header_footer, onLaterPages=add_header_footer)
    print(f"Generated: {output_path}")

# ============ PRIVACY POLICY ============
def generate_privacy_policy(output_path):
    """Generate Privacy Policy document"""
    doc = SimpleDocTemplate(output_path, pagesize=letter,
                           rightMargin=inch, leftMargin=inch,
                           topMargin=inch, bottomMargin=inch)
    styles = create_styles()
    story = []
    
    create_cover_page(story, styles, "PRIVACY POLICY", 
                     "Data Protection & Privacy", "GDPR Compliant")
    
    sections = [
        "Introduction",
        "Information We Collect",
        "How We Use Your Information",
        "Information Sharing",
        "Data Security",
        "Data Retention",
        "Your Rights",
        "Cookies and Tracking",
        "International Transfers",
        "Contact Information"
    ]
    create_toc(story, styles, sections)
    
    story.append(Paragraph("1. Introduction", styles['SectionTitle']))
    story.append(Paragraph("""
    SaxoBank Capital Limited ("we," "us," or "our") is committed to protecting your privacy and 
    personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
    information when you use our platform.
    """, styles['CustomBody']))
    story.append(Paragraph("""
    This policy complies with the General Data Protection Regulation (GDPR), the California Consumer 
    Privacy Act (CCPA), and other applicable data protection laws.
    """, styles['CustomBody']))
    
    story.append(Paragraph("2. Information We Collect", styles['SectionTitle']))
    story.append(Paragraph("2.1 Personal Information", styles['SubSection']))
    personal_info = [
        "Full legal name and date of birth",
        "Contact information (email, phone, address)",
        "Government-issued identification documents",
        "Financial information (bank accounts, tax ID)",
        "Employment and income information",
        "Investment preferences and risk tolerance"
    ]
    for p in personal_info:
        story.append(Paragraph(f"• {p}", styles['BulletText']))
    
    story.append(Paragraph("2.2 Technical Information", styles['SubSection']))
    tech_info = [
        "IP address and device identifiers",
        "Browser type and operating system",
        "Usage data and interaction patterns",
        "Cookies and similar technologies"
    ]
    for t in tech_info:
        story.append(Paragraph(f"• {t}", styles['BulletText']))
    
    story.append(PageBreak())
    
    story.append(Paragraph("3. How We Use Your Information", styles['SectionTitle']))
    story.append(Paragraph("We use your information to:", styles['CustomBody']))
    uses = [
        "Provide and maintain our services",
        "Process your investments and transactions",
        "Verify your identity and prevent fraud",
        "Comply with legal and regulatory requirements",
        "Communicate with you about your account",
        "Improve and personalize your experience",
        "Send marketing communications (with your consent)"
    ]
    for u in uses:
        story.append(Paragraph(f"• {u}", styles['BulletText']))
    
    story.append(Paragraph("4. Information Sharing", styles['SectionTitle']))
    story.append(Paragraph("""
    We do not sell your personal information. We may share your information with:
    """, styles['CustomBody']))
    sharing = [
        "Service providers who assist in our operations",
        "Financial institutions for payment processing",
        "Regulatory authorities as required by law",
        "Professional advisors (lawyers, accountants)",
        "Business partners with your consent"
    ]
    for s in sharing:
        story.append(Paragraph(f"• {s}", styles['BulletText']))
    
    story.append(Paragraph("5. Data Security", styles['SectionTitle']))
    story.append(Paragraph("""
    We implement industry-standard security measures to protect your data, including:
    """, styles['CustomBody']))
    security = [
        "256-bit SSL/TLS encryption",
        "AES-256 encryption for data at rest",
        "Multi-factor authentication",
        "Regular security audits and penetration testing",
        "Employee training on data protection",
        "Access controls and monitoring"
    ]
    for sec in security:
        story.append(Paragraph(f"• {sec}", styles['BulletText']))
    
    story.append(PageBreak())
    
    story.append(Paragraph("6. Data Retention", styles['SectionTitle']))
    story.append(Paragraph("""
    We retain your personal information for as long as necessary to provide our services and comply 
    with legal obligations. After account closure, we may retain certain information as required by 
    law or for legitimate business purposes.
    """, styles['CustomBody']))
    
    story.append(Paragraph("7. Your Rights", styles['SectionTitle']))
    story.append(Paragraph("Under applicable data protection laws, you have the right to:", styles['CustomBody']))
    rights = [
        "Access your personal information",
        "Correct inaccurate or incomplete data",
        "Delete your personal information",
        "Restrict or object to processing",
        "Data portability",
        "Withdraw consent at any time",
        "Lodge a complaint with a supervisory authority"
    ]
    for r in rights:
        story.append(Paragraph(f"• {r}", styles['BulletText']))
    
    story.append(Paragraph("8. Cookies and Tracking", styles['SectionTitle']))
    story.append(Paragraph("""
    We use cookies and similar tracking technologies to enhance your experience. You can control 
    cookie settings through your browser. Essential cookies are necessary for the platform to function 
    properly.
    """, styles['CustomBody']))
    
    story.append(Paragraph("9. International Transfers", styles['SectionTitle']))
    story.append(Paragraph("""
    Your information may be transferred to and processed in countries other than your own. We ensure 
    appropriate safeguards are in place, including Standard Contractual Clauses approved by the 
    European Commission.
    """, styles['CustomBody']))
    
    story.append(Paragraph("10. Contact Information", styles['SectionTitle']))
    story.append(Paragraph("""
    For privacy-related inquiries or to exercise your rights, please contact our Data Protection Officer:
    """, styles['CustomBody']))
    story.append(Paragraph("Email: privacy@saxobankcapital.com", styles['CustomBody']))
    story.append(Paragraph("Address: SaxoBank Capital, Data Protection Office", styles['CustomBody']))
    
    doc.build(story, onFirstPage=add_header_footer, onLaterPages=add_header_footer)
    print(f"Generated: {output_path}")

# ============ RISK DISCLOSURE ============
def generate_risk_disclosure(output_path):
    """Generate Risk Disclosure document"""
    doc = SimpleDocTemplate(output_path, pagesize=letter,
                           rightMargin=inch, leftMargin=inch,
                           topMargin=inch, bottomMargin=inch)
    styles = create_styles()
    story = []
    
    create_cover_page(story, styles, "RISK DISCLOSURE", 
                     "Investment Risk Statement", "Required Reading")
    
    sections = [
        "Important Notice",
        "General Investment Risks",
        "Asset-Specific Risks",
        "Market Risks",
        "Operational Risks",
        "Regulatory Risks",
        "Technology Risks",
        "Risk Mitigation",
        "Investor Suitability",
        "Acknowledgment"
    ]
    create_toc(story, styles, sections)
    
    story.append(Paragraph("1. Important Notice", styles['SectionTitle']))
    story.append(Paragraph("""
    <b>PLEASE READ THIS DOCUMENT CAREFULLY BEFORE MAKING ANY INVESTMENT DECISIONS.</b>
    """, styles['CustomBody']))
    story.append(Paragraph("""
    This Risk Disclosure Statement is designed to inform you about the significant risks associated 
    with investing through the SaxoBank Capital platform. All investments carry inherent risks, 
    including the potential loss of your entire investment. Past performance is not indicative of 
    future results.
    """, styles['CustomBody']))
    story.append(Paragraph("""
    You should not invest money that you cannot afford to lose. If you are uncertain about the 
    suitability of any investment, you should seek independent financial advice before proceeding.
    """, styles['CustomBody']))
    
    story.append(Paragraph("2. General Investment Risks", styles['SectionTitle']))
    story.append(Paragraph("2.1 Capital at Risk", styles['SubSection']))
    story.append(Paragraph("""
    Your capital is at risk when you invest. The value of investments can go down as well as up, 
    and you may receive back less than your original investment. In some cases, you may lose your 
    entire investment.
    """, styles['CustomBody']))
    
    story.append(Paragraph("2.2 No Guaranteed Returns", styles['SubSection']))
    story.append(Paragraph("""
    Projected returns are estimates only and are not guaranteed. Actual returns may be significantly 
    different from projections due to various factors beyond our control.
    """, styles['CustomBody']))
    
    story.append(Paragraph("2.3 Illiquidity Risk", styles['SubSection']))
    story.append(Paragraph("""
    Many investments offered on our platform are illiquid and cannot be easily sold or converted to 
    cash. You may not be able to exit your investment before the stated maturity date.
    """, styles['CustomBody']))
    
    story.append(PageBreak())
    
    story.append(Paragraph("3. Asset-Specific Risks", styles['SectionTitle']))
    
    story.append(Paragraph("3.1 Real Estate Risks", styles['SubSection']))
    re_risks = [
        "Property values may decline due to market conditions",
        "Development projects may face delays or cost overruns",
        "Rental income may be lower than projected",
        "Tenants may default on rental payments",
        "Properties may require unexpected repairs or maintenance",
        "Regulatory changes may affect property values"
    ]
    for r in re_risks:
        story.append(Paragraph(f"• {r}", styles['BulletText']))
    
    story.append(Paragraph("3.2 Cryptocurrency Risks", styles['SubSection']))
    crypto_risks = [
        "Extreme price volatility (values can change dramatically in hours)",
        "Regulatory uncertainty and potential bans",
        "Security risks including hacking and theft",
        "Technology failures and smart contract vulnerabilities",
        "Market manipulation and liquidity issues",
        "Complete loss of value is possible"
    ]
    for c in crypto_risks:
        story.append(Paragraph(f"• {c}", styles['BulletText']))
    
    story.append(Paragraph("3.3 Equity Risks", styles['SubSection']))
    equity_risks = [
        "Stock prices fluctuate based on market conditions",
        "Individual companies may fail or underperform",
        "Dividends may be reduced or eliminated",
        "Market corrections can significantly impact portfolios"
    ]
    for e in equity_risks:
        story.append(Paragraph(f"• {e}", styles['BulletText']))
    
    story.append(Paragraph("3.4 Precious Metals Risks", styles['SubSection']))
    metal_risks = [
        "Prices are affected by global economic conditions",
        "Storage and insurance costs reduce returns",
        "No income generation (unlike dividend stocks)",
        "Currency fluctuations can impact returns"
    ]
    for m in metal_risks:
        story.append(Paragraph(f"• {m}", styles['BulletText']))
    
    story.append(PageBreak())
    
    story.append(Paragraph("4. Market Risks", styles['SectionTitle']))
    story.append(Paragraph("""
    All investments are subject to market risks, including:
    """, styles['CustomBody']))
    market_risks = [
        ("Interest Rate Risk", "Changes in interest rates can affect investment values"),
        ("Inflation Risk", "Rising inflation may erode real returns"),
        ("Currency Risk", "Exchange rate fluctuations can impact international investments"),
        ("Economic Risk", "Recessions and economic downturns affect all asset classes"),
        ("Geopolitical Risk", "Political events and conflicts can impact markets")
    ]
    for title, desc in market_risks:
        story.append(Paragraph(f"<b>{title}:</b> {desc}", styles['CustomBody']))
    
    story.append(Paragraph("5. Operational Risks", styles['SectionTitle']))
    story.append(Paragraph("""
    Operational risks include potential failures in systems, processes, or controls that may affect 
    your investments or access to the platform.
    """, styles['CustomBody']))
    
    story.append(Paragraph("6. Regulatory Risks", styles['SectionTitle']))
    story.append(Paragraph("""
    Changes in laws and regulations may adversely affect investments or the operation of the platform. 
    Regulatory action could restrict or prohibit certain investment activities.
    """, styles['CustomBody']))
    
    story.append(PageBreak())
    
    story.append(Paragraph("9. Investor Suitability", styles['SectionTitle']))
    story.append(Paragraph("""
    Investments on our platform may not be suitable for all investors. You should consider:
    """, styles['CustomBody']))
    suitability = [
        "Your investment objectives and time horizon",
        "Your risk tolerance and ability to absorb losses",
        "Your overall financial situation",
        "Your need for liquidity",
        "Your investment experience and knowledge"
    ]
    for s in suitability:
        story.append(Paragraph(f"• {s}", styles['BulletText']))
    
    story.append(Paragraph("10. Acknowledgment", styles['SectionTitle']))
    story.append(Paragraph("""
    By investing through SaxoBank Capital, you acknowledge that you have read, understood, and 
    accepted the risks described in this document. You confirm that you are making investment 
    decisions based on your own judgment and are not relying on any representation or advice 
    from SaxoBank Capital.
    """, styles['CustomBody']))
    
    doc.build(story, onFirstPage=add_header_footer, onLaterPages=add_header_footer)
    print(f"Generated: {output_path}")

# ============ AML/KYC POLICY ============
def generate_aml_kyc_policy(output_path):
    """Generate AML/KYC Policy document"""
    doc = SimpleDocTemplate(output_path, pagesize=letter,
                           rightMargin=inch, leftMargin=inch,
                           topMargin=inch, bottomMargin=inch)
    styles = create_styles()
    story = []
    
    create_cover_page(story, styles, "AML/KYC POLICY", 
                     "Anti-Money Laundering & Know Your Customer", "FATF Compliant")
    
    sections = [
        "Policy Statement",
        "Regulatory Framework",
        "Customer Due Diligence",
        "KYC Requirements",
        "Enhanced Due Diligence",
        "Ongoing Monitoring",
        "Suspicious Activity Reporting",
        "Record Keeping",
        "Training and Awareness",
        "Policy Review"
    ]
    create_toc(story, styles, sections)
    
    story.append(Paragraph("1. Policy Statement", styles['SectionTitle']))
    story.append(Paragraph("""
    SaxoBank Capital is committed to maintaining the highest standards of Anti-Money Laundering (AML) 
    and Counter-Terrorism Financing (CTF) compliance. This policy outlines our procedures for 
    preventing the use of our platform for money laundering, terrorist financing, or other financial crimes.
    """, styles['CustomBody']))
    story.append(Paragraph("""
    We operate a zero-tolerance policy towards money laundering and terrorist financing. All employees, 
    agents, and partners are required to comply with this policy and applicable laws.
    """, styles['CustomBody']))
    
    story.append(Paragraph("2. Regulatory Framework", styles['SectionTitle']))
    story.append(Paragraph("Our AML/KYC program complies with:", styles['CustomBody']))
    regulations = [
        "Financial Action Task Force (FATF) Recommendations",
        "EU Anti-Money Laundering Directives (AMLD)",
        "Bank Secrecy Act (BSA) and USA PATRIOT Act",
        "UK Money Laundering Regulations",
        "Local regulations in jurisdictions where we operate"
    ]
    for reg in regulations:
        story.append(Paragraph(f"• {reg}", styles['BulletText']))
    
    story.append(PageBreak())
    
    story.append(Paragraph("3. Customer Due Diligence", styles['SectionTitle']))
    story.append(Paragraph("3.1 Standard Due Diligence", styles['SubSection']))
    story.append(Paragraph("""
    All customers must complete our Customer Due Diligence (CDD) process before accessing investment 
    services. This includes:
    """, styles['CustomBody']))
    cdd = [
        "Verification of identity using government-issued documents",
        "Verification of residential address",
        "Assessment of source of funds",
        "Risk profiling based on customer information",
        "Screening against sanctions and PEP lists"
    ]
    for c in cdd:
        story.append(Paragraph(f"• {c}", styles['BulletText']))
    
    story.append(Paragraph("4. KYC Requirements", styles['SectionTitle']))
    story.append(Paragraph("4.1 Individual Customers", styles['SubSection']))
    story.append(Paragraph("Required documents include:", styles['CustomBody']))
    individual_docs = [
        "Valid government-issued photo ID (passport, driver's license, national ID)",
        "Proof of address (utility bill, bank statement - dated within 3 months)",
        "Selfie holding the ID document",
        "Source of funds declaration",
        "Tax identification number"
    ]
    for doc in individual_docs:
        story.append(Paragraph(f"• {doc}", styles['BulletText']))
    
    story.append(Paragraph("4.2 Corporate Customers", styles['SubSection']))
    story.append(Paragraph("Additional requirements for corporate accounts:", styles['CustomBody']))
    corporate_docs = [
        "Certificate of incorporation",
        "Memorandum and articles of association",
        "Register of directors and shareholders",
        "Board resolution authorizing account opening",
        "KYC documents for all beneficial owners (>25% ownership)",
        "Financial statements"
    ]
    for item in corporate_docs:
        story.append(Paragraph(f"• {item}", styles['BulletText']))
    
    story.append(PageBreak())
    
    story.append(Paragraph("5. Enhanced Due Diligence", styles['SectionTitle']))
    story.append(Paragraph("""
    Enhanced Due Diligence (EDD) is required for high-risk customers, including:
    """, styles['CustomBody']))
    edd_triggers = [
        "Politically Exposed Persons (PEPs) and their associates",
        "Customers from high-risk jurisdictions",
        "Complex or unusual transaction patterns",
        "High-value transactions exceeding $50,000",
        "Customers with adverse media coverage"
    ]
    for trigger in edd_triggers:
        story.append(Paragraph(f"• {trigger}", styles['BulletText']))
    
    story.append(Paragraph("6. Ongoing Monitoring", styles['SectionTitle']))
    story.append(Paragraph("""
    We conduct continuous monitoring of customer accounts and transactions to detect suspicious 
    activity. This includes:
    """, styles['CustomBody']))
    monitoring = [
        "Transaction monitoring against expected activity patterns",
        "Periodic review of customer risk profiles",
        "Screening against updated sanctions lists",
        "Investigation of unusual activity alerts",
        "Regular refresh of customer information"
    ]
    for m in monitoring:
        story.append(Paragraph(f"• {m}", styles['BulletText']))
    
    story.append(Paragraph("7. Suspicious Activity Reporting", styles['SectionTitle']))
    story.append(Paragraph("""
    All suspicious activity must be reported to the designated Compliance Officer immediately. 
    Suspicious Activity Reports (SARs) will be filed with relevant authorities as required by law. 
    Employees are prohibited from "tipping off" customers about SAR filings.
    """, styles['CustomBody']))
    
    story.append(Paragraph("8. Record Keeping", styles['SectionTitle']))
    story.append(Paragraph("""
    All customer identification documents, transaction records, and due diligence information are 
    retained for a minimum of 7 years after the end of the business relationship.
    """, styles['CustomBody']))
    
    doc.build(story, onFirstPage=add_header_footer, onLaterPages=add_header_footer)
    print(f"Generated: {output_path}")

# ============ INVESTMENT GUIDELINES ============
def generate_investment_guidelines(output_path):
    """Generate Investment Guidelines document"""
    doc = SimpleDocTemplate(output_path, pagesize=letter,
                           rightMargin=inch, leftMargin=inch,
                           topMargin=inch, bottomMargin=inch)
    styles = create_styles()
    story = []
    
    create_cover_page(story, styles, "INVESTMENT GUIDELINES", 
                     "Investor Handbook", "Version 2.0")
    
    sections = [
        "Introduction",
        "Investment Categories",
        "Minimum Investment Requirements",
        "Investment Process",
        "Returns and Payouts",
        "Portfolio Allocation",
        "Redemption Policy",
        "Reinvestment Options",
        "Tax Considerations",
        "Investor Support"
    ]
    create_toc(story, styles, sections)
    
    story.append(Paragraph("1. Introduction", styles['SectionTitle']))
    story.append(Paragraph("""
    Welcome to SaxoBank Capital. This Investment Guidelines document provides comprehensive information 
    about our investment offerings, processes, and policies. Please read this document carefully to 
    understand how to maximize your investment experience on our platform.
    """, styles['CustomBody']))
    
    story.append(Paragraph("2. Investment Categories", styles['SectionTitle']))
    
    # Investment categories table
    cat_data = [
        ['Category', 'Target Return', 'Term', 'Risk Level'],
        ['Real Estate', '12-18%', '12-36 months', 'Medium'],
        ['Cryptocurrency', '15-40%', '6-12 months', 'High'],
        ['Stocks & Bonds', '6-20%', '12-24 months', 'Low-Medium'],
        ['Precious Metals', '8-15%', '12-24 months', 'Low'],
        ['Investment Plans', '8-30%', '12-24 months', 'Varies'],
    ]
    
    cat_table = Table(cat_data, colWidths=[1.8*inch, 1.3*inch, 1.5*inch, 1.2*inch])
    cat_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, LIGHT_GRAY]),
    ]))
    story.append(cat_table)
    
    story.append(PageBreak())
    
    story.append(Paragraph("3. Minimum Investment Requirements", styles['SectionTitle']))
    
    min_data = [
        ['Investment Type', 'Minimum Amount (USD)'],
        ['Real Estate - Development', '$25,000'],
        ['Real Estate - Income', '$15,000'],
        ['Cryptocurrency - Blue Chip', '$5,000'],
        ['Cryptocurrency - DeFi', '$10,000'],
        ['Stocks - Dividend', '$5,000'],
        ['Stocks - Growth', '$3,000'],
        ['Precious Metals', '$2,500'],
        ['Investment Plans', '$10,000 - $25,000'],
    ]
    
    min_table = Table(min_data, colWidths=[3.5*inch, 2*inch])
    min_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('ALIGN', (1, 0), (1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, LIGHT_GRAY]),
    ]))
    story.append(min_table)
    
    story.append(Paragraph("4. Investment Process", styles['SectionTitle']))
    story.append(Paragraph("4.1 Steps to Invest", styles['SubSection']))
    steps = [
        ("Step 1: Account Setup", "Complete registration and KYC verification"),
        ("Step 2: Fund Your Account", "Deposit funds via cryptocurrency"),
        ("Step 3: Browse Opportunities", "Review available investments and documentation"),
        ("Step 4: Select Investment", "Choose investment amount and confirm"),
        ("Step 5: Confirmation", "Receive confirmation and access dashboard"),
        ("Step 6: Monitor", "Track performance through your portfolio dashboard")
    ]
    for title, desc in steps:
        story.append(Paragraph(f"<b>{title}:</b> {desc}", styles['CustomBody']))
    
    story.append(PageBreak())
    
    story.append(Paragraph("5. Returns and Payouts", styles['SectionTitle']))
    story.append(Paragraph("5.1 Payout Schedules", styles['SubSection']))
    story.append(Paragraph("""
    Payout frequency varies by investment type:
    """, styles['CustomBody']))
    payouts = [
        "Real Estate Income: Quarterly distributions",
        "Real Estate Development: Upon project completion/sale",
        "Cryptocurrency: Monthly or upon maturity",
        "Dividend Stocks: Quarterly dividends",
        "Precious Metals: Upon sale/maturity",
        "Investment Plans: As specified in plan terms"
    ]
    for p in payouts:
        story.append(Paragraph(f"• {p}", styles['BulletText']))
    
    story.append(Paragraph("5.2 Payout Methods", styles['SubSection']))
    story.append(Paragraph("""
    Returns can be withdrawn via:
    """, styles['CustomBody']))
    methods = [
        "Cryptocurrency (BTC, ETH, USDT, USDC, BNB, LTC)",
        "Reinvestment into new opportunities",
        "Other methods available via customer support"
    ]
    for m in methods:
        story.append(Paragraph(f"• {m}", styles['BulletText']))
    
    story.append(Paragraph("6. Portfolio Allocation", styles['SectionTitle']))
    story.append(Paragraph("6.1 Recommended Allocation", styles['SubSection']))
    story.append(Paragraph("""
    We recommend diversifying across multiple asset classes based on your risk tolerance:
    """, styles['CustomBody']))
    
    allocation_data = [
        ['Risk Profile', 'Real Estate', 'Crypto', 'Stocks', 'Metals'],
        ['Conservative', '40%', '10%', '30%', '20%'],
        ['Balanced', '30%', '20%', '35%', '15%'],
        ['Aggressive', '20%', '35%', '35%', '10%'],
    ]
    
    alloc_table = Table(allocation_data, colWidths=[1.3*inch, 1.1*inch, 1.1*inch, 1.1*inch, 1.1*inch])
    alloc_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(alloc_table)
    
    story.append(PageBreak())
    
    story.append(Paragraph("7. Redemption Policy", styles['SectionTitle']))
    story.append(Paragraph("""
    Most investments have fixed terms and cannot be redeemed early. However, under certain 
    circumstances, early redemption may be permitted:
    """, styles['CustomBody']))
    story.append(Paragraph("• Early redemption fee: 2% of invested amount", styles['BulletText']))
    story.append(Paragraph("• Minimum holding period: 30 days for most investments", styles['BulletText']))
    story.append(Paragraph("• Processing time: 5-10 business days", styles['BulletText']))
    story.append(Paragraph("• Contact support to initiate early redemption request", styles['BulletText']))
    
    story.append(Paragraph("8. Reinvestment Options", styles['SectionTitle']))
    story.append(Paragraph("""
    Upon maturity, you have the following options:
    """, styles['CustomBody']))
    reinvest = [
        "Automatic reinvestment into similar opportunities",
        "Manual selection of new investments",
        "Full withdrawal to your account balance",
        "Partial reinvestment with remainder withdrawn"
    ]
    for r in reinvest:
        story.append(Paragraph(f"• {r}", styles['BulletText']))
    
    story.append(Paragraph("9. Tax Considerations", styles['SectionTitle']))
    story.append(Paragraph("""
    Investment returns may be subject to taxation in your jurisdiction. SaxoBank Capital does not 
    provide tax advice. We recommend consulting with a qualified tax professional regarding the 
    tax implications of your investments. Annual tax statements are provided upon request.
    """, styles['CustomBody']))
    
    story.append(Paragraph("10. Investor Support", styles['SectionTitle']))
    story.append(Paragraph("""
    Our dedicated investor support team is available to assist you:
    """, styles['CustomBody']))
    story.append(Paragraph("• Live Chat: Available 24/7 on the platform", styles['BulletText']))
    story.append(Paragraph("• WhatsApp: Direct messaging support", styles['BulletText']))
    story.append(Paragraph("• Support Tickets: Submit detailed inquiries", styles['BulletText']))
    story.append(Paragraph("• Response Time: Within 24 hours for all inquiries", styles['BulletText']))
    
    doc.build(story, onFirstPage=add_header_footer, onLaterPages=add_header_footer)
    print(f"Generated: {output_path}")

# ============ MAIN ============
def main():
    """Generate all documents"""
    output_dir = "public/documents"
    os.makedirs(output_dir, exist_ok=True)
    
    print("Generating SaxoBank Capital Legal Documents...")
    print("=" * 50)
    
    generate_whitepaper(f"{output_dir}/SaxoBank_Capital_WhitePaper.pdf")
    generate_terms_of_service(f"{output_dir}/SaxoBank_Capital_Terms_of_Service.pdf")
    generate_privacy_policy(f"{output_dir}/SaxoBank_Capital_Privacy_Policy.pdf")
    generate_risk_disclosure(f"{output_dir}/SaxoBank_Capital_Risk_Disclosure.pdf")
    generate_aml_kyc_policy(f"{output_dir}/SaxoBank_Capital_AML_KYC_Policy.pdf")
    generate_investment_guidelines(f"{output_dir}/SaxoBank_Capital_Investment_Guidelines.pdf")
    
    print("=" * 50)
    print("All documents generated successfully!")

if __name__ == "__main__":
    main()
