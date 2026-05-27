import express from 'express';

const router = express.Router();

// All service routes
router.use('/chat', require('./chat'));
router.use('/generate', require('./generate'));
router.use('/code', require('./code'));
router.use('/voice', require('./voice'));
router.use('/ai', require('./ai'));

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
router.get('/', (req, res) => {
  res.json({
    name: 'Goal AI API - Multi-Feature AI Assistant',
    version: '0.1.0',
    tagline: 'Chat, Image Generation, Video Generation, Code Assistant, Voice',
    endpoints: {
      chat: {
        method: 'POST',
        path: '/api/v1/chat',
        description: 'Chat with AI, ask any questions'
      },
      image_generation: {
        method: 'POST',
        path: '/api/v1/generate/image',
        description: 'Generate images from text descriptions'
      },
      video_generation: {
        method: 'POST',
        path: '/api/v1/generate/video',
        description: 'Generate videos from descriptions or images'
      },
      code_assistant: {
        method: 'POST',
        path: '/api/v1/code/debug',
        description: 'Debug code and get suggestions'
      },
      code_generation: {
        method: 'POST',
        path: '/api/v1/code/generate',
        description: 'Generate code from descriptions'
      },
      text_to_speech: {
        method: 'POST',
        path: '/api/v1/voice/text-to-speech',
        description: 'Convert text to speech with AI voice'
      },
      speech_to_text: {
        method: 'POST',
        path: '/api/v1/voice/speech-to-text',
        description: 'Convert speech to text'
      }
    }
  });
});

export default router;
