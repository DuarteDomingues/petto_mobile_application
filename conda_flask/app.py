import json
from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS
import base64
import numpy as np
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image
import tensorflow as tf
import pickle
from scipy import spatial
from image_recommendation.image_reccomendation import *
from text_reccomendation.text_recommendation import *

app = Flask(__name__)

CORS(app)

# Image Reccomendation
with open('pickles/feature_vecs.pkl', 'rb') as file:
    loaded_feature_vecs = pickle.load(file)

with open('pickles/file_dic.pkl', 'rb') as file:
    file_dict = pickle.load(file)

# Attributes Reccomendation

with open('pickles/df_cats.pkl', 'rb') as file:
    df_cats = pickle.load(file)

with open('pickles/sentence_transformer_embedding.pkl', 'rb') as file:
    df_embedding = pickle.load(file)

with open('pickles/kmeans_model.pkl', 'rb') as file:
    kmeans_model = pickle.load(file)


@app.route("/image_recommendations", methods=['GET', 'POST'])
def get_similar_images():
    if(request.method == "POST"):
        bytesOfImage = request.get_data()

        #print(bytesOfImage)
        print(len(bytesOfImage))
        with open('imageTest.jpg', 'wb') as out:
            out.write(bytesOfImage)
        
        image_array = process_image(bytesOfImage)
        similarities = get_cosine_similarities(get_feature_vector(image_array), loaded_feature_vecs)
        #get n similar images
        num_similar_images=10
        top_n_idxs = np.argsort(similarities)[::-1][:num_similar_images]
        top_n_idxs_list = top_n_idxs.tolist()

        image_ids = filter_dict_by_values(file_dict, top_n_idxs_list )

        print(image_ids)

        return jsonify({"success": True, "image_ids": image_ids})
    

@app.route("/text_recommendations", methods=['POST'])
def get_text_recommendations():

    attributes_raw = request.get_data()
    
    print("input", attributes_raw)

    # Decode the raw data into a string
    attributes_string = attributes_raw.decode('utf-8')

    # Parse the string as JSON to get a Python dictionary
    attributes_dict = json.loads(attributes_string)

    sentence = compile_text(attributes_dict)

    sentence_emb = transform_attributes(sentence)

    cat_ids = predict_cluster(kmeans_model, sentence_emb, df_embedding, df_cats)

    print("Label: ",cat_ids)


    return  jsonify({"success": True, "cat_ids": cat_ids})


def filter_dict_by_values(dictionary, indexes):
    return [value for key, value in dictionary.items() if key in indexes ]



if __name__ == '__main__':
   app.run(host='0.0.0.0', port=8080)
   #app.run(host='10.0.2.2')