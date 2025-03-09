let map;
        function initMap() {
            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 31.6749, lng: 45.4194 }, // Default to San Francisco
                zoom: 12
            });
        }

        async function sendMessage() {
            let inputField = document.getElementById("userInput");
            let userText = inputField.value.trim();
            if (!userText) return;

            appendMessage("You: " + userText, "user");
            inputField.value = "";
            
            try {
                let response = await getGeminiResponse(userText);
                appendMessage("Bot: " + response, "bot");
                updateMap(userText);
            } catch (error) {
                console.error("Error in sendMessage():", error);
                appendMessage("Bot: Sorry, there was an error.", "bot");
            }
        }

        function appendMessage(text, className) {
            let chatbox = document.getElementById("chatbox");
            let messageDiv = document.createElement("div");
            messageDiv.classList.add("message", className);
            messageDiv.innerText = text;
            chatbox.appendChild(messageDiv);

            let speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }

        async function getGeminiResponse(input) {
            let apiKey = "AIzaSyB1Wo0YRQd_lglhi7c4S8ZcC_KuGkxiaL0";
            let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${apiKey}`;
            
            let requestBody = {
                prompt: { text: input },
                temperature: 0.7
            };

            try {
                let response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody)
                });
                
                let data = await response.json();
                console.log("Gemini API response:", data);
                return data.candidates && data.candidates.length > 0 ? data.candidates[0].output : "Sorry, I couldn't process that.";
            } catch (error) {
                console.error("Error fetching Gemini API:", error);
                return "Error connecting to Gemini AI.";
            }
        }

        function updateMap(destination) {
            let service = new google.maps.places.PlacesService(map);
            let request = {
                query: destination,
                fields: ['geometry']
            };

            service.textSearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
                    let location = results[0].geometry.location;
                    map.setCenter(location);
                    map.setZoom(12);
                    new google.maps.Marker({ position: location, map: map });
                } else {
                    console.warn("No results found for destination: ", destination);
                }
            });
        }

        function startVoiceRecognition() {
            let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.start();

            recognition.onresult = function(event) {
                let voiceInput = event.results[0][0].transcript;
                document.getElementById("userInput").value = voiceInput;
                sendMessage();
            };

            recognition.onerror = function(event) {
                console.error("Voice recognition error:", event.error);
            };
        }

        document.getElementById("sendButton").addEventListener("click", sendMessage);
        document.getElementById("voiceButton").addEventListener("click", startVoiceRecognition);
        
        window.onload = initMap;