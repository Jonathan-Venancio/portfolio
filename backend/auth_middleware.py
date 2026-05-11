from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.responses import RedirectResponse, JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import base64
import auth

security = HTTPBasic()

class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, protected_paths: list = None):
        super().__init__(app)
        self.protected_paths = protected_paths or ["/admin", "/upload-profile-image/", "/upload-profile-page"]
    
    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        
        # Verifica se o path precisa de proteção
        if any(path.startswith(protected_path) for protected_path in self.protected_paths):
            
            # Para página de login, permite passar
            if path == "/admin/login":
                return await call_next(request)
            
            # Verifica se já tem sessão (cookie)
            session_token = request.cookies.get("admin_session")
            
            if session_token and auth.is_valid_session(session_token):
                # Sessão válida, continua
                response = await call_next(request)
                return response
            
            # Para requisições API, retorna 401
            if path.startswith("/api/") or path.startswith("/upload"):
                return JSONResponse(
                    status_code=401,
                    content={"detail": "Authentication required"}
                )
            
            # Para outras páginas admin, redireciona para login
            if path.startswith("/admin") and path != "/admin/login":
                return RedirectResponse(url="/admin/login", status_code=302)
            
            # Para upload, retorna erro
            return JSONResponse(
                status_code=401,
                content={"detail": "Authentication required"}
            )
        
        # Path não protegido, continua normalmente
        return await call_next(request)

async def get_current_user(credentials: HTTPBasicCredentials = Depends(security)):
    """Verifica credenciais Basic Auth para API endpoints"""
    if auth.ADMIN_PASSWORD_HASH and auth.verify_password(credentials.password, auth.ADMIN_PASSWORD_HASH):
        return credentials.username
    raise HTTPException(
        status_code=401,
        detail="Invalid credentials",
        headers={"WWW-Authenticate": "Basic"},
    )
