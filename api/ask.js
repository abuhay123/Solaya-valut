export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body || {};

  if (!question) {
    return res.status(400).json({ error: "Missing question" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ answer: "שגיאת OpenAI: " + data.error.message });
    }

    return res.status(200).json({ answer: data.choices[0].message.content });

  } catch (error) {
    return res.status(500).json({ answer: "שגיאת מערכת: " + error.message });
  }
}
