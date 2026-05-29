'use client';

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ImageAnalysisPage() {
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState('describe');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setUploadedImage(imageData);
        setImageUrl(imageData);
        toast.success('📸 Image uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    let urlToAnalyze = imageUrl || uploadedImage;
    
    if (!urlToAnalyze) {
      toast.error('Please upload or paste an image URL');
      return;
    }

    setLoading(true);
    try {
      let response;

      if (analysisType === 'describe') {
        response = await axios.post(`${API_URL}/api/v1/images/describe`, {
          imageUrl: urlToAnalyze,
        });
        setResult(response.data.description);
      } else if (analysisType === 'ocr') {
        response = await axios.post(`${API_URL}/api/v1/images/ocr`, {
          imageUrl: urlToAnalyze,
        });
        setResult(response.data.extractedText);
      } else if (analysisType === 'custom') {
        response = await axios.post(`${API_URL}/api/v1/images/analyze`, {
          imageUrl: urlToAnalyze,
          prompt: customPrompt,
        });
        setResult(response.data.analysis);
      }

      toast.success('✅ Analysis complete!');
    } catch (error) {
      toast.error('Failed to analyze image');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-2">🖼️ Image Analysis</h1>
        <p className="text-gray-300 mb-8">Upload images and analyze them with AI vision</p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Upload & Options */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 bg-white/10 rounded-xl p-6 border border-white/20 h-fit space-y-4"
          >
            {/* Image Preview or Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition"
            >
              {uploadedImage ? (
                <img src={uploadedImage} alt="Uploaded" className="w-full rounded-lg" />
              ) : (
                <div>
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-gray-300">Click to upload image</p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Or paste URL */}
            <div>
              <label className="block text-white font-semibold mb-2">Or paste URL:</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-white/10 text-white rounded-lg px-4 py-2 border border-white/20 focus:border-blue-500 outline-none text-sm"
              />
            </div>

            {/* Analysis Type */}
            <div>
              <label className="block text-white font-semibold mb-2">Analysis Type:</label>
              <select
                value={analysisType}
                onChange={(e) => setAnalysisType(e.target.value)}
                className="w-full bg-white/10 text-white rounded-lg px-4 py-2 border border-white/20"
              >
                <option value="describe">📝 Describe Image</option>
                <option value="ocr">📄 Extract Text (OCR)</option>
                <option value="custom">🔍 Custom Analysis</option>
              </select>
            </div>

            {/* Custom Prompt */}
            {analysisType === 'custom' && (
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ask a custom question about the image..."
                className="w-full bg-white/10 text-white rounded-lg px-4 py-2 border border-white/20 focus:border-blue-500 outline-none h-24 resize-none"
              />
            )}

            {/* Analyze Button */}
            <button
              onClick={analyzeImage}
              disabled={loading || (!uploadedImage && !imageUrl)}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 rounded-lg font-bold transition"
            >
              {loading ? 'Analyzing...' : '🔍 Analyze'}
            </button>
          </motion.div>

          {/* Right Panel - Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            {result ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/10 rounded-xl p-6 border border-white/20"
              >
                <h2 className="text-2xl font-bold text-white mb-4">📊 Analysis Result</h2>
                <div className="bg-black/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <p className="text-gray-100 whitespace-pre-wrap leading-relaxed">
                    {result}
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                    toast.success('Copied to clipboard!');
                  }}
                  className="mt-4 w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-semibold transition"
                >
                  📋 Copy Result
                </button>
              </motion.div>
            ) : (
              <div className="bg-white/10 rounded-xl p-12 border border-white/20 text-center flex items-center justify-center h-full min-h-96">
                <div>
                  <div className="text-5xl mb-4">🖼️</div>
                  <p className="text-gray-400">
                    Upload an image and select analysis type to get started
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">✨ What Can You Do?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="text-white font-bold mb-2">Describe</h3>
              <p className="text-gray-300 text-sm">Get detailed descriptions of any image</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="text-3xl mb-2">📄</div>
              <h3 className="text-white font-bold mb-2">Extract Text</h3>
              <p className="text-gray-300 text-sm">Pull text from images (OCR)</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="text-3xl mb-2">🔍</div>
              <h3 className="text-white font-bold mb-2">Custom Analysis</h3>
              <p className="text-gray-300 text-sm">Ask custom questions about images</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
