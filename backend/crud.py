from sqlalchemy.orm import Session
import json
from models import Profile, Category, Project, Contact
from schemas import ProfileCreate, ProfileUpdate, CategoryCreate, CategoryUpdate, ProjectCreate, ProjectUpdate, ContactCreate, ContactUpdate


# Profile CRUD
def get_profile(db: Session):
    return db.query(Profile).first()


def create_profile(db: Session, profile: ProfileCreate):
    db_profile = Profile(**profile.model_dump())
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile


def update_profile(db: Session, profile_id: int, profile: ProfileUpdate):
    db_profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if db_profile:
        for key, value in profile.model_dump().items():
            setattr(db_profile, key, value)
        db.commit()
        db.refresh(db_profile)
    return db_profile


# Category CRUD
def get_categories(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Category).filter(Category.is_active == True).offset(skip).limit(limit).all()


def get_category(db: Session, category_id: int):
    return db.query(Category).filter(Category.id == category_id).first()


def create_category(db: Session, category: CategoryCreate):
    db_category = Category(**category.model_dump())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


def update_category(db: Session, category_id: int, category: CategoryUpdate):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if db_category:
        for key, value in category.model_dump().items():
            setattr(db_category, key, value)
        db.commit()
        db.refresh(db_category)
    return db_category


def delete_category(db: Session, category_id: int):
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if db_category:
        db_category.is_active = False
        db.commit()
    return db_category


# Project CRUD
def get_projects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Project).filter(Project.is_active == True).offset(skip).limit(limit).all()


def get_projects_by_category(db: Session, category_id: int):
    return db.query(Project).filter(Project.category_id == category_id, Project.is_active == True).all()


def get_project(db: Session, project_id: int):
    return db.query(Project).filter(Project.id == project_id).first()


def create_project(db: Session, project: ProjectCreate):
    db_project = Project(
        title=project.title,
        description=project.description,
        icon=project.icon,
        tags=json.dumps(project.tags),
        category_id=project.category_id,
        is_active=project.is_active
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


def update_project(db: Session, project_id: int, project: ProjectUpdate):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if db_project:
        db_project.title = project.title
        db_project.description = project.description
        db_project.icon = project.icon
        db_project.tags = json.dumps(project.tags)
        db_project.category_id = project.category_id
        db_project.is_active = project.is_active
        db.commit()
        db.refresh(db_project)
    return db_project


def delete_project(db: Session, project_id: int):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if db_project:
        db_project.is_active = False
        db.commit()
    return db_project


# Contact CRUD
def get_contacts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Contact).filter(Contact.is_active == True).offset(skip).limit(limit).all()


def get_contact(db: Session, contact_id: int):
    return db.query(Contact).filter(Contact.id == contact_id).first()


def create_contact(db: Session, contact: ContactCreate):
    db_contact = Contact(**contact.model_dump())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact


def update_contact(db: Session, contact_id: int, contact: ContactUpdate):
    db_contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if db_contact:
        for key, value in contact.model_dump().items():
            setattr(db_contact, key, value)
        db.commit()
        db.refresh(db_contact)
    return db_contact


def delete_contact(db: Session, contact_id: int):
    db_contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if db_contact:
        db_contact.is_active = False
        db.commit()
    return db_contact
