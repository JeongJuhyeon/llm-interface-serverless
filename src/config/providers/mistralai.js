module.exports = {"url":"https://api.mistral.ai/v1/chat/completions","model":{"default":"mistral-large-latest","large":"mistral-large-latest","small":"mistral-small-latest","agent":"mistral-large-latest"},"embeddingUrl":"https://api.mistral.ai/v1/embeddings","embeddings":{"results":"response.data.data[0].embedding","default":"mistral-embed","large":"mistral-embed","small":"mistral-embed"},"createMessageObject":"getMessageObject","stream":true,"jsonMode":true,"maxTokens":true,"hasEmbeddings":true}