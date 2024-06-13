from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import time
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

router = APIRouter()

modelo_normal = load_model('app/models/modelo_mnist.h5')

@router.post("/")
async def upload_img_normal(file: UploadFile = File(...)):
    try:
        img = Image.open(file.file)
        img = img.resize((28, 28))
        img = img.convert('L')
        img = np.array(img) / 255.0  
        img = img.reshape(1, 28, 28, 1) 

        start_time = time.time()
        predict_normal = modelo_normal.predict(img)
        end_time = time.time()
        predict_normal_time = end_time - start_time
        predict_normal = np.argmax(predict_normal, axis=1)[0]

        return JSONResponse({
            'predict': int(predict_normal),
            'predict_normal_time': predict_normal_time
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
