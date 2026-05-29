'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  audioUrl?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState('');
  const [persona, setPersona] = useState('helpful-assistant');
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Start voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await transcribeAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast.success('🎤 Recording started...');
    } catch (error) {
      toast.error('Unable to access microphone');
      console.error(error);
    }
  };

  // Stop voice recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success('🎤 Recording stopped...');
    }
  };

  // Transcribe audio to text
  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'voice-message.wav');

      const response = await axios.post(
        `${API_URL}/api/v1/voice/speech-to-text`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      const transcribedText = response.data.text;
      setInput(transcribedText);
      toast.success('✅ Voice transcribed!');
    } catch (error) {
      toast.error('Failed to transcribe voice');
      console.error(error);
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setUploadedImage(imageData);
        toast.success('📸 Image uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Send text message with optional image
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() && !uploadedImage) {
      toast.error('Enter a message or upload an image');
      return;
    }

    const userMessage = input || '(Image attached)';
    setInput('');
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: userMessage,
        imageUrl: uploadedImage || undefined,
      },
    ]);
    setUploadedImage(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/v1/chat`, {
        message: userMessage,
        conversationId,
        persona,
        imageUrl: uploadedImage || undefined,
      });

      if (!conversationId && response.data.conversationId) {
        setConversationId(response.data.conversationId);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.data.response,
        },
      ]);
    } catch (error) {
      toast.error('Failed to send message');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-md border-b border-white/10 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-2">💬 AI Chat Assistant</h1>
          <div className="flex gap-2 flex-wrap">
            <label className="text-sm text-gray-300">Choose Persona:</label>
            <select
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              className="bg-white/10 text-white rounded px-2 py-1 text-sm border border-white/20"
            >
              <option value="helpful-assistant">Helpful Assistant</option>
              <option value="expert">Expert</option>
              <option value="creative">Creative</option>
              <option value="teacher">Teacher</option>
              <option value="professional">Professional</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="max-w-4xl mx-auto w-full">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center text-center"
            >
              <div>
                <div className="text-6xl mb-4">💬</div>
                <p className="text-gray-400">Start a conversation with Pexy AI</p>
                <p className="text-gray-500 text-sm mt-2">Chat with text, voice, or images!</p>
              </div>
            </motion.div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl px-4 py-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/10 text-gray-100 border border-white/20'
                  }`}
                >
                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt="User uploaded"
                      className="max-w-xs rounded mb-2"
                    />
                  )}
                  <ReactMarkdown className="prose prose-invert max-w-none">
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </motion.div>
            ))
          )}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white/10 px-4 py-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-black/30 backdrop-blur-md border-t border-white/10 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Image Preview */}
          {uploadedImage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 relative w-fit"
            >
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="h-20 w-20 rounded-lg object-cover"
              />
              <button
                onClick={() => setUploadedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition"
              >
                ✕
              </button>
            </motion.div>
          )}

          <form onSubmit={sendMessage} className="flex gap-2">
            {/* File upload for image */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-3 rounded-lg font-semibold transition"
              title="Upload image"
            >
              📸
            </button>

            {/* Voice recording button */}
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white px-3 py-3 rounded-lg font-semibold transition animate-pulse`}
              title={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isRecording ? '🎤 Stop' : '🎤'}
            </button>

            {/* Text input */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything... or use voice/image!"
              className="flex-1 bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-blue-500 outline-none placeholder-gray-400"
              disabled={loading}
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={loading || (!input.trim() && !uploadedImage)}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Send
            </button>
          </form>

          {/* Recording status */}
          {isRecording && (
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mt-2 text-red-400 text-sm flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              Recording... Click Stop to finish
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
