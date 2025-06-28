export default async function handler(req, res) {
  const { question } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!data || !data.choices || !data.choices[0]) {
      return res.status(500).json({ answer: "שגיאה: לא התקבלה תשובה תקינה מה־API." });
    }

    return res.status(200).json({ answer: data.choices[0].message.content });
  } catch (error) {
    return res.status(500).json({ answer: "שגיאת שרת: " + error.message });
  }
}
