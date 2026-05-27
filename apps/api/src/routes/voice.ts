/**
 * Voice Service
 * Text-to-speech and speech-to-text capabilities
 */

import express from 'express';
import { OpenAI } from 'openai';
import logger from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/**
 * POST /api/v1/voice/text-to-speech
 * Convert text to speech with AI voice
 */
router.post('/text-to-speech', async (req: express.Request, res: express.Response) => {
  try {
    const { text, voice = 'alloy', speed = 1.0 } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const validVoices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];
    if (!validVoices.includes(voice)) {
      return res.status(400).json({ error: `Invalid voice. Must be one of: ${validVoices.join(', ')}` });
    }

    // Generate speech using OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice as 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer',
      input: text,
      speed,
    });

    // Save audio to file
    const audioId = uuidv4();
    const audioPath = path.join(uploadsDir, `${audioId}.mp3`);
    const buffer = Buffer.from(await mp3.arrayBuffer());
    fs.writeFileSync(audioPath, buffer);

    logger.info(`Text-to-speech generated: ${audioId}`);

    res.json({
      success: true,
      audioId,
      audioUrl: `/uploads/${audioId}.mp3`,
      text,
      voice,
      speed,
      duration: `${Math.ceil(text.length / 10)} seconds (estimated)`,
    });
  } catch (error) {
    logger.error('Error in text-to-speech endpoint', error);
    res.status(500).json({
      error: 'Failed to generate speech',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/v1/voice/speech-to-text
 * Convert speech to text using Whisper
 */
router.post('/speech-to-text', async (req: express.Request, res: express.Response) => {
  try {
    // Note: This requires file upload handling
    // For MVP, we'll document the endpoint
    res.json({
      success: true,
      message: 'Speech-to-text endpoint. Send audio file as multipart/form-data',
      usage: 'POST /api/v1/voice/speech-to-text with audio file',
      supportedFormats: ['mp3', 'wav', 'flac', 'm4a'],
    });
  } catch (error) {
    logger.error('Error in speech-to-text endpoint', error);
    res.status(500).json({
      error: 'Failed to transcribe speech',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/v1/voice/voices
 * Get available voices
 */
router.get('/voices', (req: express.Request, res: express.Response) => {
  const voices = [
    {
      id: 'alloy',
      name: 'Alloy',
      description: 'Clear, neutral voice',
      gender: 'neutral'
    },
    {
      id: 'echo',
      name: 'Echo',
      description: 'Warm, friendly voice',
      gender: 'male'
    },
    {
      id: 'fable',
      name: 'Fable',
      description: 'Storytelling voice',
      gender: 'male'
    },
    {
      id: 'onyx',
      name: 'Onyx',
      description: 'Deep, rich voice',
      gender: 'male'
    },
    {
      id: 'nova',
      name: 'Nova',
      description: 'Bright, energetic voice',
      gender: 'female'
    },
    {
      id: 'shimmer',
      name: 'Shimmer',
      description: 'Smooth, professional voice',
      gender: 'female'
    },
  ];

  res.json({
    success: true,
    voices,
    total: voices.length,
  });
});

/**
 * POST /api/v1/voice/read-chat
 * Read chat message with voice
 */
router.post('/read-chat', async (req: express.Request, res: express.Response) => {
  try {
    const { message, voice = 'nova', speed = 1.0 } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const mp3 = await openai.audio.speech.create({
      model: 'tts-1-hd', // High quality for chat
      voice: voice as 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer',
      input: message,
      speed,
    });

    const audioId = uuidv4();
    const audioPath = path.join(uploadsDir, `${audioId}.mp3`);
    const buffer = Buffer.from(await mp3.arrayBuffer());
    fs.writeFileSync(audioPath, buffer);

    logger.info(`Chat message read aloud: ${audioId}`);

    res.json({
      success: true,
      audioId,
      audioUrl: `/uploads/${audioId}.mp3`,
      message,
      voice,
    });
  } catch (error) {
    logger.error('Error in read-chat endpoint', error);
    res.status(500).json({
      error: 'Failed to generate voice',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
