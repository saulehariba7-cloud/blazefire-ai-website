"use client";

import { useState } from "react";

export default function Home() {
  // State management
  const [activeTab, setActiveTab] = useState<"image" | "text-image" | "content">("image");
  const [credits, setCredits] = useState<number>(3); // 3 Free credits to start
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle Generation Simulation
  const handleGenerate = (toolName: string) => {
    if (credits <= 0) {
      alert("Aapke free credits khatam ho gaye hain! Kripya neeche diye gaye plans mein se koi monthly plan kharidein.");
      return;
    }

    if (!prompt.trim()) {
      alert("Kripya kuch prompt ya text type karein!");
      return;
    }

    setLoading(true);
    setOutput("");

    setTimeout(() => {
      setLoading(false);
      setCredits(credits - 1);
      if (toolName === "image") {
        setOutput("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop");
      } else if (toolName === "text-image") {
        setOutput("https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop");
      } else {
        setOutput(`Generated Content for "${prompt}":\n\nTeenx Generator powered AI content:\n- Stunning ideas and engagement booster for your brand.\n- Optimized for maximum reach and creativity! ✨`);
      }
    }, 1500);
  };

  const handleBuyPlan = (planName: string, price: string) => {
    alert(`Aapne ${planName} (${price}) plan select kiya hai. Payment gateway integration yahan connect hoga!`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#d8b4fe] via-[#c084fc] to-[#7e22ce] text-black font-bold p-6 md:p-12">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center bg-[#f3e8ff]/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-purple-400 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-wide">
            ✨ Teenx Generator
          </h1>
          <p className="text-sm text-gray-900 font-bold mt-1">
            Your All-in-One AI Creative Hub
          </p>
        </div>
        <div className="mt-4 md:mt-0 bg-[#7e22ce] text-white px-5 py-2.5 rounded-xl shadow-md font-bold flex items-center gap-2">
          <span>Credits Remaining:</span>
          <span className="bg-white text-[#7e22ce] px-3 py-1 rounded-lg text-lg">
            {credits}
          </span>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-4xl mx-auto flex justify-center gap-3 mb-8 flex-wrap">
        <button
          onClick={() => setActiveTab("image")}
          className={`px-6 py-3 rounded-xl font-bold transition-all shadow-md ${
            activeTab === "image"
              ? "bg-[#581c87] text-white scale-105"
              : "bg-[#e9d5ff] text-black hover:bg-[#d8b4fe]"
          }`}
        >
          1. Image Generator (40 Credits Pool)
        </button>
        <button
          onClick={() => setActiveTab("text-image")}
          className={`px-6 py-3 rounded-xl font-bold transition-all shadow-md ${
            activeTab === "text-image"
              ? "bg-[#581c87] text-white scale-105"
              : "bg-[#e9d5ff] text-black hover:bg-[#d8b4fe]"
          }`}
        >
          2. Text to Image (50 Credits Pool)
        </button>
        <button
          onClick={() => setActiveTab("content")}
          className={`px-6 py-3 rounded-xl font-bold transition-all shadow-md ${
            activeTab === "content"
              ? "bg-[#581c87] text-white scale-105"
              : "bg-[#e9d5ff] text-black hover:bg-[#d8b4fe]"
          }`}
        >
          3. AI Text/Content (80 Credits Pool)
        </button>
      </div>

      {/* Generator Tool Box */}
      <div className="max-w-3xl mx-auto bg-[#f3e8ff]/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-purple-400 mb-16">
        <h2 className="text-2xl font-black mb-4 text-[#581c87] uppercase tracking-wider">
          {activeTab === "image" && "🎨 Image Generator Tool"}
          {activeTab === "text-image" && "🖼️ Text to Image Tool"}
          {activeTab === "content" && "✍️ AI Text Writer & Content Generator"}
        </h2>
        <p className="text-gray-900 mb-6 font-bold text-sm">
          "Get **3 Free Credits** to start with.Upgrade a monthly plan later for continoue access!"
        </p>

        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              activeTab === "content"
                ? "Enter topic or keywords for article/social media..."
                : "Describe what you want to create in detail..."
            }
            className="w-full p-4 rounded-xl bg-white/90 border-2 border-purple-400 text-black font-bold focus:outline-none focus:ring-2 focus:ring-[#7e22ce] resize-none h-32"
          />

          <button
            onClick={() => handleGenerate(activeTab)}
            disabled={loading}
            className="w-full py-4 bg-[#7e22ce] hover:bg-[#581c87] text-white font-black rounded-xl shadow-lg transition-transform transform active:scale-95 disabled:opacity-50 text-lg"
          >
            {loading ? "Generating Magic..." : "Generate Now 🚀"}
          </button>
        </div>

        {/* Output Display */}
        {output && (
          <div className="mt-8 p-6 bg-white/80 rounded-xl border-2 border-purple-300">
            <h3 className="font-black text-lg mb-3 text-[#581c87]">Result:</h3>
            {activeTab === "content" ? (
              <pre className="whitespace-pre-wrap font-bold text-gray-900 bg-purple-50 p-4 rounded-lg">
                {output}
              </pre>
            ) : (
              <div className="flex justify-center">
                <img
                  src={output}
                  alt="Generated AI Art"
                  className="rounded-xl max-h-80 object-cover shadow-md border-2 border-purple-400"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Monthly Subscription Plans Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-black text-center text-white mb-4 drop-shadow-md">
          💎 Choose Your Monthly Subscription Plan
        </h2>
        <p className="text-center text-black font-bold mb-10 text-base">
          Upgrade to unlock massive credits and non-stop AI generation power!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-[#f3e8ff] p-8 rounded-2xl shadow-xl border-2 border-purple-300 flex flex-col justify-between transform hover:-translate-y-2 transition-all">
            <div>
              <h3 className="text-2xl font-black text-[#581c87] mb-2">Basic Plan</h3>
              <p className="text-4xl font-extrabold text-black mb-4">
                ₹199<span className="text-sm font-bold text-gray-800">/month</span>
              </p>
              <ul className="space-y-3 mb-8 font-bold text-gray-900">
                <li>✅ Image Generator Access</li>
                <li>✅ Text to Image Included</li>
                <li>✅ AI Text Writer Included</li>
                <li>✅ Standard Generation Speed</li>
              </ul>
            </div>
            <button
              onClick={() => handleBuyPlan("Basic Plan", "₹199")}
              className="w-full py-3 bg-[#7e22ce] hover:bg-[#581c87] text-white font-black rounded-xl shadow-md transition-colors"
            >
              Buy Basic Plan
            </button>
          </div>

          {/* Standard Plan */}
          <div className="bg-[#e9d5ff] p-8 rounded-2xl shadow-2xl border-4 border-[#7e22ce] flex flex-col justify-between transform scale-105 relative">
            <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#7e22ce] text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
              Most Popular
            </span>
            <div>
              <h3 className="text-2xl font-black text-[#581c87] mb-2">Standard Plan</h3>
              <p className="text-4xl font-extrabold text-black mb-4">
                ₹399<span className="text-sm font-bold text-gray-800">/month</span>
              </p>
              <ul className="space-y-3 mb-8 font-bold text-gray-900">
                <li>✅ Higher Credit Limit</li>
                <li>✅ Priority Image & Text Generation</li>
                <li>✅ Advanced AI Writer Tools</li>
                <li>✅ Fast Support</li>
              </ul>
            </div>
            <button
              onClick={() => handleBuyPlan("Standard Plan", "₹399")}
              className="w-full py-3 bg-[#7e22ce] hover:bg-[#581c87] text-white font-black rounded-xl shadow-md transition-colors"
            >
              Buy Standard Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-[#f3e8ff] p-8 rounded-2xl shadow-xl border-2 border-purple-300 flex flex-col justify-between transform hover:-translate-y-2 transition-all">
            <div>
              <h3 className="text-2xl font-black text-[#581c87] mb-2">Premium Plan</h3>
              <p className="text-4xl font-extrabold text-black mb-4">
                ₹599<span className="text-sm font-bold text-gray-800">/month</span>
              </p>
              <ul className="space-y-3 mb-8 font-bold text-gray-900">
                <li>✅ Maximum Credits Pool</li>
                <li>✅ Ultra-Fast Turbo Generation</li>
                <li>✅ Unlimited Commercial License</li>
                <li>✅ 24/7 VIP Support</li>
              </ul>
            </div>
            <button
              onClick={() => handleBuyPlan("Premium Plan", "₹599")}
              className="w-full py-3 bg-[#7e22ce] hover:bg-[#581c87] text-white font-black rounded-xl shadow-md transition-colors"
            >
              Buy Premium Plan
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-black font-bold mt-12 py-6 border-t border-purple-400">
        <p>&copy; 2026 Teenx Generator. 
All rights Reserved.</p>
      </footer>
    </main>
  );
}
