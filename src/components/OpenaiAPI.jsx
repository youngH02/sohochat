import React from "react";
const OPENAI_API_KEY = "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";
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

function OpenaiAPI() {
  return <div></div>;
}

export default OpenaiAPI;

// curl https://api.openai.com/v1/models \
//   -H "Authorization: Bearer " \
//   -H "OpenAI-Organization: org-wSbEpnSVWEbHFw7UbQzM5Kz1"

// $OPENAI_API_KEY=''
// curl https://api.openai.com/v1/chat/completions \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer  \
//   -d '{
//      "model": "gpt-3.5-turbo-1106",
//      "messages": [{"role": "user", "content": "Say this is a test!"}],
//      "temperature": 0.7
//    }'
