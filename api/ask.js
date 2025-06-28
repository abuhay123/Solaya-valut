export default async function handler(req, res) {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ answer: "שאלה חסרה." });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ answer: "המפתח לא קיים ב־ENV." });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    return res.status(200).json({ answer: data.choices[0].message.content });
  } catch (error) {
    return res.status(500).json({ answer: "שגיאת מערכת: " + error.message });
  }
}
