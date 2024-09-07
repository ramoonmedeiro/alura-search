from flask import Flask, render_template, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET",])
def homepage():
    return render_template("homepage.html")


@app.route("/search", methods=["GET"])
def search():
    search_query = request.args.get('q', '')

    return render_template(
        "search.html",
        search_query=search_query
    )


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
