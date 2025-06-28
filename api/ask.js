export default async function handler(req, res) {
  const { question } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer sk-proj-המפתח_שלך"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
      temperature: 0.7
    })
  });

  const data = await response.json();
  res.status(200).json({ answer: data.choices?.[0]?.message?.content });
}
