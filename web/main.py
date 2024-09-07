from flask import Flask, render_template, request
from flask_cors import CORS
from util import get_results_from_api


app = Flask(__name__)
CORS(app)


@app.route("/")
def homepage():
    return render_template("homepage.html")


@app.route("/search")
def search():
    search_query = request.args.get('q', '')
    response = get_results_from_api(
        search_term=search_query
    )
    return render_template(
        "search.html",
        search_query=search_query,
        response=response
    )


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
