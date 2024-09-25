import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sentence_transformers import SentenceTransformer
from sklearn.metrics import pairwise_distances

model = SentenceTransformer(r"sentence-transformers/paraphrase-MiniLM-L6-v2")

NUM_REC = 10

def transform_attributes(sentence):
    
    output = model.encode(sentences=sentence, show_progress_bar= True, normalize_embeddings  = True)
    return output.reshape(1, -1)


def predict_cluster(kmeans_model, sentence_emb, df_embedding, df_cats):
 
    # get label of input sentence
    label = kmeans_model.predict(sentence_emb)[0]

    #get cluster indices for label
    cluster_indices = np.where(kmeans_model.labels_ == label)[0]
    #get cluster points
    cluster_points = df_embedding.iloc[cluster_indices]
    #calculate distances
    distances = calculate_distances(sentence_emb,cluster_points)
    #get closest indices
    indicesClosest = np.argsort(distances)[:NUM_REC]
    closest_indices = cluster_indices[indicesClosest]
    #get closest points
    closest_ids = df_cats.iloc[closest_indices]
    array_pet_ids = closest_ids['PetID'].to_numpy().tolist()
    
    return array_pet_ids


def calculate_distances(sentece_emb, cluster_points):
    distances = pairwise_distances(sentece_emb, cluster_points)
    return distances.flatten()



def compile_text(x):
    text = f"""Species: {x['Species']}, Age: {x['Age']}, Gender: {x['Gender']}, Breed: {x['Breed']}, Color: {x['Color']}, Size: {x['Size']}, Health: {x['Health']}, Sterilized: {x['Sterilized']}"""
    return text
