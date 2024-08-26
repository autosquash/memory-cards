import time
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

names: list[str] = []

ERR_USERNAME_NOT_VALID = "ERR_USERNAME_NOT_VALID"
ERR_USER_ALREADY_EXISTS = "ERR_USER_ALREADY_EXISTS"

# check frontend behaviour on network delays
SIMULATED_DELAY = 0.6


@app.route("/names", methods=["GET"])
def get_names():
    time.sleep(SIMULATED_DELAY)
    return jsonify(names)


@app.route("/names", methods=["POST"])
def add_name():
    time.sleep(SIMULATED_DELAY)
    assert request.json
    new_name = request.json.get("name")
    if isinstance(new_name, str):
        new_name = new_name.strip()
    if not new_name:
        return (
            jsonify(
                {"message": "Name is not valid!", "err_code": ERR_USERNAME_NOT_VALID}
            ),
            400,
        )
    if new_name in names:
        return (
            jsonify(
                {"message": "Name already exists!", "err_code": ERR_USER_ALREADY_EXISTS}
            ),
            400,
        )
    names.append(new_name)
    return jsonify({"message": "Name added successfully!"}), 201


if __name__ == "__main__":
    app.run()
