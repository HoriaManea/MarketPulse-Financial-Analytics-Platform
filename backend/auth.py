from typing import Optional, Annotated
from jose import JWSError, jwt
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session
from decouple import config
from datetime import datetime, timedelta, timezone


SECRET_KEY = config('SECRET_KEY')
ALGORITHM  =  config('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_schema = OAuth2PasswordBearer(tokenUrl="/token")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):

    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt




