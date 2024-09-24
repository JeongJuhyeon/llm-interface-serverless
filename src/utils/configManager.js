/**
 * @file /utils/configManager.js
 * @description Manages the configuration for the LLM interface module using dynamic imports.
 */

const log = require('loglevel');
const { activeProviders } = require('../config/providers.js');

//log.setLevel('trace');

/**
 * The main configuration object that stores configurations for all providers.
 */
const config = {};

/**
 * Loads the configuration for a given provider or multiple providers.
 *
 * @param {string|string[]|Object.<string, string>} providerName - The name of the provider,
 * an array of provider names, or an object with provider names as keys and their corresponding API keys as values.
 * @returns {Promise<Object|undefined>} The loaded configuration(s). If a single provider is loaded, returns its config.
 * If multiple providers are loaded, returns an object with the providers' configs. If no config is found, returns undefined.
 */
async function loadProviderConfig(providerName) {
  if (config && config[providerName] && config[providerName].url) {
    return config[providerName];
  }

  /**
   * Asynchronously loads the configuration for a single provider.
   *
   * @param {string} name - The name of the provider.
   * @returns {Promise<object|null>} The provider configuration object or null if the configuration does not exist.
   */
  async function loadSingleProviderConfig(name) {
    if (config && config[name] && config[name].url) {
      return config[name];
    }

    try {   
      const providerConfig = activeProviders[name];
      config[name] = providerConfig.default || providerConfig;
      return config[name];
    } catch (error) {
      log.debug(`Failed to load configuration for provider ${name}:`, error);
      return null;
    }
  }

  // Handle different types of input
  if (typeof providerName === 'string') {
    return await loadSingleProviderConfig(providerName);
  } else if (Array.isArray(providerName)) {
    const results = await Promise.all(providerName.map(loadSingleProviderConfig));
    return providerName.reduce((acc, name, index) => {
      acc[name] = results[index];
      return acc;
    }, {});
  } else if (typeof providerName === 'object' && providerName !== null) {
    const results = await Promise.all(Object.keys(providerName).map(loadSingleProviderConfig));
    return Object.keys(providerName).reduce((acc, name, index) => {
      acc[name] = results[index];
      return acc;
    }, {});
  }
}

/**
 * Gets the configuration for a specific provider.
 * @param {string} providerName - The name of the provider.
 * @returns {Promise<Object>} The configuration object for the provider.
 */
async function getProviderConfig(providerName) {
  if (!config[providerName]) {
    await loadProviderConfig(providerName);
  }
  return config[providerName];
}

/**
 * Updates the configuration for a specific provider in memory.
 * @param {string} providerName - The name of the provider.
 * @param {Object} newConfig - The new configuration object for the provider.
 */
function updateConfig(providerName, newConfig) {
  config[providerName] = newConfig;
}

/**
 * Gets the configurations for all loaded providers.
 * @returns {Object} An object with configurations for all loaded providers.
 */
function getConfig() {
  return config;
}

module.exports = {
  getConfig,
  updateConfig,
  getProviderConfig,
  loadProviderConfig,
};
