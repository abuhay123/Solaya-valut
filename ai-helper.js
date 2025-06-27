<script>
async function askAI(question) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer sk-proj-..." // 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
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }]
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "אין תשובה.";
}

async function handleAsk() {
  const input = document.getElementById("aiInput").value;
  document.getElementById("aiResult").innerText = "טוען...";
  const answer = await askAI(input);
  document.getElementById("aiResult").innerText = answer;
}
</script>
