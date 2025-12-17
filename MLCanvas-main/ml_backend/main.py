from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exception_handlers import RequestValidationError
from fastapi.exceptions import RequestValidationError as FastAPIRequestValidationError
from pydantic import BaseModel
from typing import Optional, List
import uvicorn
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, r2_score, mean_squared_error

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

AVAILABLE_MODELS = [
    {"id": "logistic_regression", "name": "Logistic Regression"},
    {"id": "linear_regression", "name": "Linear Regression"},
    {"id": "knn", "name": "K-Nearest Neighbors"},
    {"id": "decision_tree", "name": "Decision Tree"},
    {"id": "random_forest", "name": "Random Forest"},
]

class TrainRequest(BaseModel):
    X: list
    y: list
    featureNames: list
    model_name: str
    target: str
    k: Optional[int] = 3
    max_depth: Optional[int] = 5
    n_estimators: Optional[int] = 100

class TrainResponse(BaseModel):
    accuracy: Optional[float]
    r2: Optional[float]
    mse: Optional[float]
    error: Optional[str] = None
    model_type: Optional[str]

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"error": f"Internal Server Error: {str(exc)}"}
    )

@app.exception_handler(FastAPIRequestValidationError)
async def validation_exception_handler(request: Request, exc: FastAPIRequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"error": f"Validation Error: {exc.errors()}"}
    )

@app.get("/models")
async def list_models():
    return AVAILABLE_MODELS

@app.post("/train", response_model=TrainResponse)
async def train(req: TrainRequest):
    try:
        X = req.X
        y = req.y
        model_name = req.model_name
        k = req.k
        max_depth = req.max_depth
        n_estimators = req.n_estimators
        accuracy = None
        r2 = None
        mse = None
        if model_name == 'logistic_regression':
            model = LogisticRegression(max_iter=1000)
            model.fit(X, y)
            y_pred = model.predict(X)
            accuracy = accuracy_score(y, y_pred)
            try:
                r2 = r2_score(y, y_pred)
            except Exception:
                r2 = None
        elif model_name == 'linear_regression':
            model = LinearRegression()
            model.fit(X, y)
            y_pred = model.predict(X)
            try:
                r2 = r2_score(y, y_pred)
            except Exception:
                r2 = None
            try:
                mse = mean_squared_error(y, y_pred)
            except Exception:
                mse = None
        elif model_name == 'knn':
            model = KNeighborsClassifier(n_neighbors=k)
            model.fit(X, y)
            y_pred = model.predict(X)
            accuracy = accuracy_score(y, y_pred)
        elif model_name == 'decision_tree':
            model = DecisionTreeClassifier(max_depth=max_depth)
            model.fit(X, y)
            y_pred = model.predict(X)
            accuracy = accuracy_score(y, y_pred)
        elif model_name == 'random_forest':
            model = RandomForestClassifier(n_estimators=n_estimators)
            model.fit(X, y)
            y_pred = model.predict(X)
            accuracy = accuracy_score(y, y_pred)
        else:
            return TrainResponse(accuracy=None, r2=None, mse=None, error=f"Unsupported model: {model_name}", model_type=model_name)
        return TrainResponse(accuracy=accuracy, r2=r2, mse=mse, model_type=model_name)
    except Exception as e:
        return TrainResponse(accuracy=None, r2=None, mse=None, error=str(e), model_type=req.model_name)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
