from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from schemas import MessageCreate
import crud

router = APIRouter(prefix="/messages", tags=["messages"])


def _valid_email(value: str) -> bool:
    email = value.strip()
    if " " in email or email.count("@") != 1:
        return False
    local, domain = email.split("@")
    return bool(local) and "." in domain and not domain.startswith(".") and not domain.endswith(".")


@router.post("")
def create_message(message: MessageCreate, db: Session = Depends(get_db)):
    if message.website.strip():
        return {"status": "ok"}
    if not _valid_email(message.email):
        raise HTTPException(status_code=422, detail="Informe um email válido.")
    crud.create_message(db, message)
    return {"status": "ok"}
