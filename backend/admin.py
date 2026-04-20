from sqladmin import Admin, ModelView
from fastapi import FastAPI
from database import engine
from models import Profile, Category, Project, Contact


class ProfileAdmin(ModelView, model=Profile):
    column_list = [Profile.id, Profile.name, Profile.title, Profile.email]
    column_searchable_list = [Profile.name, Profile.title]
    form_columns = [Profile.name, Profile.title, Profile.subtitle, Profile.tagline, Profile.email]


class CategoryAdmin(ModelView, model=Category):
    column_list = [Category.id, Category.name, Category.slug, Category.is_active]
    column_searchable_list = [Category.name, Category.slug]
    form_columns = [Category.name, Category.slug, Category.command, Category.description, Category.is_active]


class ProjectAdmin(ModelView, model=Project):
    column_list = [Project.id, Project.title, Project.icon, Project.category_id, Project.is_active]
    column_searchable_list = [Project.title, Project.description]
    column_sortable_list = [Project.id, Project.title, Project.category_id]
    form_columns = [Project.title, Project.description, Project.icon, Project.tags, Project.category_id, Project.is_active]


class ContactAdmin(ModelView, model=Contact):
    column_list = [Contact.id, Contact.label, Contact.icon, Contact.url, Contact.is_active]
    column_searchable_list = [Contact.label, Contact.url]
    form_columns = [Contact.label, Contact.icon, Contact.url, Contact.is_active]


def setup_admin(app: FastAPI):
    authentication_backend = None  # Sem autenticação por enquanto
    
    admin = Admin(app=app, engine=engine, authentication_backend=authentication_backend, base_url="/admin")
    
    admin.add_view(ProfileAdmin)
    admin.add_view(CategoryAdmin)
    admin.add_view(ProjectAdmin)
    admin.add_view(ContactAdmin)
    
    return admin
