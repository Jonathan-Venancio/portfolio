from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import json
from database import get_db
from schemas import Project, ProjectCreate, ProjectUpdate, ProjectsByCategory, Category
import crud

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("", response_model=List[Project])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = crud.get_projects(db, skip=skip, limit=limit)
    # Convert JSON string tags to list
    for project in projects:
        if isinstance(project.tags, str):
            project.tags = json.loads(project.tags)
    return projects


@router.get("/by-category/{category_id}", response_model=ProjectsByCategory)
def read_projects_by_category(category_id: int, db: Session = Depends(get_db)):
    category = crud.get_category(db, category_id=category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    projects = crud.get_projects_by_category(db, category_id=category_id)
    # Convert JSON string tags to list
    for project in projects:
        if isinstance(project.tags, str):
            project.tags = json.loads(project.tags)
    
    return ProjectsByCategory(category=category, projects=projects)


@router.get("/{project_id}", response_model=Project)
def read_project(project_id: int, db: Session = Depends(get_db)):
    project = crud.get_project(db, project_id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if isinstance(project.tags, str):
        project.tags = json.loads(project.tags)
    return project


@router.post("", response_model=Project)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    return crud.create_project(db=db, project=project)


@router.put("/{project_id}", response_model=Project)
def update_project(project_id: int, project: ProjectUpdate, db: Session = Depends(get_db)):
    db_project = crud.update_project(db=db, project_id=project_id, project=project)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    if isinstance(db_project.tags, str):
        db_project.tags = json.loads(db_project.tags)
    return db_project


@router.delete("/{project_id}", response_model=Project)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    db_project = crud.delete_project(db=db, project_id=project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project
