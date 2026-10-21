"""Conteúdo público honesto, alinhado aos repositórios e aos contatos já cadastrados.

Projetos placeholder antigos permanecem no banco, apenas inativos.
"""

import json

from sqlalchemy.orm import Session

from models import Category, Contact, Profile, Project, Skill

PLACEHOLDER_PROJECTS = {
    "SecAudit Framework",
    "ThreatHunter",
    "CryptoVault",
    "NetGuard Monitor",
    "API Gateway Microservices",
    "Dashboard Full Stack",
    "Task Automation Engine",
    "CI/CD Pipeline Toolkit",
    "Sales Forecasting Model",
    "Customer Churn Predictor",
    "ETL Data Pipeline",
}

FICTIONAL_SKILLS = {
    "Pentest & Ethical Hacking",
    "Análise de Vulnerabilidades",
    "SIEM & Monitoramento",
    "Firewall & Redes",
    "Python & Automação",
    "Compliance (ISO 27001, LGPD)",
}

RETIRED_CATEGORY_SLUGS = {"seguranca", "programacao", "dados"}

PROFILE = {
    "name": "Jonathan Venancio",
    "title": "Cybersecurity | Offensive & Defensive Security",
    "subtitle": "Identificar vulnerabilidades. Reduzir riscos. Fortalecer sistemas.",
    "tagline": "Identificar vulnerabilidades. Reduzir riscos. Fortalecer sistemas.",
    "email": "jonathan.ghabriel@gmail.com",
}

CATEGORIES = [
    {
        "name": "Offensive Security",
        "slug": "offensive-security",
        "command": "ls projetos/offensive/",
        "description": "Projetos pessoais de reconhecimento. Sem trabalhos de cliente.",
    },
    {
        "name": "Defensive Security",
        "slug": "defensive-security",
        "command": "ls projetos/defensive/",
        "description": "Categoria reservada. Ainda sem projetos publicados.",
    },
    {
        "name": "Security Automation",
        "slug": "security-automation",
        "command": "ls projetos/automation/",
        "description": "Categoria reservada. A automação de scanners do SurfaceOps ainda não está implementada.",
    },
    {
        "name": "Desenvolvimento",
        "slug": "desenvolvimento",
        "command": "ls projetos/desenvolvimento/",
        "description": "Projetos pessoais sem relação com segurança.",
    },
]

PROJECTS = [
    {
        "title": "SurfaceOps",
        "description": "Projeto pessoal. Plataforma para organizar dados de reconhecimento e OSINT. As rotas de nmap, subfinder e theHarvester existem, mas a integração está marcada no código como ainda não implementada. Não é um trabalho de cliente.",
        "icon": "Shield",
        "tags": ["Python", "FastAPI", "SQLite", "TypeScript", "Projeto pessoal"],
        "slug": "offensive-security",
    },
    {
        "title": "Magic Deck Tracker",
        "description": "Projeto pessoal de desenvolvimento, sem relação com segurança. Companion para consultar traduções de cartas físicas de Magic.",
        "icon": "Layers",
        "tags": ["React", "FastAPI", "TypeScript", "Projeto pessoal"],
        "slug": "desenvolvimento",
    },
    {
        "title": "Ascend",
        "description": "Projeto pessoal de desenvolvimento, sem relação com segurança. API de um sistema de gamificação.",
        "icon": "Code2",
        "tags": ["Python", "FastAPI", "TypeScript", "Projeto pessoal"],
        "slug": "desenvolvimento",
    },
]

CONTACTS = [
    {"label": "Email", "icon": "Mail", "url": "mailto:jonathan.ghabriel@gmail.com"},
    {
        "label": "LinkedIn",
        "icon": "ExternalLink",
        "url": "https://www.linkedin.com/in/jonathan-ven%C3%A2ncio-93aa5420a/",
    },
    {"label": "GitHub", "icon": "Code", "url": "https://github.com/Jonathan-Venancio"},
]

SKILL_NAMES = ["Python", "FastAPI", "Linux", "Docker", "SQL", "PostgreSQL", "Git", "TypeScript"]


def _category_by_slug(db: Session, slug: str) -> Category | None:
    return db.query(Category).filter(Category.slug == slug).first()


def reconcile_public_content(db: Session) -> None:
    profile = db.query(Profile).first()
    if profile is None:
        profile = Profile(**PROFILE)
        db.add(profile)
    else:
        profile.name = profile.name or PROFILE["name"]
        profile.title = PROFILE["title"]
        profile.subtitle = PROFILE["subtitle"]
        profile.tagline = PROFILE["tagline"]
        if not profile.email or profile.email == "jonathan@email.com":
            profile.email = PROFILE["email"]

    for category in db.query(Category).filter(Category.slug.in_(RETIRED_CATEGORY_SLUGS)):
        category.is_active = False

    for data in CATEGORIES:
        category = _category_by_slug(db, data["slug"])
        if category is None:
            db.add(Category(**data, is_active=True))
        else:
            category.name = data["name"]
            category.command = data["command"]
            category.description = data["description"]
            category.is_active = True

    db.flush()

    for project in db.query(Project).filter(Project.title.in_(PLACEHOLDER_PROJECTS)):
        project.is_active = False

    for data in PROJECTS:
        category = _category_by_slug(db, data["slug"])
        if category is None:
            continue
        project = db.query(Project).filter(Project.title == data["title"]).first()
        tags = json.dumps(data["tags"])
        if project is None:
            db.add(
                Project(
                    title=data["title"],
                    description=data["description"],
                    icon=data["icon"],
                    tags=tags,
                    category_id=category.id,
                    is_active=True,
                )
            )
        else:
            project.description = data["description"]
            project.icon = data["icon"]
            project.tags = tags
            project.category_id = category.id
            project.is_active = True

    for data in CONTACTS:
        contact = db.query(Contact).filter(Contact.label == data["label"]).first()
        if contact is None:
            db.add(Contact(**data, is_active=True))
            continue
        contact.icon = data["icon"]
        contact.is_active = True
        if not contact.url or contact.url in {"#", "mailto:jonathan@email.com"}:
            contact.url = data["url"]

    for skill in db.query(Skill).filter(Skill.name.in_(FICTIONAL_SKILLS)):
        skill.is_active = False

    if db.query(Skill).filter(Skill.is_active == True).first() is None:  # noqa: E712
        for name in SKILL_NAMES:
            db.add(Skill(name=name, level=0, is_active=True))

    db.commit()
