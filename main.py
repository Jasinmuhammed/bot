from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

app = Flask(__name__)

llm = ChatGoogleGenerativeAI(
    model="gemini-3.8-flash",
    temperature=0.7
)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    user_message = data.get("message")

    response = llm.invoke(user_message)

    if isinstance(response.content, list):
        bot_message = response.content[0]["text"]
    else:
        bot_message = response.content

    return jsonify({
        "response": bot_message
    })


if __name__ == "__main__":
    app.run(debug=True)