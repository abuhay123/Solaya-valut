// pages/api/ask.js

export default async function handler(req, res) {
  try {
    const body = await getRawBody(req);
    const question = body?.question;

    if (!question) {
      return res.status(400).json({ answer: "❌ שאלה חסרה." });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ answer: "❌ חסר מפתח API." });
    }

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
        temperature: 0.7
      })
    });

    const data = await openaiRes.json();
    const answer = data?.choices?.[0]?.message?.content || "אין תשובה.";

    return res.status(200).json({ answer });

  } catch (err) {
    return res.status(500).json({ answer: "שגיאת מערכת: " + err.message });
  }
}

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => {
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(e);
      }
    });
  });
}
