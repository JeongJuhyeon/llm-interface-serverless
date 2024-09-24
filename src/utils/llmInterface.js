/**
 * @file /src/utils/llmInterface.js
 * @description Build the base LLMInterface used by providers.js
 */

const { activeProviders } = require('../config/providers.js');
const { activeInterfaces } = require('../config/interfaces.js');

/**
 * Creates the LLMInterface object with all available interfaces,
 * but only exposes the active ones.
 * @namespace
 */
const LLMInterface = {};

// Populate LLMInterface with active interfaces
Object.keys(activeInterfaces).forEach(async (key) => {
  const interfaceModule = await activeInterfaces[key];
  LLMInterface[key] = interfaceModule.default || interfaceModule;
});

// Filter the LLMInterface to only include active providers
const ActiveLLMInterface = Object.keys(activeProviders).reduce((acc, key) => {
  if (key in LLMInterface) {
    acc[key] = LLMInterface[key];
  }
  return acc;
}, {});

module.exports = { LLMInterface: ActiveLLMInterface };
