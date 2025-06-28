export default async function handler(req, res) {
  const { question } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-proj-הכנס_כאן_את_המפתח_שלך"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ answer: `שגיאת שרת: ${errorText}` });
    }

    const data = await response.json();
    res.status(200).json({ answer: data.choices?.[0]?.message?.content });
  } catch (error) {
    res.status(500).json({ answer: "שגיאת מערכת: " + error.message });
  }
}
