from fastapi import FastAPI, File, UploadFile, HTTPException, Request, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, RedirectResponse, JSONResponse
from sqlalchemy.orm import Session
from database import engine, get_db
from models import Base
import portfolio_content
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
        "http://127.0.0.1:8080",
        "http://127.0.0.1:8081",
        "http://localhost:8081",
        "https://jonathanvenancio.site",  # Produção frontend
        "http://jonathanvenancio.site"    # HTTP fallback
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
from routers import profile, categories, projects, contacts, skills, messages, admin

app.include_router(profile.router)
app.include_router(categories.router)
app.include_router(projects.router)
app.include_router(contacts.router)
app.include_router(messages.router)
app.include_router(skills.router)
app.include_router(admin.router)


# Rota de login para obter token JWT
@app.post("/api/admin/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username != ADMIN_USERNAME or form_data.password != ADMIN_PASSWORD:
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
    portfolio_content.reconcile_public_content(db)
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
            "contacts": "/contacts",
            "messages": "/messages"
        }
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
