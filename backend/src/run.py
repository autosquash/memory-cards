import time
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

names: list[str] = ["Peter", "Joan", "Lukas"]


@app.route("/names", methods=["GET"])
def get_names():
    time.sleep(1.5)  # check frontend behaviour on delays
    return jsonify(names)


@app.route("/names", methods=["POST"])
def add_name():
    time.sleep(1.5)
    assert request.json
    new_name = request.json.get("name")
    if new_name and new_name not in names:
        names.append(new_name)
        return jsonify({"message": "Name added successfully!"}), 201
    return jsonify({"message": "Name already exists or invalid!"}), 400


if __name__ == "__main__":
    app.run()
