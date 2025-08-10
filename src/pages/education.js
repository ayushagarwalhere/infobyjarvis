const API_KEY = "AIzaSyB1Wo0YRQd_lglhi7c4S8ZcC_KuGkxiaL0";
document.getElementById("chat-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const userInput = document.getElementById("user-input").value.trim();
    const chatBox = document.getElementById("chat-box");

    if (!userInput) return;

    // Display user message
    chatBox.innerHTML += `<div class="user-message"><b>You:</b> ${userInput}</div>`;
    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    async function sendMessage(userInput) {
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
                { 
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents: [{ parts: [{ text: userInput }] }] })
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("API Response:", data);

            // Extract bot response
            const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't process your request.";
            return botReply;
        } catch (error) {
            console.error("Fetch error:", error);
            return "Error connecting to AI.";
        }
    }

    // Call sendMessage with user input and display the bot's response
    sendMessage(userInput).then(botReply => {
        chatBox.innerHTML += `<div class="bot-message"><b>JARVIS:</b> ${botReply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    });
});