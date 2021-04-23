from flask import Flask, jsonify
from covid19_scraper import scrape_covid19_data
from flask_cors import CORS


app = Flask(__name__)

CORS(app)


@app.route('/api/countries')
def data_of_world():
    data = scrape_covid19_data()
    return jsonify(data)


app.run(debug=True)
