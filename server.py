from flask import (
    Flask,
    after_this_request,
    request,
    send_file,
    send_from_directory,
    after_this_request,
)
import os
from random import randint
import json
import requests

app = Flask(__name__, static_url_path="")


@app.route("/", methods=["GET"])
def home():
    return send_file("./static/index.html")


@app.route("/static/<path:path>", methods=["GET"])
def static_files(path):
    return send_from_directory("./static", path)


@app.route(
    "/extract-relations", methods=["POST"]
)  # tells Flask to use this as the url for the server (handle requests)
def extract_relations():
    # JUST FOR TESTING
    with open("sample_response.json") as file:
        return file.read()

    api_key = os.environ["API_KEY"]
    if not api_key:
        raise Exception("NO API KEY HERE!")

    # get the text out of the request JSON
    params = request.get_json(force=True)
    requested_text = params["text"]

    # request Primer API with the given text
    response = requests.post(
        "https://engines.primer.ai/api/v1/entities/relations",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={"text": requested_text},
    )

    # return the response from Primer to the browser
    return response.text


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
