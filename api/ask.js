export default async function handler(req, res) {
  const { question } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }]
    })
  });

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content || "אין תשובה.";
  res.status(200).json({ answer });
}
