from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from schemas import Skill, SkillCreate, SkillUpdate
import crud

router = APIRouter(prefix="/skills", tags=["skills"])


@router.get("", response_model=List[Skill])
def read_skills(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    skills = crud.get_skills(db, skip=skip, limit=limit)
    return skills


@router.get("/{skill_id}", response_model=Skill)
def read_skill(skill_id: int, db: Session = Depends(get_db)):
    skill = crud.get_skill(db, skill_id=skill_id)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return skill


@router.post("", response_model=Skill)
def create_skill(skill: SkillCreate, db: Session = Depends(get_db)):
    return crud.create_skill(db=db, skill=skill)


@router.put("/{skill_id}", response_model=Skill)
def update_skill(skill_id: int, skill: SkillUpdate, db: Session = Depends(get_db)):
    db_skill = crud.update_skill(db=db, skill_id=skill_id, skill=skill)
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return db_skill


@router.delete("/{skill_id}", response_model=Skill)
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    db_skill = crud.delete_skill(db=db, skill_id=skill_id)
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return db_skill
