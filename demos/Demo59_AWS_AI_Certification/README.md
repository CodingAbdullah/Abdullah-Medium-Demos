# AWS AI Services and Tools

This document provides a comprehensive summary of AWS AI services, Sagemaker tools, AWS Q business solutions, and other relevant AWS services. It is designed to help you understand key concepts for the AWS AI Practitioner exam.

## AWS AI Services

### AWS Comprehend
- Utilizes NLP and ML to generate insights from text, key phrases, people, brands, etc.
- Supports Named Entity Recognition, Custom Entity Recognition.

### AWS Translate
- Accurate language translation service.

### AWS Transcribe
- Converts speech to text with speech recognition capabilities.

### AWS Polly
- Converts text to life-like speech.
- Supports lexicons, SSML, Voice Engines, etc.

### AWS Rekognition
- Identifies objects, people, text, and scenes in images and videos.
- Includes facial analysis and facial search, content moderation API.

### AWS Lex
- Build chatbots with voice and text.
- Supports multiple languages.

### AWS Personalize
- Creates real-time personalized recommendations for applications.

### AWS Textract
- Extracts text, handwriting, and data from scanned documents using AI/ML.

### AWS Kendra
- Managed document search service powered by ML.
- Uses natural language capabilities to extract answers from documents.

### AWS Mechanical Turk
- Virtual workforce for completing simple human tasks.

### AWS A2I
- Human oversight of ML predictions in production.

### AWS Transcribe Medical
- Converts medical-related speech to text.
- Detects protected health information using NLP.

---

## AWS Sagemaker Tools

### Sagemaker Overview
AWS Sagemaker is used to build, test, and deploy ML models from scratch.

### Key Sagemaker Services
- **Sagemaker Data Wrangler**: Allows data manipulation and feature engineering.
- **Sagemaker Feature Store**: Stores, defines, and publishes features.
- **Sagemaker Clarify**: Detects and removes bias from models.
- **Sagemaker Ground Truth**: Aligns models with human preferences, using RLHF.
- **Sagemaker Model Cards**: Provides essential model information, including risk ratings.
- **Sagemaker Dashboard**: A centralized repository for model insights.
- **Sagemaker Model Monitoring**: Monitors model quality in production.
- **Sagemaker Model Registry**: Manages model versions and tracks models.
- **Sagemaker Pipeline**: Provides CI/CD for machine learning models (MLOps).
- **Sagemaker Canvas**: A no-code solution for creating and deploying ML models.
- **Sagemaker Jumpstart**: Customizes and works with Foundation Models (FMs) via AWS Bedrock.

---

## AWS Q Solutions

### AWS Q Business
- AWS Q acts as an intelligent assistant that works on behalf of companies using their internal knowledge and data.
- Answers questions, provides summaries, generates content, and automates tasks.
- Built on **AWS Bedrock** (using multiple Foundation Models).
- Includes plugins and data connectors such as:
  - S3, RDS, Aurora, WorkDocs, Microsoft 365, Salesforce, GDrive, Gmail, Slack, Jira, Zendesk, ServiceNow.
- Users can access this service via **IAM Identity Center**.
- Supports authentication via external identity providers like **Google** and **Microsoft Active Directory**.
- Admin controls feature allows you to customize responses based on organizational needs.

### Amazon Q Apps
- Create apps without coding knowledge.
- Leverages internal company data.

### Amazon Q Developer
- Acts as a coding assistant for users.
- Helps with billing analysis, answering questions about resources, generating documentation, and more.

### AWS Q for QuickSight
- Visualizes data and creates dashboards.
- Supports natural language queries about your data.

### AWS Q for EC2
- Provides guidance and suggestions for choosing EC2 instance types that best suit your workloads.

### AWS Chatbot
- Deploys a chatbot within Slack or Microsoft Teams channels.

### AWS Q for Glue
- AWS Glue is an ETL service for moving data.
- Allows users to chat, supports data and code generation, and more.

### AWS PartyRock
- A GenAI application playground for developing AI-powered applications with no code.

---

## Additional AWS Services

- **AWS IAM**: Users, groups, roles, policies (JSON), and the principle of least privilege.
- **AWS S3**: Object storage, website hosting, lifecycle management, etc.
- **AWS EC2**: Server configuration and management.
- **AWS Lambda**: Server-less code execution.
- **AWS Macie**: AI service for detecting and protecting sensitive information.
- **AWS Config**: Track environment updates.
- **AWS Inspector**: Track vulnerabilities in deployed resources.
- **AWS Trusted Advisor**: Provides guidelines for best security practices.
- **AWS CloudTrail**: Monitors user activity and identifies risks.
- **AWS Artifact**: Lookup and read compliance documents.
- **AWS Audit Manager**: Ensures compliance and standards adherence.
- **AWS VPC**: Configures VPC Endpoints, PrivateLink, security groups, etc.

---

## Conclusion

This summary should help you prepare for the AWS AI Practitioner exam by familiarizing you with essential AWS AI services, tools, and concepts, including the powerful capabilities provided by **AWS Q** and **AWS Bedrock**.