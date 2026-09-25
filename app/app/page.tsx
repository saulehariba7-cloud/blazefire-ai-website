'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'image' | 'text-to-image' | 'writer' | 'pricing'>('image');
  
  // Image Generator States
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState(3);
  const [error, setError] = useState('');

  // AI Writer States
  const [topic, setTopic] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [writerLoading, setWriterLoading] = useState(false);
  const [writerError, setWriterError] = useState('');

  useEffect(() => {
    const savedCredits = localStorage.getItem('ai_credits');
    if (savedCredits !== null) {
      setCredits(parseInt(savedCredits));
    }
  }, []);

  // Handle Image Generation
  const handleGenerateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (credits <= 0) {
      setError('You have run out of your 3 free credits!');
      return;
    }
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      const res = await fetch('/api/generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (res.ok && data.imageUrl) {
        setImageUrl(data.imageUrl);
        const newCredits = credits - 1;
        setCredits(newCredits);
        localStorage.setItem('ai_credits', newCredits.toString());
      } else {
        setError(data.error || 'Failed to generate image.');
      }
    } catch (err) {
      console.error(err);
      setError('A technical error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle AI Content Writing
  const handleWriteContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setWriterLoading(true);
    setWriterError('');
    setGeneratedText('');

    try {
      const res = await fetch('/api/writer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      if (res.ok && data.content) {
        setGeneratedText(data.content);
      } else {
        setWriterError(data.error || 'Failed to generate content.');
      }
    } catch (err) {
      console.error(err);
      setWriterError('A technical error occurred. Please try again.');
    } finally {
      setWriterLoading(false);
    }
  };

  // Text-to-Speech (Speaker Feature for Audio)
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported on this browser.');
    }
  };

  return (
    <main className="min-h-screen bg-[#130826] text-white flex flex-col items-center p-4 md:p-8">
      {/* App Header */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center mb-8 bg-[#1f0d3d] border border-purple-500/30 p-5 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
            Teenx Generator
          </h1>
          <p className="text-purple-300 text-sm mt-1">Professional Watermark-Free HD AI Suite</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <div className="bg-purple-200 text-black px-4 py-2 rounded-full text-sm font-bold shadow-md">
            Free Credits: {credits} / 3
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => setActiveTab('image')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition cursor-pointer ${
            activeTab === 'image' ? 'bg-purple-300 text-black shadow-lg scale-105' : 'bg-[#251047] text-purple-200 hover:bg-[#32165f]'
          }`}
        >
          Image Generator
        </button>
        <button
          onClick={() => setActiveTab('text-to-image')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition cursor-pointer ${
            activeTab === 'text-to-image' ? 'bg-purple-300 text-black shadow-lg scale-105' : 'bg-[#251047] text-purple-200 hover:bg-[#32165f]'
          }`}
        >
          Text to Image
        </button>
        <button
          onClick={() => setActiveTab('writer')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition cursor-pointer ${
            activeTab === 'writer' ? 'bg-purple-300 text-black shadow-lg scale-105' : 'bg-[#251047] text-purple-200 hover:bg-[#32165f]'
          }`}
        >
          AI content 
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition cursor-pointer ${
            activeTab === 'pricing' ? 'bg-purple-300 text-black shadow-lg scale-105' : 'bg-[#251047] text-purple-200 hover:bg-[#32165f]'
          }`}
        >
          Pricing Plans
        </button>
      </div>

      {/* Tab 1 & 2: Image Generator / Text to Image */}
      {(activeTab === 'image' || activeTab === 'text-to-image') && (
        <div className="w-full max-w-2xl bg-[#1f0d3d] border border-purple-500/30 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-purple-200 mb-4">
            {activeTab === 'image' ? 'AI Image Generator' : 'Text to Image Studio'}
          </h2>

          <form onSubmit={handleGenerateImage} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Enter your prompt:
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Majestic mountain landscape at sunset, ultra realistic..."
                rows={3}
                className="w-full bg-purple-200 text-black placeholder-gray-700 font-medium border border-purple-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading || credits <= 0}
              className="w-full bg-purple-300 hover:bg-purple-200 text-black font-bold py-3 rounded-xl transition shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Generating HD Image...' : 'Generate HD Image (1 Credit)'}
            </button>
          </form>

          {/* Privacy Note */}
          <div className="mt-3 text-xs text-purple-300/80">
            Privacy: Teenx Generator does not save your prompts in browser history when you press Generate. Do not enter passwords, private keys or other sensitive data.
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-950 border border-red-500/40 text-red-300 rounded-xl text-sm">
              {error}
            </div>
          )}

          {imageUrl && (
            <div className="mt-6 space-y-4">
              <h3 className="text-md font-semibold text-purple-200">Your Watermark-Free HD Image:</h3>
              <div className="rounded-xl overflow-hidden border border-purple-500/40 bg-black flex justify-center shadow-xl">
                <img src={imageUrl} alt={prompt} className="w-full h-auto object-contain max-h-[450px]" />
              </div>
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-purple-300 hover:bg-purple-200 text-black py-2.5 rounded-xl font-bold transition shadow"
              >
                Download / View Full Size
              </a>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: AI Text Content Writer */}
      {activeTab === 'writer' && (
        <div className="w-full max-w-2xl bg-[#1f0d3d] border border-purple-500/30 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-purple-200 mb-4">AI Text Content Writer Generator</h2>
          <form onSubmit={handleWriteContent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                What do you want to write about? (Enter precise topic)
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Benefits of artificial intelligence in education..."
                className="w-full bg-purple-200 text-black placeholder-gray-700 font-medium border border-purple-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={writerLoading}
              className="w-full bg-purple-300 hover:bg-purple-200 text-black font-bold py-3 rounded-xl transition shadow-lg cursor-pointer"
            >
              {writerLoading ? 'Writing Content...' : 'Generate Content'}
            </button>
          </form>

          {/* Privacy Note */}
          <div className="mt-3 text-xs text-purple-300/80">
            Privacy: Teenx Generator does not save your prompts in browser history.
          </div>

          {writerError && (
            <div className="mt-4 p-3 bg-red-950 border border-red-500/40 text-red-300 rounded-xl text-sm">
              {writerError}
            </div>
          )}

          {generatedText && (
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold text-purple-200">Generated Content:</h3>
                {/* Speaker Audio Button */}
                <button
                  onClick={() => handleSpeak(generatedText)}
                  className="flex items-center gap-2 bg-purple-300 text-black px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-purple-200 transition cursor-pointer shadow"
                >
                 Speaker Listen Audio
                </button>
              </div>
              <div className="bg-purple-200 text-black p-4 rounded-xl font-medium whitespace-pre-wrap leading-relaxed shadow-inner">
                {generatedText}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Pricing Plans */}
      {activeTab === 'pricing' && (
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-purple-200 mb-6">Monthly Subscription Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Basic Plan */}
            <div className="bg-[#1f0d3d] border border-purple-500/40 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-purple-300 mb-2">Basic Plan</h3>
                <p className="text-purple-200 text-sm mb-4">Great for beginners and starters.</p>
                <div className="text-3xl font-extrabold text-white mb-1">
                  ₹199 <span className="text-sm font-normal text-purple-300">/ mo</span>
                </div>
                <div className="text-sm text-purple-400 mb-6 font-semibold">(Approx. $2.40 USD)</div>
                <ul className="space-y-2 text-sm text-purple-200 mb-6">
                  <li>✓ 100 AI Image Credits</li>
                  <li>✓ Standard AI Writer Access</li>
                  <li>✓ Watermark-Free HD Exports</li>
                </ul>
              </div>
              <button className="w-full bg-purple-300 hover:bg-purple-200 text-black font-bold py-2.5 rounded-xl transition shadow cursor-pointer">
                Choose Basic
              </button>
            </div>

            {/* Standard Plan */}
            <div className="bg-[#251047] border-2 border-purple-400 rounded-2xl p-6 shadow-2xl flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Popular
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-300 mb-2">Standard Plan</h3>
                <p className="text-purple-200 text-sm mb-4">Perfect for content creators & professionals.</p>
                <div className="text-3xl font-extrabold text-white mb-1">
                  ₹399 <span className="text-sm font-normal text-purple-300">/ mo</span>
                </div>
                <div className="text-sm text-purple-400 mb-6 font-semibold">(Approx. $4.80 USD)</div>
                <ul className="space-y-2 text-sm text-purple-200 mb-6">
                  <li>✓ 300 AI Image Credits</li>
                  <li>✓ Priority Generation Speed</li>
                  <li>✓ Advanced AI Writer Studio</li>
                  <li>✓ Watermark-Free HD Exports</li>
                </ul>
              </div>
              <button className="w-full bg-purple-300 hover:bg-purple-200 text-black font-bold py-2.5 rounded-xl transition shadow cursor-pointer">
                Choose Standard
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-[#1f0d3d] border border-purple-500/40 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-purple-300 mb-2">Premium Plan</h3>
                <p className="text-purple-200 text-sm mb-4">For heavy users and businesses.</p>
                <div className="text-3xl font-extrabold text-white mb-1">
                  ₹599 <span className="text-sm font-normal text-purple-300">/ mo</span>
                </div>
                <div className="text-sm text-purple-400 mb-6 font-semibold">(Approx. $7.20 USD)</div>
                <ul className="space-y-2 text-sm text-purple-200 mb-6">
                  <li>✓ Unlimited AI Credits</li>
                  <li>✓ Maximum Speed Priority</li>
                  <li>✓ Professional AI Content Writer</li>
                  <li>✓ Watermark-Free HD Exports</li>
                </ul>
              </div>
              <button className="w-full bg-purple-300 hover:bg-purple-200 text-black font-bold py-2.5 rounded-xl transition shadow cursor-pointer">
                Choose Premium
              </button>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}