/**
 * @file /src/utils/llmInterface.js
 * @description Build the base LLMInterface used by providers.js
 */

const { activeProviders } = require('../config/providers.js');

// Import all possible interfaces
const anthropicInterface = require('../interfaces/anthropic');
const openAIInterface = require('../interfaces/openai');
const googleInterface = require('../interfaces/google');
const azureInterface = require('../interfaces/azure');
// Add more interfaces as needed

/**
 * Creates the LLMInterface object with all available interfaces,
 * but only exposes the active ones.
 * @namespace
 */
const LLMInterface = {
  anthropic: anthropicInterface,
  openai: openAIInterface,
  google: googleInterface,
  azure: azureInterface,
  // Add more interfaces as needed
};

// Filter the LLMInterface to only include active providers
const ActiveLLMInterface = Object.keys(activeProviders).reduce((acc, key) => {
  if (LLMInterface[key]) {
    acc[key] = LLMInterface[key];
  }
  return acc;
}, {});

module.exports = { LLMInterface: ActiveLLMInterface };
