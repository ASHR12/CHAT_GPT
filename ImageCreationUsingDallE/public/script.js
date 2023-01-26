window.onload = function () {
  const errorDiv = document.querySelector(".error-msg");
  var loader = document.querySelector(".loader");
  document
    .getElementById("text-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      loader.classList.remove("hide");
      // Get the text input
      const prompt = document.getElementById("text-input").value;
      errorDiv.innerHTML = ``;
      // Make an API call to your Node.js endpoint
      makeApiCall(prompt);
    });

  const makeApiCall = async (prompt) => {
    try {
      const response = await fetch("/api/v1/openAI/createImage", {
        method: "POST",
        body: JSON.stringify({ text: prompt }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        loader.classList.add("hide");
        const jsonResponse = await response.json();
        errorDiv.innerHTML = `<p>${jsonResponse.msg}<p>`;
      }
      const data = await response.json();
      loader.classList.add("hide");
      document.getElementById("image-frame").src = data.imageUrl;
    } catch (error) {
      loader.classList.add("hide");
      console.error(error);
    }
  };
};
