export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = "";

  try {
    body = req.body;
    if (!body || !body.question) {
      return res.status(400).json({ error: "Missing question in body" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid body" });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: body.question }]
      })
    });

    const data = await openaiRes.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    return res.status(200).json({ answer: data.choices[0].message.content });
  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
}
