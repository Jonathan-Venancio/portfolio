from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from database import get_db
from models import Profile, Category, Project, Contact, Skill
from schemas import ProfileCreate, CategoryCreate, ProjectCreate, ContactCreate, SkillCreate
import crud
from main import get_current_user
from typing import List
import uuid
from pathlib import Path

router = APIRouter(prefix="/api/admin", tags=["Admin"])

# Upload directory
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# Profile CRUD
@router.get("/profile")
async def get_admin_profile(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    profile = crud.get_profile(db)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.put("/profile")
async def update_admin_profile(profile_data: ProfileCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    profile = crud.get_profile(db)
    if not profile:
        profile = crud.create_profile(db, profile_data)
    else:
        profile = crud.update_profile(db, profile.id, profile_data)
    return profile

@router.post("/profile/image")
async def upload_profile_image(file: UploadFile = File(...), current_user: str = Depends(get_current_user)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    file_extension = file.filename.split(".")[-1] if file.filename else "jpg"
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = UPLOAD_DIR / unique_filename
    
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    file_url = f"/uploads/{unique_filename}"
    return {"filename": unique_filename, "url": file_url}

# Categories CRUD
@router.get("/categories")
async def get_admin_categories(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return db.query(Category).all()

@router.post("/categories")
async def create_admin_category(category: CategoryCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return crud.create_category(db, category)

@router.put("/categories/{category_id}")
async def update_admin_category(category_id: int, category: CategoryCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return crud.update_category(db, category_id, category)

@router.delete("/categories/{category_id}")
async def delete_admin_category(category_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return crud.delete_category(db, category_id)

# Projects CRUD
@router.get("/projects")
async def get_admin_projects(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return db.query(Project).all()

@router.post("/projects")
async def create_admin_project(project: ProjectCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return crud.create_project(db, project)

@router.put("/projects/{project_id}")
async def update_admin_project(project_id: int, project: ProjectCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return crud.update_project(db, project_id, project)

@router.delete("/projects/{project_id}")
async def delete_admin_project(project_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return crud.delete_project(db, project_id)

# Skills CRUD
@router.get("/skills")
async def get_admin_skills(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return db.query(Skill).all()

@router.post("/skills")
async def create_admin_skill(skill: SkillCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return crud.create_skill(db, skill)

@router.put("/skills/{skill_id}")
async def update_admin_skill(skill_id: int, skill: SkillCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return crud.update_skill(db, skill_id, skill)

@router.delete("/skills/{skill_id}")
async def delete_admin_skill(skill_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return crud.delete_skill(db, skill_id)

# Contacts CRUD
@router.get("/contacts")
async def get_admin_contacts(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return db.query(Contact).all()

@router.post("/contacts")
async def create_admin_contact(contact: ContactCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return crud.create_contact(db, contact)

@router.put("/contacts/{contact_id}")
async def update_admin_contact(contact_id: int, contact: ContactCreate, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return crud.update_contact(db, contact_id, contact)

@router.delete("/contacts/{contact_id}")
async def delete_admin_contact(contact_id: int, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return crud.delete_contact(db, contact_id)
