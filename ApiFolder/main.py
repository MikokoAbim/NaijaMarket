from fastapi import FastAPI, HTTPException
import random 


from NER.utils import extract_entities
from IntentRecoginition.utils import IR_model_perdict
from functions import personal_assistant


app = FastAPI()

@app.get("/")
async def root():
    return "Hello Welcome to this webpage go to http://127.0.0.1:8000/docs for U.I"

@app.get("/random/{limit}")
async def get_random(limit: int):
    rn = random.randint(0, limit)
    return {"number": rn, "limit": limit}

items = []

@app.post("/items")
def create_item(item:str):


    if item == "0":
        raise HTTPException(status_code=404, detail="Not allowed")
    else:
        items.append(item)
        return item
    
@app.post("/IR")
def intent_recog_pred(sentence:str):
    return IR_model_perdict(sentence)

@app.post("/NER")
def entity_recog_pred(sentence:str):
    return extract_entities(sentence)

@app.post("/personal-assistant")
def personal_assistant_activate(sentence:str):
    return personal_assistant(sentence)

