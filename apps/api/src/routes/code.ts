/**
 * Code Assistant Service
 * Debug code, generate code, and get programming help
 */

import express from 'express';
import { OpenAI } from 'openai';
import logger from '../utils/logger';

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * POST /api/v1/code/debug
 * Debug code and get suggestions
 */
router.post('/debug', async (req: express.Request, res: express.Response) => {
  try {
    const { code, language = 'javascript', error = '', context = '' } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const prompt = `
      Language: ${language}
      ${error ? `Error: ${error}` : ''}
      ${context ? `Context: ${context}` : ''}
      
      Please debug this code and provide:
      1. The root cause of the issue
      2. Suggested fixes
      3. Best practices to avoid this error
      4. Fixed code snippet
      
      Code:
      \`\`\`${language}
      ${code}
      \`\`\`
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert code debugger. Help developers fix their code and learn best practices.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const analysis = response.choices[0].message.content || '';

    logger.info(`Code debug analysis completed for ${language}`);

    res.json({
      success: true,
      analysis,
      language,
      usage: {
        promptTokens: response.usage?.prompt_tokens,
        completionTokens: response.usage?.completion_tokens,
      },
    });
  } catch (error) {
    logger.error('Error in code debug endpoint', error);
    res.status(500).json({
      error: 'Failed to analyze code',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/v1/code/generate
 * Generate code from description
 */
router.post('/generate', async (req: express.Request, res: express.Response) => {
  try {
    const { description, language = 'javascript', framework = '', requirements = '' } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const prompt = `
      Generate ${language} code for the following:
      ${framework ? `Framework: ${framework}` : ''}
      ${requirements ? `Requirements: ${requirements}` : ''}
      
      Description: ${description}
      
      Please provide:
      1. Well-commented code
      2. Error handling
      3. Best practices
      4. Brief explanation
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert code generator. Generate clean, well-commented, production-ready code.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 2048,
    });

    const code = response.choices[0].message.content || '';

    logger.info(`Code generated for ${language}`);

    res.json({
      success: true,
      code,
      language,
      usage: {
        promptTokens: response.usage?.prompt_tokens,
        completionTokens: response.usage?.completion_tokens,
      },
    });
  } catch (error) {
    logger.error('Error in code generation endpoint', error);
    res.status(500).json({
      error: 'Failed to generate code',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/v1/code/explain
 * Explain code
 */
router.post('/explain', async (req: express.Request, res: express.Response) => {
  try {
    const { code, language = 'javascript' } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert code explainer. Explain code in a clear, beginner-friendly way.',
        },
        {
          role: 'user',
          content: `Explain this ${language} code:\n\`\`\`${language}\n${code}\n\`\`\``,
        },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const explanation = response.choices[0].message.content || '';

    logger.info(`Code explanation provided for ${language}`);

    res.json({
      success: true,
      explanation,
      language,
    });
  } catch (error) {
    logger.error('Error in code explanation endpoint', error);
    res.status(500).json({
      error: 'Failed to explain code',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/v1/code/languages
 * Get supported languages
 */
router.get('/languages', (req: express.Request, res: express.Response) => {
  const languages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'csharp',
    'cpp',
    'go',
    'rust',
    'php',
    'ruby',
    'swift',
    'kotlin',
    'sql',
    'html',
    'css',
  ];

  res.json({
    success: true,
    languages,
    total: languages.length,
  });
});

export default router;
