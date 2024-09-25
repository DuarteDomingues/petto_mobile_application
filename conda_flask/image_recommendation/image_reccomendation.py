import json
from flask import Flask, jsonify, request
import base64
import numpy as np
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image
import tensorflow as tf
import pickle
from scipy import spatial
from keras.models import Model

Isize=(224,224) 
cnn=ResNet50(weights='imagenet')
cnn = Model(inputs=cnn.input, outputs=cnn.get_layer('avg_pool').output)
#with open('pickles/feature_vecs.pkl', 'rb') as file:
#    loaded_feature_vecs = pickle.load(file)

#with open('pickles/file_dic.pkl', 'rb') as file:
#    file_dict = pickle.load(file)

def process_image(image_bytes):

    image_tensor = tf.image.decode_image(image_bytes, channels=3)  # Assuming RGB image
    #image_array = image_tensor.numpy()
    image_tensor =  tf.image.resize(image_tensor, Isize)
    #image_tensor = tf.image.resize(image_tensor, Isize)
    image_array = image_tensor.numpy()
    img =  preprocess_input(image_array)

    return img

def get_cosine_similarities(image_vec, feature_vecs):
    similarities = []
    for i in range(0,len(feature_vecs)):
        
        similarity = 1-spatial.distance.cosine(feature_vecs[i], image_vec)
        similarities.append(similarity)
    return similarities

def get_feature_vector(image):

    image = image[np.newaxis,:,:,:]
    y=cnn.predict(image)
    y_flat = y.flatten()
    return y_flat
