from pydantic import BaseModel, Field
from typing import List, Optional


# Profile Schemas
class ProfileBase(BaseModel):
    name: str
    title: str
    subtitle: str
    tagline: str
    email: str


class ProfileCreate(ProfileBase):
    pass


class ProfileUpdate(ProfileBase):
    pass


class Profile(ProfileBase):
    id: int

    class Config:
        from_attributes = True


# Category Schemas
class CategoryBase(BaseModel):
    name: str
    slug: str
    command: str
    description: str
    is_active: bool = True


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(CategoryBase):
    pass


class Category(CategoryBase):
    id: int

    class Config:
        from_attributes = True


# Project Schemas
class ProjectBase(BaseModel):
    title: str
    description: str
    icon: str
    tags: List[str]
    category_id: int
    is_active: bool = True


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(ProjectBase):
    pass


class Project(ProjectBase):
    id: int

    class Config:
        from_attributes = True


# Contact Schemas
class ContactBase(BaseModel):
    label: str
    icon: str
    url: str
    is_active: bool = True


class ContactCreate(ContactBase):
    pass


class ContactUpdate(ContactBase):
    pass


class Contact(ContactBase):
    id: int

    class Config:
        from_attributes = True


# Response Schemas
class ProjectsByCategory(BaseModel):
    category: Category
    projects: List[Project]
