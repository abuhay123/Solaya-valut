async function askAI(question) {
  const response = await fetch("/api/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  });

  const data = await response.json();
  return data.answer || "אין תשובה.";
}

async function handleAsk() {
  const input = document.getElementById("aiInput").value;
  document.getElementById("aiResult").innerText = "טוען...";
  const answer = await askAI(input);
  document.getElementById("aiResult").innerText = answer;
}
