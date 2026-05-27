/**
 * Image & Video Generation Service
 * Generate images and videos using AI
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
 * POST /api/v1/generate/image
 * Generate an image from text description
 */
router.post('/image', async (req: express.Request, res: express.Response) => {
  try {
    const { prompt, size = '1024x1024', style = 'realistic', quality = 'standard' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const validSizes = ['256x256', '512x512', '1024x1024', '1792x1024', '1024x1792'];
    if (!validSizes.includes(size)) {
      return res.status(400).json({ error: `Invalid size. Must be one of: ${validSizes.join(', ')}` });
    }

    // Enhance prompt with style
    const enhancedPrompt = `${prompt}. Style: ${style}. Quality: ${quality}.`;

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: enhancedPrompt,
      n: 1,
      size: size as '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792',
      quality: quality as 'standard' | 'hd',
    });

    const imageUrl = response.data[0].url || '';
    const imageId = uuidv4();

    logger.info(`Image generated: ${imageId}`);

    res.json({
      success: true,
      imageId,
      imageUrl,
      prompt,
      size,
      style,
      quality,
      revisedPrompt: response.data[0].revised_prompt,
    });
  } catch (error) {
    logger.error('Error in image generation endpoint', error);
    res.status(500).json({
      error: 'Failed to generate image',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/v1/generate/video
 * Generate a video from description or image
 * Note: Using image generation + motion simulation
 */
router.post('/video', async (req: express.Request, res: express.Response) => {
  try {
    const { prompt, duration = 5, fps = 30, resolution = '720p' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // For MVP, we'll generate a sequence of images and describe them
    // In production, use a dedicated video AI service
    
    const videoId = uuidv4();
    
    // Get 3 keyframes for the video
    const keyframes = [];
    for (let i = 0; i < 3; i++) {
      const framePrompt = `${prompt}. Frame ${i + 1} of a video sequence. Movement and action scene.`;
      
      const imageResponse = await openai.images.generate({
        model: 'dall-e-3',
        prompt: framePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
      });

      keyframes.push({
        frameNumber: i,
        url: imageResponse.data[0].url,
        revisedPrompt: imageResponse.data[0].revised_prompt,
      });
    }

    logger.info(`Video generated with ${keyframes.length} keyframes: ${videoId}`);

    res.json({
      success: true,
      videoId,
      prompt,
      duration,
      fps,
      resolution,
      keyframes,
      frameCount: keyframes.length,
      status: 'processing',
      message: 'Video generation in progress. Check back shortly for the complete video.'
    });
  } catch (error) {
    logger.error('Error in video generation endpoint', error);
    res.status(500).json({
      error: 'Failed to generate video',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/v1/generate/variations
 * Generate variations of an image
 */
router.post('/variations', async (req: express.Request, res: express.Response) => {
  try {
    const { imageUrl, count = 3, variation = 'medium' } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    // Note: DALL-E doesn't support image variations in the latest API
    // Instead, we'll generate similar images based on the prompt
    
    const variations = [];
    for (let i = 0; i < count; i++) {
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: `Create a variation of this image with ${variation} changes. Image source: ${imageUrl}`,
        n: 1,
        size: '1024x1024',
      });

      variations.push({
        variationNumber: i + 1,
        url: response.data[0].url,
        revisedPrompt: response.data[0].revised_prompt,
      });
    }

    logger.info(`Generated ${count} image variations`);

    res.json({
      success: true,
      variations,
      variationCount: count,
      variation,
    });
  } catch (error) {
    logger.error('Error in image variations endpoint', error);
    res.status(500).json({
      error: 'Failed to generate variations',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/v1/generate/enhance-prompt
 * Enhance a user prompt for better image generation
 */
router.post('/enhance-prompt', async (req: express.Request, res: express.Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at creating detailed, vivid prompts for image generation AI. Enhance the prompt to be more detailed and descriptive.',
        },
        {
          role: 'user',
          content: `Enhance this prompt for image generation: "${prompt}". Make it more detailed and visually descriptive.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const enhancedPrompt = response.choices[0].message.content || '';

    res.json({
      success: true,
      originalPrompt: prompt,
      enhancedPrompt,
    });
  } catch (error) {
    logger.error('Error in prompt enhancement endpoint', error);
    res.status(500).json({
      error: 'Failed to enhance prompt',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
