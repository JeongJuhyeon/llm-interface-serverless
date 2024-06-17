/**
 * @file reka.test.js
 * @description Tests for the Reka AI API client.
 */

const Reka = require("../../src/reka");
const { rekaApiKey } = require("../../config");

test("Reka AI API Key should be set", async () => {
  expect(typeof rekaApiKey).toBe("string");
});

test("Reka AI AjestPI Client should send a message and receive a response", async () => {
  const reka = new Reka(rekaApiKey);
  const message = "Explain the importance of low latency LLMs.";
  try {
    const response = await reka.sendMessage(message, {});

    expect(typeof response).toBe("string");
  } catch (error) {
    console.error("Test failed:", error);
    throw error;
  }
}, 30000);
