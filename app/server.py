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

initial_data = [
    {
        "age": 10,
        "gender": "m",
        "result": 1
    },
    {
        "age": 33,
        "gender": "f",
        "result": 0
    },
    {
        "age": 44,
        "gender": "m",
        "result": 0
    },
    {
        "age": 55,
        "gender": "f",
        "result": 1
    },
    {
        "age": 56,
        "gender": "m",
        "result": 0
    },
    {
        "age": 81,
        "gender": "f",
        "result": 0
    }
]

records = []

df = pd.DataFrame(data=initial_data, columns=['age', 'gender', 'result'])
df['result'] = df['result'].astype('int')


@app.route("/chart")
def chart():
    return render_template('chart.html')

@app.route("/irma")
def irma():
    return render_template('irma.html')

@app.route("/form")
def form():
    return render_template('form.html')


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

@app.route("/flush", methods=['POST'])
def flush():
    global df
    df = df.iloc[0:0]
    return jsonify({"result": "ok"})
