const API_KEY = "AIzaSyDAl1_5nuGmY4TQpmVpfZIQImve4juT994";
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// Function to send a message
async function askGemini(question) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const requestBody = {
        contents: [{
            parts: [{ text: question }]
        }]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        console.log("API Response:", data); // Debugging output

        // Extract AI response
        const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand.";

        // Display the response in the chat
        displayMessage(question, "user-message");
        displayMessage(botReply, "bot-message");

    } catch (error) {
        console.error("Error:", error);
        displayMessage("Error connecting to AI", "bot-message");
    }
}

// Function to display messages in chat
function displayMessage(text, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(className);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to latest message
}

// Event listener for the send button
document.querySelector(".chat-input").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    const question = userInput.value.trim();
    if (question) {
        askGemini(question);
        userInput.value = ""; // Clear input after sending
    }
});
