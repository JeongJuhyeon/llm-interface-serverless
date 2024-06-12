/**
 * @file llamacp.js
 * @class LlamaCP
 * @description Wrapper class for the LlamaCP API.
 * @param {string} llamacpURL - The URL for the LlamaCP API.
 */

const axios = require("axios");

class LlamaCP {
  constructor(llamacpURL) {
    this.client = axios.create({
      llamacpURL: llamacpURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Sends a message to the LlamaCP API.
   * @param {Object} prompt - The prompt object to send.
   * @param {Object} [options] - Optional parameters.
   * @param {number} [options.max_tokens=150] - Maximum number of tokens.
   * @returns {Promise<string>} - The response text.
   * @throws {Error} - Throws an error if the API call fails.
   * @example
   * const response = await llamaCP.sendMessage({ messages: [{ role: 'user', content: 'Hello!' }] });
   */
  async sendMessage(prompt, options = {}) {
    const { max_tokens = 150 } = options;
    try {
      const formattedPrompt = prompt.messages.map((message) => message.content);

      const response = await this.client.post("", {
        prompt: formattedPrompt,
        n_predict: max_tokens,
      });

      let contents;
      if (response.data.content) {
        contents = response.data.content;
      } else if (response.data.results) {
        contents = response.data.results.map((result) => result.content).join();
      } else {
        contents = "";
      }

      return contents;
    } catch (error) {
      if (error.response) {
        console.error(
          "Server responded with status code:",
          error.response.status
        );
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
      throw error;
    }
  }
}

module.exports = LlamaCP;
