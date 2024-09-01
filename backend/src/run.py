import time

from dotenv import load_dotenv
from flask import Flask, Response, jsonify, request
from flask_cors import CORS

from src.model import User
from src.persistence import load_users_from_file, save_users_to_file

load_dotenv()

app = Flask(__name__)
CORS(app)


ERR_USERNAME_NOT_VALID = "ERR_USERNAME_NOT_VALID"
ERR_USER_ALREADY_EXISTS = "ERR_USER_ALREADY_EXISTS"

# Check frontend behaviour on network delays
SIMULATED_DELAY = 0.6


@app.route("/users", methods=["GET"])
def get_users() -> Response:
    time.sleep(SIMULATED_DELAY)
    # Load users initially
    users = load_users_from_file()
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
    users = load_users_from_file()
    if new_name in [user["name"] for user in users]:
        return (
            jsonify(
                {"message": "Name already exists!", "err_code": ERR_USER_ALREADY_EXISTS}
            ),
            400,
        )
    users.append(User(name=new_name, score=0, gamesPlayed=[]))
    save_users_to_file(users)
    return jsonify({"message": "User added successfully!"}), 201


@app.route("/users/update", methods=["POST"])
def update_users():
    time.sleep(SIMULATED_DELAY)
    assert request.json
    updated_users = request.json.get("users")
    save_users_to_file(updated_users)
    return jsonify({"message": "Users updated successfully!"}), 201


if __name__ == "__main__":
    app.run()
