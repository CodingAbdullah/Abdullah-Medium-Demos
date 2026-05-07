#!/bin/bash

curl https://your-chutes-username-your-model-name.chutes.ai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_CHUTES_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-hf-username/your-finetuned-model",
    "messages": [
      {
        "role": "user",
        "content": "Explain this model in one sentence."
      }
    ]
  }'