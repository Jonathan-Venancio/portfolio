from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, get_db
from models import Base, Profile, Category, Project, Contact
from schemas import ProfileCreate, CategoryCreate, ProjectCreate, ContactCreate
import crud
import json
import admin

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
from routers import profile, categories, projects, contacts

app.include_router(profile.router)
app.include_router(categories.router)
app.include_router(projects.router)
app.include_router(contacts.router)

# Setup admin panel
admin.setup_admin(app)


@app.on_event("startup")
def startup_event():
    db: Session = next(get_db())
    
    # Seed profile if not exists
    if not crud.get_profile(db):
        profile_data = ProfileCreate(
            name="Jonathan Venancio",
            title="Analista de Segurança da Informação",
            subtitle="Protegendo sistemas, analisando vulnerabilidades",
            tagline="Protegendo sistemas, analisando vulnerabilidades",
            email="jonathan@email.com"
        )
        crud.create_profile(db, profile_data)
    
    # Seed categories if not exists
    if not db.query(Category).first():
        categories_data = [
            CategoryCreate(
                name="Segurança",
                slug="seguranca",
                command="ls projetos/seguranca/",
                description="Foco atual — projetos de cibersegurança, threat hunting e compliance"
            ),
            CategoryCreate(
                name="Programação",
                slug="programacao",
                command="ls projetos/programacao/",
                description="Backend Python e Full Stack TypeScript"
            ),
            CategoryCreate(
                name="Ciência de Dados",
                slug="dados",
                command="ls projetos/data-science/",
                description="Modelagem preditiva, ML e engenharia de dados"
            )
        ]
        for cat_data in categories_data:
            crud.create_category(db, cat_data)
    
    # Seed projects if not exists
    if not db.query(Project).first():
        # Get category IDs
        security_cat = db.query(Category).filter(Category.slug == "seguranca").first()
        prog_cat = db.query(Category).filter(Category.slug == "programacao").first()
        data_cat = db.query(Category).filter(Category.slug == "dados").first()
        
        projects_data = [
            # Security projects
            ProjectCreate(
                title="SecAudit Framework",
                description="Framework automatizado de auditoria de segurança para ambientes corporativos. Realiza varreduras de vulnerabilidades, análise de configurações e gera relatórios detalhados de compliance.",
                icon="Shield",
                tags=["Python", "OWASP", "Nmap", "Compliance"],
                category_id=security_cat.id
            ),
            ProjectCreate(
                title="ThreatHunter",
                description="Plataforma de threat hunting que correlaciona logs de múltiplas fontes (SIEM, firewall, endpoints) para detecção proativa de ameaças avançadas e APTs.",
                icon="Bug",
                tags=["SIEM", "ELK Stack", "MITRE ATT&CK", "Python"],
                category_id=security_cat.id
            ),
            ProjectCreate(
                title="CryptoVault",
                description="Sistema de gerenciamento de chaves criptográficas e secrets para equipes DevOps. Integração com CI/CD pipelines e rotação automática de credenciais.",
                icon="Lock",
                tags=["Go", "HashiCorp Vault", "Docker", "API REST"],
                category_id=security_cat.id
            ),
            ProjectCreate(
                title="NetGuard Monitor",
                description="Solução de monitoramento de rede em tempo real com detecção de intrusão baseada em machine learning. Dashboard interativo com alertas e análise de tráfego.",
                icon="Wifi",
                tags=["Wireshark", "ML", "React", "Suricata"],
                category_id=security_cat.id
            ),
            # Programming projects
            ProjectCreate(
                title="API Gateway Microservices",
                description="Arquitetura de microserviços com API Gateway customizado, autenticação JWT, rate limiting e observabilidade completa via OpenTelemetry.",
                icon="Code2",
                tags=["Python", "FastAPI", "Docker", "Kubernetes"],
                category_id=prog_cat.id
            ),
            ProjectCreate(
                title="Dashboard Full Stack",
                description="Aplicação web completa para gestão empresarial com dashboard analítico em tempo real, autenticação multi-tenant e integrações com APIs externas.",
                icon="Layers",
                tags=["TypeScript", "React", "Node.js", "PostgreSQL"],
                category_id=prog_cat.id
            ),
            ProjectCreate(
                title="Task Automation Engine",
                description="Motor de automação de tarefas backend com fila distribuída, retry policies e workflows configuráveis para processamento de jobs em larga escala.",
                icon="Server",
                tags=["Python", "Celery", "Redis", "RabbitMQ"],
                category_id=prog_cat.id
            ),
            ProjectCreate(
                title="CI/CD Pipeline Toolkit",
                description="Conjunto de ferramentas para padronização de pipelines CI/CD com testes automatizados, análise estática e deploy progressivo.",
                icon="GitBranch",
                tags=["TypeScript", "GitHub Actions", "Docker", "Terraform"],
                category_id=prog_cat.id
            ),
            # Data Science projects
            ProjectCreate(
                title="Sales Forecasting Model",
                description="Modelo preditivo de vendas utilizando séries temporais e ensemble learning para previsão de demanda com precisão acima de 90%.",
                icon="BarChart3",
                tags=["Python", "Pandas", "Scikit-learn", "Prophet"],
                category_id=data_cat.id
            ),
            ProjectCreate(
                title="Customer Churn Predictor",
                description="Sistema de predição de churn com pipeline completo de feature engineering, treinamento e deploy de modelos em produção.",
                icon="Brain",
                tags=["Python", "XGBoost", "MLflow", "AWS"],
                category_id=data_cat.id
            ),
            ProjectCreate(
                title="ETL Data Pipeline",
                description="Pipeline de ETL escalável para ingestão e transformação de dados de múltiplas fontes em data warehouse, com qualidade de dados monitorada.",
                icon="Database",
                tags=["Python", "Airflow", "Spark", "BigQuery"],
                category_id=data_cat.id
            )
        ]
        
        for proj_data in projects_data:
            crud.create_project(db, proj_data)
    
    # Seed contacts if not exists
    if not db.query(Contact).first():
        contacts_data = [
            ContactCreate(
                label="Email",
                icon="Mail",
                url="mailto:jonathan@email.com"
            ),
            ContactCreate(
                label="LinkedIn",
                icon="ExternalLink",
                url="#"
            ),
            ContactCreate(
                label="GitHub",
                icon="Code",
                url="#"
            )
        ]
        for contact_data in contacts_data:
            crud.create_contact(db, contact_data)
    
    db.close()


@app.get("/")
def read_root():
    return {
        "message": "Portfolio API",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "profile": "/profile",
            "categories": "/categories",
            "projects": "/projects",
            "contacts": "/contacts"
        }
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
