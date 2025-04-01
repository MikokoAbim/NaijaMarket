import spacy 

nlp_ner = spacy.load("..\model-best")

def extract_entities(user_input: str):
    doc = nlp_ner(user_input)
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    return entities


