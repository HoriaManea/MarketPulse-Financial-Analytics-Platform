from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from rates import get_rates
from forex import get_forex_stats, get_forex_dominance,get_forex_full_year
from crypto import get_crypto_dominance
from constants import FOREX_DATA
from pydantic import BaseModel
from passlib.context import CryptContext
import models, schemas
from sqlalchemy.orm import Session
from database import SessionLocal
from auth import create_access_token

app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserRequest(BaseModel):
    email: str
    password: str

@app.get("/")
def root():
    return {"message": "API running"}

@app.get("/rates")
def rates():
    return get_rates()

@app.get("/forex")
def forex():
    return get_forex_stats()

@app.get("/forex-last-year-results")
def forex_dominance():
    return get_forex_dominance()

@app.get("/forex-full-year")
def forex_full_year():
    return get_forex_full_year()

@app.get("/forex-trading-chart")
def forex_trading_chart(pair: str = "EURUSD", limit: int = 100):
    return FOREX_DATA.get(pair, [])[:limit]

#  Crypto

@app.get("/crypto-dominance")
def forex_full_year():
    return get_crypto_dominance()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def hash_password(password):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

# REGISTER
from fastapi import HTTPException

@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed_pw = hash_password(user.password)

    db_user = models.User(email=user.email, password=hashed_pw)
    db.add(db_user)
    db.commit()

    access_token = create_access_token({"sub": db_user.email})

    return {
        "msg": "User created",
        "access_token": access_token,
        "token_type": "bearer"
    }
# LOGIN
@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": db_user.email})

    return {"access_token": token}

