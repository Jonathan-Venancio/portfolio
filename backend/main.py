from fastapi import FastAPI, File, UploadFile, HTTPException, Request, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from sqlalchemy.orm import Session
from database import engine, get_db
from models import Base, Profile, Category, Project, Contact, Skill
from schemas import ProfileCreate, CategoryCreate, ProjectCreate, ContactCreate, SkillCreate
import crud
import json
import os
import uuid
from pathlib import Path
from dotenv import load_dotenv
from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm
import auth

# Carregar variáveis de ambiente
load_dotenv()

# Create uploads directory
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio API", version="1.0.0")

# Configurar credenciais do admin via variáveis de ambiente
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")

# Validação de segurança
if not ADMIN_USERNAME or not ADMIN_PASSWORD:
    raise ValueError("ADMIN_USERNAME e ADMIN_PASSWORD devem ser configurados nas variáveis de ambiente")

# Serve static files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:3000", 
        "http://localhost:8080",  # Vite default ports
        "https://jonathanvenancio.site",  # Produção frontend
        "http://jonathanvenancio.site"    # HTTP fallback
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
from routers import profile, categories, projects, contacts, skills, admin

app.include_router(profile.router)
app.include_router(categories.router)
app.include_router(projects.router)
app.include_router(contacts.router)
app.include_router(skills.router)
app.include_router(admin.router)


# Rota de login para obter token JWT
@app.post("/api/admin/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username != ADMIN_USERNAME or not auth.verify_password(form_data.password, ADMIN_PASSWORD):
        raise HTTPException(
            status_code=401,
            detail="Usuário ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": ADMIN_USERNAME}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Rota para verificar se o token é válido
@app.get("/api/admin/verify")
async def verify_token(current_user: str = Depends(auth.get_current_user)):
    return {"valid": True, "username": current_user}


@app.get("/upload-profile-page")
async def upload_profile_page():
    from fastapi.responses import HTMLResponse
    with open("upload_page.html", "r", encoding="utf-8") as f:
        content = f.read()
    return HTMLResponse(content=content)

@app.post("/upload-profile-image/")
async def upload_profile_image(file: UploadFile = File(...)):
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Generate unique filename
    file_extension = file.filename.split(".")[-1] if file.filename else "jpg"
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Save file
    try:
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Return the URL
        file_url = f"/uploads/{unique_filename}"
        return {"filename": unique_filename, "url": file_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {str(e)}")


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
    
    # Seed skills if not exists
    if not db.query(Skill).first():
        skills_data = [
            SkillCreate(
                name="Pentest & Ethical Hacking",
                level=90
            ),
            SkillCreate(
                name="Análise de Vulnerabilidades",
                level=85
            ),
            SkillCreate(
                name="SIEM & Monitoramento",
                level=80
            ),
            SkillCreate(
                name="Firewall & Redes",
                level=85
            ),
            SkillCreate(
                name="Python & Automação",
                level=75
            ),
            SkillCreate(
                name="Compliance (ISO 27001, LGPD)",
                level=80
            )
        ]
        for skill_data in skills_data:
            crud.create_skill(db, skill_data)
    
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
