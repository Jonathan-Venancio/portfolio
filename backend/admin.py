from sqladmin import Admin, ModelView
from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from starlette.responses import RedirectResponse, Response
from database import engine
from models import Profile, Category, Project, Contact, Skill
import auth


class ProfileAdmin(ModelView, model=Profile):
    column_list = [Profile.id, Profile.name, Profile.title, Profile.email, Profile.profile_image]
    column_searchable_list = [Profile.name, Profile.title]
    form_columns = [Profile.name, Profile.title, Profile.subtitle, Profile.tagline, Profile.email, Profile.profile_image]


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


class SkillAdmin(ModelView, model=Skill):
    column_list = [Skill.id, Skill.name, Skill.level, Skill.is_active]
    column_searchable_list = [Skill.name]
    form_columns = [Skill.name, Skill.level, Skill.is_active]


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username = form.get("username")
        password = form.get("password")
        
        # Verifica se ambos username e senha estão corretos
        if (username == auth.ADMIN_USERNAME and 
            auth.ADMIN_PASSWORD_HASH and 
            auth.verify_password(password, auth.ADMIN_PASSWORD_HASH)):
            # Salva na sessão
            request.session.update({"admin": True})
            return True
        
        return False

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        # Verifica se está logado
        return "admin" in request.session


def setup_admin(app):
    authentication_backend = AdminAuth(secret_key="some-secret-key")
    
    admin = Admin(
        app=app, 
        engine=engine, 
        authentication_backend=authentication_backend, 
        base_url="/admin",
        templates_dir="templates"
    )
    
    admin.add_view(ProfileAdmin)
    admin.add_view(CategoryAdmin)
    admin.add_view(ProjectAdmin)
    admin.add_view(ContactAdmin)
    admin.add_view(SkillAdmin)
    
    return admin
