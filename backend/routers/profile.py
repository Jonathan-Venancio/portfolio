from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import Profile, ProfileCreate, ProfileUpdate
import crud

router = APIRouter(prefix="/profile", tags=["profile"])


@router.get("", response_model=Profile)
def read_profile(db: Session = Depends(get_db)):
    profile = crud.get_profile(db)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.post("", response_model=Profile)
def create_profile(profile: ProfileCreate, db: Session = Depends(get_db)):
    existing = crud.get_profile(db)
    if existing:
        raise HTTPException(status_code=400, detail="Profile already exists. Use PUT to update.")
    return crud.create_profile(db=db, profile=profile)


@router.put("/{profile_id}", response_model=Profile)
def update_profile(profile_id: int, profile: ProfileUpdate, db: Session = Depends(get_db)):
    db_profile = crud.update_profile(db=db, profile_id=profile_id, profile=profile)
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return db_profile
