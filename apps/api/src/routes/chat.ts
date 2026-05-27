/**
 * Chat Service - Q&A with AI
 * Users can ask any question and get intelligent answers
 */

import express from 'express';
import { OpenAI } from 'openai';
import logger from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Conversation {
  id: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
}

// In-memory conversations (use Redis in production)
const conversations: Map<string, Conversation> = new Map();

/**
 * POST /api/v1/chat
 * Send a message and get AI response
 */
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const { message, conversationId, persona = 'helpful-assistant' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const cid = conversationId || uuidv4();
    let conversation = conversations.get(cid) || { id: cid, messages: [] };

    // System prompts for different personas
    const systemPrompts: Record<string, string> = {
      'helpful-assistant': 'You are a helpful, friendly AI assistant. Answer questions clearly and concisely.',
      'expert': 'You are an expert in your field. Provide detailed, well-researched answers.',
      'creative': 'You are a creative AI assistant. Help with brainstorming, storytelling, and creative projects.',
      'teacher': 'You are a patient teacher. Explain concepts in a way that\'s easy to understand.',
      'professional': 'You are a professional business consultant. Provide strategic and business-focused advice.',
    };

    const systemPrompt = systemPrompts[persona] || systemPrompts['helpful-assistant'];

    // Build messages array
    const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [
      { role: 'user', content: message },
    ];

    // Include conversation history
    if (conversation.messages.length > 0) {
      messages.unshift(...conversation.messages);
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const aiMessage = response.choices[0].message.content || '';

    // Update conversation history
    conversation.messages.push(
      { role: 'user', content: message },
      { role: 'assistant', content: aiMessage }
    );

    // Keep only last 10 messages to manage memory
    if (conversation.messages.length > 20) {
      conversation.messages = conversation.messages.slice(-20);
    }

    conversations.set(cid, conversation);

    logger.info(`Chat response generated for conversation: ${cid}`);

    res.json({
      success: true,
      response: aiMessage,
      conversationId: cid,
      messageCount: conversation.messages.length,
      usage: {
        promptTokens: response.usage?.prompt_tokens,
        completionTokens: response.usage?.completion_tokens,
      },
    });
  } catch (error) {
    logger.error('Error in chat endpoint', error);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/v1/chat/history/:conversationId
 * Get conversation history
 */
router.get('/history/:conversationId', (req: express.Request, res: express.Response) => {
  try {
    const { conversationId } = req.params;
    const conversation = conversations.get(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({
      success: true,
      conversationId,
      messages: conversation.messages,
      messageCount: conversation.messages.length,
    });
  } catch (error) {
    logger.error('Error fetching conversation history', error);
    res.status(500).json({ error: 'Failed to fetch conversation history' });
  }
});

/**
 * POST /api/v1/chat/personas
 * Get available personas
 */
router.get('/personas', (req: express.Request, res: express.Response) => {
  const personas = [
    { id: 'helpful-assistant', name: 'Helpful Assistant', description: 'Friendly and helpful' },
    { id: 'expert', name: 'Expert', description: 'Detailed and expert advice' },
    { id: 'creative', name: 'Creative', description: 'Creative and imaginative' },
    { id: 'teacher', name: 'Teacher', description: 'Patient and educational' },
    { id: 'professional', name: 'Professional', description: 'Business-focused' },
  ];

  res.json({
    success: true,
    personas,
  });
});

/**
 * DELETE /api/v1/chat/:conversationId
 * Delete a conversation
 */
router.delete('/:conversationId', (req: express.Request, res: express.Response) => {
  const { conversationId } = req.params;
  const deleted = conversations.delete(conversationId);

  res.json({
    success: deleted,
    message: deleted ? 'Conversation deleted' : 'Conversation not found',
  });
});

export default router;
