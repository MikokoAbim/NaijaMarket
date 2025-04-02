import pickle
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model

from tensorflow import keras

# Import saved tokenizer that's been trained on the input data
with open('../tokenizer.pickle', 'rb') as handle:
    tokenizer_import = pickle.load(handle)

# Import saved encoder that's been trained on the output data
with open('../label_encoder.pickle', 'rb') as f:
    encoder_import = pickle.load(f)

# Load trained intent recognition model
model = load_model('../intent_recognition_model') 

def prepare_sentence (sentence: str, max_seq_len: int = 35)-> np.ndarray:
    input_seq = tokenizer_import.texts_to_sequences([sentence])
    input_features = pad_sequences(input_seq, maxlen = max_seq_len, padding = 'post')
    return input_features

def IR_model_perdict(input_sentence: str):
    probs = model.predict(prepare_sentence(input_sentence))
    predicted_y = probs.argmax(axis=-1)
    return encoder_import.classes_[predicted_y][0]