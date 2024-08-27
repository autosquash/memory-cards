import time
from typing import TypedDict
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


class User(TypedDict):
    name: str
    score: int


users: list[User] = []

ERR_USERNAME_NOT_VALID = "ERR_USERNAME_NOT_VALID"
ERR_USER_ALREADY_EXISTS = "ERR_USER_ALREADY_EXISTS"

# check frontend behaviour on network delays
SIMULATED_DELAY = 0.6


@app.route("/users", methods=["GET"])
def get_users():
    time.sleep(SIMULATED_DELAY)
    return jsonify(users)


@app.route("/users/add", methods=["POST"])
def add_user():
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
    if new_name in [user["name"] for user in users]:
        return (
            jsonify(
                {"message": "Name already exists!", "err_code": ERR_USER_ALREADY_EXISTS}
            ),
            400,
        )
    users.append(User(name=new_name, score=0))
    return jsonify({"message": "User added successfully!"}), 201


@app.route("/users/update", methods=["POST"])
def update_users():
    time.sleep(SIMULATED_DELAY)
    assert request.json
    new_users = request.json.get("users")
    users.clear()
    users.extend(new_users)
    return jsonify({"message": "Users updates successfully!"}), 201


if __name__ == "__main__":
    app.run()
