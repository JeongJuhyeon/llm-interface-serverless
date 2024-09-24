module.exports = {"url":"https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-02","model":{"default":"ibm/granite-13b-chat-v2","large":"meta-llama/llama-3-70b-instruct","small":"google/flan-t5-xxl","agent":"meta-llama/llama-3-70b-instruct"},"embeddingUrl":"https://us-south.ml.cloud.ibm.com/ml/v1/text/embeddings?version=2023-05-02","embeddings":{"expects":{"inputs":"{embedding}","model_id":"{model}","space_id":"{second}"},"results":"response.data.results[0].embedding","default":"ibm/slate-125m-english-rtrvr","large":"ibm/slate-125m-english-rtrvr","small":"ibm/slate-30m-english-rtrvr"},"createMessageObject":"getMessageObject","stream":false,"jsonMode":false,"maxTokens":true,"hasEmbeddings":true}