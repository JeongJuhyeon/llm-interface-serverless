/**
 * @file test/interfaces/ollama.test.js
 * @description Tests for the Ollama API client.
 */

const Ollama = require('../../src/interfaces/ollama.js');
const { ollamaURL } = require('../../src/config/config.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');
const axios = require('axios');

const message = {
  messages: [
    {
      role: 'system',
      content: 'You are a helpful assistant.',
    },
    {
      role: 'user',
      content: simplePrompt,
    },
  ],
};

let testString = 'Ollama is running';

describe('Ollama Interface (Outer)', () => {
  if (ollamaURL) {
    test('URL should be set', () => {
      expect(typeof ollamaURL).toBe('string');
    });

    describe('URL loading test', () => {
      let baseUrl;

      beforeAll(async () => {
        try {
          const fullUrl = ollamaURL;
          const parsedUrl = new URL(fullUrl);

          baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${
            parsedUrl.port ? ':' + parsedUrl.port : ''
          }/`;

          const response = await axios.get(baseUrl);

          expect(response.status).toBe(200);
          expect(response.data).toContain(testString);
        } catch (error) {
          throw new Error(`Failed to load URL: ${error.message}`);
        }
      });

      runTests(Ollama, ollamaURL, 'Ollama', 'llama3', message);
    });
  } else {
    test.skip('URL is not set', () => {});
  }
});
