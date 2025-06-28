export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = '';
  try {
    body = req.body;
  } catch (e) {
    return res.status(400).json({ error: "Invalid body" });
  }

  const question = body?.question;
  if (!question) {
    return res.status(400).json({ error: "Missing question" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await response.json();
    return res.status(200).json({ answer: data.choices?.[0]?.message?.content || "אין תשובה." });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
