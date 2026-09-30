async function sendMessage() {

    const input = document.getElementById("message-input");

    const message = input.value.trim();

    if (!message) {
        return;
    }

    addMessage(message, "user");

    input.value = "";

    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        addMessage(data.response, "bot");

    } catch (error) {

        addMessage(
            "Sorry, something went wrong.",
            "bot"
        );

        console.error(error);
    }
}


function addMessage(message, sender) {

    const chatBox = document.getElementById("chat-box");

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message", sender);

    messageDiv.innerHTML = `
        <div class="bubble">
            ${message}
        </div>
    `;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}
function setMessage(message) {
    const input = document.getElementById("message-input");

    input.value = message;
    input.focus();
}