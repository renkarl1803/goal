'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function VideoGenerationPage() {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(5);
  const [fps, setFps] = useState(30);
  const [resolution, setResolution] = useState('720p');
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<any[]>([]);

  const generateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error('Enter a prompt');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/v1/generate/video`, {
        prompt,
        duration,
        fps,
        resolution,
      });

      setVideos(prev => [{
        id: response.data.videoId,
        prompt: response.data.prompt,
        keyframes: response.data.keyframes,
        timestamp: new Date().toLocaleTimeString(),
        status: response.data.status,
      }, ...prev]);

      toast.success('Video generation started!');
    } catch (error) {
      toast.error('Failed to generate video');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-2">🎬 Video Generation</h1>
        <p className="text-gray-300 mb-8">Create videos from text descriptions</p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 bg-white/10 rounded-xl p-6 border border-white/20 h-fit"
          >
            <form onSubmit={generateVideo} className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the video you want..."
                  className="w-full bg-white/10 text-white rounded-lg px-4 py-2 border border-white/20 focus:border-red-500 outline-none h-24 resize-none"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Duration: {duration}s</label>
                <input
                  type="range"
                  min="3"
                  max="30"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">FPS</label>
                <select value={fps} onChange={(e) => setFps(parseInt(e.target.value))} className="w-full bg-white/10 text-white rounded-lg px-4 py-2 border border-white/20" disabled={loading}>
                  <option value="24">24 FPS (Film)</option>
                  <option value="30">30 FPS (Video)</option>
                  <option value="60">60 FPS (Smooth)</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Resolution</label>
                <select value={resolution} onChange={(e) => setResolution(e.target.value)} className="w-full bg-white/10 text-white rounded-lg px-4 py-2 border border-white/20" disabled={loading}>
                  <option value="480p">480p</option>
                  <option value="720p">720p HD</option>
                  <option value="1080p">1080p Full HD</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 rounded-lg font-bold transition"
              >
                {loading ? 'Generating...' : '🎥 Generate Video'}
              </button>
            </form>
          </motion.div>

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            {videos.length === 0 ? (
              <div className="bg-white/10 rounded-xl p-12 border border-white/20 text-center">
                <div className="text-5xl mb-4">🎞️</div>
                <p className="text-gray-400">Generated videos will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {videos.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 rounded-xl overflow-hidden border border-white/20"
                  >
                    <div className="grid grid-cols-3 gap-2 p-4">
                      {video.keyframes.map((frame: any, idx: number) => (
                        <div key={idx} className="relative">
                          <img src={frame.url} alt={`Frame ${idx}`} className="w-full h-32 object-cover rounded" />
                          <div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded">Frame {idx + 1}</div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 pb-4">
                      <p className="text-white font-semibold mb-1">{video.prompt}</p>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{video.timestamp}</span>
                        <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded">{video.status}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
