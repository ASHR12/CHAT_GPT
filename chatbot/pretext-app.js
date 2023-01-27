const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const apiKey = "";

const preText =
  "I am your personal informational guide for the upcoming and previous UEFA Champions League games. I can provide you with details such as schedules, teams, scores, and statistics. Please ask me any question related to the tournament and I will provide you with a concise answer. ";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value;
  input.value = "";

  messages.innerHTML += `<div class="message user-message">
  <img src="./icons/user.png" alt="user icon"> <span>${message}</span>
  </div>`;

  // Use axios library to make a POST request to the OpenAI API
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: preText + `${message}`,
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const chatbotResponse = response.data.choices[0].text;

  messages.innerHTML += `<div class="message bot-message">
  <img src="./icons/chatbot.png" alt="bot icon"> <span>${chatbotResponse}</span>
  </div>`;
});
