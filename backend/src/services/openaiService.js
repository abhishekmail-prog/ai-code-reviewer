const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are an expert code reviewer. Analyze the code provided and return ONLY a valid JSON object with no extra text, no markdown fences, no explanation outside the JSON.

Return exactly this structure:
{
  "bugs": [
    { "title": "short title", "description": "detailed explanation" }
  ],
  "complexity": {
    "time": "O(?)",
    "space": "O(?)",
    "timeExplanation": "brief explanation",
    "spaceExplanation": "brief explanation"
  },
  "optimizations": [
    { "title": "short title", "description": "detailed suggestion" }
  ],
  "cleanedCode": "the full improved and cleaned-up version of the code as a plain string"
}

Rules:
- If there are no bugs, return an empty array for bugs.
- Be specific, technical, and helpful.
- cleanedCode must be valid runnable code in the same language.
- Return ONLY the JSON object, nothing else.`;

async function reviewCode(code, language) {
  const userMessage = `Review this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ],
    temperature: 0.3,
    max_tokens: 2000,
  });

  const raw = completion.choices[0].message.content.trim();

  // Strip accidental markdown fences if present
  const cleaned = raw.replace(/^```json\s*|^```\s*|```$/gm, "").trim();
  return JSON.parse(cleaned);
}

module.exports = { reviewCode };
