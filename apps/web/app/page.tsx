'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      await axios.post(`${API_URL}/api/v1/subscribe`, { email });
      setSubscribed(true);
      setEmail('');
      toast.success('✅ Thanks for subscribing!');
    } catch (error) {
      toast.error('Failed to subscribe');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="text-white font-bold text-xl">Pexy AI</span>
            <span className="text-green-400 text-xs font-bold ml-2 bg-green-500/20 px-2 py-1 rounded">
              FREE
            </span>
          </div>
          <div className="flex gap-4">
            <a
              href="/chat"
              className="text-white hover:text-blue-400 transition"
            >
              Try Now
            </a>
            <a
              href="#features"
              className="text-white hover:text-blue-400 transition"
            >
              Features
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-white mb-4">
            Your AI Co-Pilot
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Completely FREE
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            ✨ 6 AI Tools • 100% Free • No Limits • No Credit Card Required ✨
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <a
              href="/chat"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-lg font-bold transition text-lg"
            >
              🚀 Start Using Free
            </a>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView()}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition text-lg"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-20">
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <p className="text-3xl font-bold text-green-400">∞</p>
              <p className="text-gray-300 text-sm">Unlimited Usage</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <p className="text-3xl font-bold text-purple-400">$0</p>
              <p className="text-gray-300 text-sm">Forever Free</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <p className="text-3xl font-bold text-cyan-400">6</p>
              <p className="text-gray-300 text-sm">AI Tools</p>
            </div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-xl p-12 border border-white/20 backdrop-blur"
          >
            <div className="text-center">
              <p className="text-gray-300 mb-4">💬 Chat • 🎨 Images • 🎬 Videos • 🔧 Code • 🎤 Voice • 🖼️ Analysis</p>
              <p className="text-2xl font-bold text-white">All in One Platform</p>
              <p className="text-green-400 mt-2">✨ 100% FREE ✨</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          6 Powerful AI Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: '💬',
              title: 'AI Chat',
              desc: 'Chat with AI using text, voice, or images. 5 personas to choose from.',
            },
            {
              icon: '🎨',
              title: 'Image Generation',
              desc: 'Create stunning images from text descriptions with DALL-E 3.',
            },
            {
              icon: '🎬',
              title: 'Video Generation',
              desc: 'Generate videos from text descriptions.',
            },
            {
              icon: '🔧',
              title: 'Code Assistant',
              desc: 'Debug, generate, and explain code in 15+ languages.',
            },
            {
              icon: '🎤',
              title: 'Voice AI',
              desc: 'Convert text to natural-sounding speech with 6 voices.',
            },
            {
              icon: '🖼️',
              title: 'Image Analysis',
              desc: 'Describe images, extract text (OCR), and ask custom questions.',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 rounded-xl p-6 border border-white/20 hover:border-cyan-500/50 transition"
            >
              <p className="text-4xl mb-4">{feature.icon}</p>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Simple Pricing
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/10 rounded-xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
            <p className="text-gray-300 mb-4">Forever free, always.</p>
            <p className="text-4xl font-bold text-white mb-6">$0</p>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li>✅ All 6 AI features</li>
              <li>✅ Unlimited usage</li>
              <li>✅ No credit card</li>
              <li>✅ Community support</li>
              <li>✅ Mobile & desktop</li>
              <li>✅ Cross-browser</li>
            </ul>
            <a
              href="/chat"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-lg font-bold transition block text-center"
            >
              Start Using Free
            </a>
          </motion.div>

          {/* Premium Plan (Coming Soon) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/10 rounded-xl p-8 border border-purple-500/50 relative"
          >
            <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              Coming Soon
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
            <p className="text-gray-300 mb-4">Advanced features & priority support.</p>
            <p className="text-4xl font-bold text-white mb-6">$9.99<span className="text-lg">/mo</span></p>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li>✅ Everything in Free</li>
              <li>✅ Priority support</li>
              <li>✅ Faster responses</li>
              <li>✅ Advanced models</li>
              <li>✅ API access</li>
              <li>✅ Custom integrations</li>
            </ul>
            <button
              disabled
              className="w-full bg-gray-600 text-white py-3 rounded-lg font-bold cursor-not-allowed"
            >
              Coming Soon
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to Try?</h2>
        <p className="text-gray-300 mb-8 text-lg">
          Start using Pexy AI now. No signup. No credit card. No limits.
        </p>
        <a
          href="/chat"
          className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-12 py-4 rounded-lg font-bold transition text-lg"
        >
          🚀 Try Pexy AI Free
        </a>
      </section>

      {/* Newsletter */}
      <section className="bg-white/5 backdrop-blur border-t border-white/10">
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-6">Get notified about new features and updates</p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 focus:border-blue-500 outline-none placeholder-gray-400"
            />
            <button
              onClick={handleSubscribe}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition"
            >
              Subscribe
            </button>
          </div>
          {subscribed && (
            <p className="text-green-400 mt-3">✅ Thanks for subscribing!</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400 text-sm">
          <p>© 2026 Pexy AI. 100% Free. All rights reserved.</p>
          <p className="mt-2 text-green-400">✨ Completely Free. Forever. No Limits. ✨</p>
        </div>
      </footer>
    </div>
  );
}
