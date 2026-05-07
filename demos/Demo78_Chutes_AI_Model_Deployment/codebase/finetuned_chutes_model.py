from chutes.chute import NodeSelector
from chutes.chute.template.vllm import build_vllm_chute

chute = build_vllm_chute(
    username="your-chutes-username",

    # Replace this with YOUR fine-tuned Hugging Face model
    model_name="your-hf-username/your-finetuned-model",

    node_selector=NodeSelector(
        gpu_count=1,
    ),

    concurrency=4,

    readme="""
# Fine-Tuned Model Chute

This deploys my fine-tuned Hugging Face model on Chutes AI
using the vLLM template with an OpenAI-compatible API.
"""
)