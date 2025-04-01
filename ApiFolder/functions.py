from NER.utils import extract_entities
from IntentRecoginition.utils import IR_model_perdict


def personal_assistant(sentence: str):
    if IR_model_perdict(sentence) == "searchProduct":
        entities = extract_entities(sentence)
        product = [text for text, label in entities if label == "product"]
        return searchProduct(product)
    else:
        return testSystem()


def searchProduct(product):
    return f"Here is the product you requested{product}"

def testSystem():
    return "just testing"