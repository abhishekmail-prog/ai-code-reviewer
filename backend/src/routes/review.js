const express = require("express");
const { reviewCode } = require("../services/openaiService");

const router = express.Router();

const SUPPORTED_LANGUAGES = ["python", "javascript", "cpp"];

router.post("/", async (req, res) => {
  const { code, language } = req.body;

  if (!code || typeof code !== "string" || code.trim() === "") {
    return res.status(400).json({ error: "code is required and must be a non-empty string." });
  }

  if (!language || !SUPPORTED_LANGUAGES.includes(language)) {
    return res.status(400).json({
      error: `language must be one of: ${SUPPORTED_LANGUAGES.join(", ")}`,
    });
  }

  if (code.length > 10000) {
    return res.status(400).json({ error: "Code must be under 10,000 characters." });
  }

  try {
    const result = await reviewCode(code, language);
    return res.json(result);
  } catch (err) {
    console.error("Review error:", err.message);

    if (err instanceof SyntaxError) {
      return res.status(502).json({ error: "AI returned malformed JSON. Please try again." });
    }

    return res.status(500).json({ error: "Internal server error. Please try again." });
  }
});

module.exports = router;
