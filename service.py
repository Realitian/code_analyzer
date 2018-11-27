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

from register.main import Service

app = Flask(__name__, static_url_path = "")
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
service = Service()

@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify( { 'error': 'Bad request' } ), 400)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify( { 'error': 'Not found' } ), 404)

@app.route('/api/register', methods = ['GET', 'POST'])
def register():
    repo_url = request.args['repo_url']
    return service.register(repo_url)

@app.route('/api/list', methods = ['GET', 'POST'])
def list():
    return service.list()

@app.route('/api/lang', methods = ['GET', 'POST'])
def lang():
    repo_url = request.args['repo_url']
    return service.lang(repo_url)

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=5000)