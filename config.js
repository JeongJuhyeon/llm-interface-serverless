/**
 * @file config.js
 * @description Configuration file to load environment variables.
 */

require("dotenv").config();

module.exports = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  groqApiKey: process.env.GROQ_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  llamaURL: process.env.LLAMACP_URL,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
};
