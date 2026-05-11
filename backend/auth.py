import hashlib
import secrets
from typing import Optional

# Configurações de segurança
ADMIN_PASSWORD_HASH = None  # Será definido no main.py
SESSION_TIMEOUT = 3600  # 1 hora em segundos

# Armazenamento de sessões em memória (simples para este projeto)
active_sessions = {}

def hash_password(password: str) -> str:
    """Gera hash da senha usando SHA-256 com salt"""
    salt = secrets.token_hex(16)
    password_hash = hashlib.sha256((password + salt).encode()).hexdigest()
    return f"{salt}:{password_hash}"

def verify_password(password: str, stored_hash: str) -> bool:
    """Verifica se a senha corresponde ao hash armazenado"""
    try:
        salt, password_hash = stored_hash.split(":")
        computed_hash = hashlib.sha256((password + salt).encode()).hexdigest()
        return computed_hash == password_hash
    except:
        return False

def generate_session_token() -> str:
    """Gera um token de sessão seguro"""
    return secrets.token_urlsafe(32)

def create_session(token: str) -> None:
    """Cria uma nova sessão"""
    active_sessions[token] = {
        "created_at": secrets.time.time(),
        "last_access": secrets.time.time()
    }

def is_valid_session(token: str) -> bool:
    """Verifica se a sessão é válida e não expirou"""
    if token not in active_sessions:
        return False
    
    session = active_sessions[token]
    current_time = secrets.time.time()
    
    # Verifica timeout
    if current_time - session["last_access"] > SESSION_TIMEOUT:
        del active_sessions[token]
        return False
    
    # Atualiza último acesso
    session["last_access"] = current_time
    return True

def invalidate_session(token: str) -> None:
    """Invalida uma sessão"""
    if token in active_sessions:
        del active_sessions[token]
