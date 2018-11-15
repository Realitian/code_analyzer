"""
/**************************************************************
 * Project          Data Collection & Analyze
 * (c) Copyright    2018 Turing Inc
 *                  All rights reserved
 **************************************************************/

/**
 * @file            service.py
 * @ingroup         code analyzer
 * @author          Jin Chen Wu
 * @created_date    2018/11/08
 * @modified_date   2018/11/08
 * @brief           Declaration file of rest service.
 */
"""

from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

import json
import flask
import numpy as np

from analyzer.main import Analyzer

app = Flask(__name__, static_url_path = "")
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
analyzer = Analyzer()

@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify( { 'error': 'Bad request' } ), 400)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify( { 'error': 'Not found' } ), 404)

@app.route('/api', methods = ['GET', 'POST'])
def analyze():
    repo_url = request.args['repo_url']
    return analyzer.analyze(repo_url)

@app.route("/")
def index():
    return flask.render_template("index.html")

@app.route("/data")
@app.route("/data/<int:ndata>")
def data(ndata=100):
    x = 10 * np.random.rand(ndata) - 5
    y = 0.5 * x + 0.5 * np.random.randn(ndata)
    A = 10. ** np.random.rand(ndata)
    c = np.random.rand(ndata)
    return json.dumps([{"_id": i, "x": x[i], "y": y[i], "area": A[i],
        "color": c[i]}
        for i in range(ndata)])

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=5000)