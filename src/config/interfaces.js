const activeInterfaces = {
  "anthropic": import('../interfaces/anthropic'),
  "openai": import('../interfaces/openai'),
  "google": import('../interfaces/google'),
  "azure": import('../interfaces/azure'),
  // Add more interfaces as needed
};

module.exports = { activeInterfaces };
