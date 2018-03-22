#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify, render_template
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search
from google.cloud import speech
from sklearn.externals import joblib
import pandas as pd
import time
import random
import requests
import sys

app = Flask(__name__, static_url_path='/static')

# data = {
#     "age": {
#         "0-10": 0.41,
#         "10-20": 0.42,
#         "20-30": 0.47,
#         "30-40": 0.53,
#         "50-60": 0.55,
#         "60-70": 0.25,
#         "70+": 0.23
#     },
#     "gender": {
#         "male": 0.22,
#         "female": 0.25
#     }
# }

records = []

df = pd.DataFrame(columns=['age', 'gender', 'result'])
df['result'] = df['result'].astype('int')


@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/stats")
def stats():
    df['age_bin'] = pd.cut(df["age"], [0, 10, 20, 30, 40, 50, 60, 70, 200])
    age = df.groupby("age_bin").mean()
    age.index = age.index.astype('str')
    age = age['result']
    age = age.dropna()
    age = age.to_dict()

    gender = df.groupby("gender").mean()['result'].to_dict()
    gender = {key: float(value) for key, value in gender.items()}

    data = {
        "age": age,
        "gender": gender
    }

    return jsonify(data)


@app.route("/save", methods=['POST'])
def save():
    global df
    item = request.get_json()
    df = df.append(item, ignore_index=True)
    return jsonify({"result": "ok"})
