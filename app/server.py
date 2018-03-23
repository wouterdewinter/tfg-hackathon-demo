#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify, render_template
import pandas as pd
import numpy as np
import time
import random
import sys

app = Flask(__name__, static_url_path='/static')

initial_data = [
    {
        "age": 10,
        "gender": "m",
        "result": 1
    },
    {
        "age": 25,
        "gender": "f",
        "result": 0
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
        "age": 52,
        "gender": "m",
        "result": 0
    },
    {
        "age": 62,
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

@app.route("/request")
def dummyrequest():
    return render_template('request.html')

@app.route("/response")
def dummyresponse():
    return render_template('response.html')

@app.route("/success")
def successresponse():
    return render_template('success.html')

@app.route("/fail")
def failresponse():
    return render_template('fail.html')


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

    rand = np.random.rand()

    if item['age'] > 30:
        result = rand > .8
    else:
        result = rand > .4

    result = 1 if result else 0
    item['result'] = result

    df = df.append(item, ignore_index=True)

    return jsonify({"result": result})

@app.route("/flush", methods=['POST'])
def flush():
    global df
    df = df.iloc[0:0]
    return jsonify({"result": "ok"})
