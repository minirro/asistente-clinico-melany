export default async function handler(req, res) {
  try {
    const body = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Eres un asistente clínico. No das diagnósticos definitivos. Usa lenguaje profesional argentino."
          },
          {
            role: "user",
            content: body.prompt
          }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ output: data.choices?.[0]?.message?.content });

  } catch (err) {
    res.status(500).json({ error: "Error en servidor", detail: String(err) });
  }
}
