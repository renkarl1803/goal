# Goal AI API - Quick Start Guide

## 🚀 Running the API

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The API will be available at `http://localhost:3001`

## 📡 API Endpoints

All endpoints allow requests from any origin (CORS enabled for all).

### Health Check

**GET** `/health`
```bash
curl http://localhost:3001/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-05-27T22:30:00Z"
}
```

### API Info

**GET** `/api/v1`
```bash
curl http://localhost:3001/api/v1
```

**Response:**
```json
{
  "name": "Goal AI API",
  "version": "0.1.0",
  "endpoints": {
    "health": "/api/v1/health",
    "ai": "/api/v1/ai/health",
    "chat": "/api/v1/ai/chat (POST)"
  }
}
```

### AI Chat

**POST** `/api/v1/ai/chat`

Send a message to the AI and get a response.

**Request:**
```bash
curl -X POST http://localhost:3001/api/v1/ai/chat \
  -H "Content-Type: application/json" \
  -d {
    "message": "What is artificial intelligence?",
    "conversationId": "conv_123",
    "systemPrompt": "You are a helpful AI assistant"
  }
```

**Parameters:**
- `message` (required): The user's message
- `conversationId` (optional): Conversation identifier for context
- `systemPrompt` (optional): System instructions for the AI

**Response:**
```json
{
  "success": true,
  "response": "Artificial Intelligence (AI) is...",
  "conversationId": "conv_123",
  "usage": {
    "promptTokens": 15,
    "completionTokens": 87
  }
}
```

### Error Responses

**400 Bad Request:**
```json
{
  "error": "Message is required"
}
```

**500 Server Error:**
```json
{
  "error": "Failed to generate AI response",
  "details": "API key is invalid"
}
```

## 🔑 Environment Setup

Create `.env` file in `apps/api`:

```env
OPENAI_API_KEY=sk-your-key-here
PORT=3001
NODE_ENV=development
LOG_LEVEL=info
```

## 📝 Example Use Cases

### Simple Chat
```bash
curl -X POST http://localhost:3001/api/v1/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!"}'
```

### With System Prompt
```bash
curl -X POST http://localhost:3001/api/v1/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message":"What is 2+2?",
    "systemPrompt":"You are a math tutor. Explain your answers clearly."
  }'
```

### With Conversation Context
```bash
curl -X POST http://localhost:3001/api/v1/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message":"Can you elaborate on that?",
    "conversationId":"conv_user_123"
  }'
```

## 🔄 CORS Configuration

The API accepts requests from any origin:
- All HTTP methods: GET, POST, PUT, DELETE, PATCH
- All headers allowed
- No authentication required for testing

## 📊 Monitoring

View logs:
```bash
tail -f apps/api/error.log
tail -f apps/api/combined.log
```

## 🚀 Production Deployment

```bash
npm run build
npm start
```

Uses Docker:
```bash
docker build -t goal-api .
docker run -p 3001:3001 goal-api
```
