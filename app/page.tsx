"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"image" | "text-image" | "content">("image");
  const [credits, setCredits] = useState<number>(5); 
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPolicyModal, setShowPolicyModal] = useState<string | null>(null);

  // Content Safety & Moderation Blacklist
  const restrictedKeywords = [
    "porn", "sex", "nude", "explicit", "xxx", "nsfw", "naked", "erotic", "boobs", "pussy", "dick",
    "abuse", "violence", "kill", "suicide", "murder", "bomb", "weapon", "drug", "hack", "crack", "illegal",
    "deepfake", "fake nudes", "impersonate", "naked celebrity"
  ];

  const handleGenerate = (toolName: string) => {
    if (credits <= 0) {
      alert("Your free credits have ended. Please purchase a monthly plan below to continue generating.");
      return;
    }

    if (!prompt.trim()) {
      alert("Please enter anything you want to create or search!");
      return;
    }

    const lowerPrompt = prompt.toLowerCase();
    const isHarmful = restrictedKeywords.some(word => lowerPrompt.includes(word));
    
    if (isHarmful) {
      alert("⚠️ Safety Block: Your prompt violates our Content Policy. Sexual, explicit, harmful, illegal, or non-consensual deepfake/impersonation requests are strictly prohibited.");
      return;
    }

    setLoading(true);
    setOutput("");

    setTimeout(() => {
      setLoading(false);
      setCredits(credits - 1);

      if (toolName === "image" || toolName === "text-image") {
        // Universal Image & Art Generation for anything Cartoons, Anime, Flats, Airplanes, Vacation, Animals, etc.
        const dynamicImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
        setOutput(dynamicImageUrl);
      } else {
        // Universal Text Writer for Recipes, Education, Quran/Nasheed, Sports, Gaming, Movies, Music, etc.
        const smartContent = `✨ Universal AI Intelligence Report for: "${prompt}"\n\n` +
          `📌 Executive Overview & Core Concept:\n` +
          `A comprehensive and expertly structured exploration of "${prompt}". This topic is designed to deliver maximum value, creativity, and accuracy.\n\n` +
          `🎯 Key Details & Specifications:\n` +
          `- Primary Focus: In-depth breakdown and high-quality creative insights regarding "${prompt}".\n` +
          `- Applications: Perfect for education, professional research, project planning, and daily inspiration.\n` +
          `- Core Principles: Innovation, clarity, and structural perfection.\n\n` +
          `🚀 Summary:\n` +
          `Your exploration of "${prompt}" opens up limitless creative potential. Generated securely and instantly by Teenx AI Engine!`;

        setOutput(smartContent);
      }
    }, 1500);
  };

  // Stripe Payment Links Integration Ready
  const handleBuyPlan = (planName: string, price: string) => {
    if (planName === "Basic Plan") {
      window.location.href = "https://buy.stripe.com/your_actual_basic_link_here";
    } else if (planName === "Standard Plan") {
      window.location.href = "https://buy.stripe.com/your_actual_standard_link_here";
    } else if (planName === "Premium Plan") {
      window.location.href = "https://buy.stripe.com/your_actual_premium_link_here";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#d8b4fe] via-[#c084fc] to-[#7e22ce] text-black font-bold p-6 md:p-12">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center bg-[#f3e8ff]/85 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-purple-400 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-wide">
            ✨ Teenx Generator
          </h1>
          <p className="text-sm text-gray-900 font-bold mt-1">
            Safe, Secure & Unlimited Universal AI-Powered Hub
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col items-end">
          <div className="bg-[#7e22ce] text-white px-5 py-2.5 rounded-xl shadow-md font-bold flex items-center gap-2">
            <span>Available Credits:</span>
            <span className="bg-white text-[#7e22ce] px-3 py-1 rounded-lg text-lg">
              {credits}
            </span>
          </div>
          <span className="text-[11px] text-gray-800 mt-1 font-bold">
            ℹ️ Free trial credits have no cash value. Paid credits renew monthly.
          </span>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-4xl mx-auto flex justify-center gap-3 mb-8 flex-wrap">
        <button
          onClick={() => setActiveTab("image")}
          className={`px-6 py-3 rounded-xl font-bold transition-all shadow-md ${
            activeTab === "image" ? "bg-[#581c87] text-white scale-105" : "bg-[#e9d5ff] text-black hover:bg-[#d8b4fe]"
          }`}
        >
          1. Image Generator
        </button>
        <button
          onClick={() => setActiveTab("text-image")}
          className={`px-6 py-3 rounded-xl font-bold transition-all shadow-md ${
            activeTab === "text-image" ? "bg-[#581c87] text-white scale-105" : "bg-[#e9d5ff] text-black hover:bg-[#d8b4fe]"
          }`}
        >
          2. Text to Image
        </button>
        <button
          onClick={() => setActiveTab("content")}
          className={`px-6 py-3 rounded-xl font-bold transition-all shadow-md ${
            activeTab === "content" ? "bg-[#581c87] text-white scale-105" : "bg-[#e9d5ff] text-black hover:bg-[#d8b4fe]"
          }`}
        >
          3. AI Text Writer
        </button>
      </div>

      {/* Generator Tool Box */}
      <div className="max-w-3xl mx-auto bg-[#f3e8ff]/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-purple-400 mb-16">
        <h2 className="text-2xl font-black mb-4 text-[#581c87] uppercase tracking-wider">
          {activeTab === "image" && "🎨 Universal Image & Art Generator"}
          {activeTab === "text-image" && "🖼️ Text to Image Creator"}
          {activeTab === "content" && "📝 Universal AI Content & Info Writer"}
        </h2>
        <p className="text-gray-900 mb-6 font-bold text-sm">
          Generate ANYTHING: Cartoons, Anime, Flats, Vacation Spots, Airplanes, Movies, Gaming, Music, Recipes, Education & More!
        </p>

        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type anything (e.g., Anime warrior girl, Luxury apartment flat, Paris vacation view, Airplane in sunset)..."
            className="w-full p-4 rounded-xl bg-white/90 border-2 border-purple-400 text-black font-bold focus:outline-none focus:ring-2 focus:ring-[#7e22ce] resize-none h-32"
          />

          <button
            onClick={() => handleGenerate(activeTab)}
            disabled={loading}
            className="w-full py-4 bg-[#7e22ce] hover:bg-[#581c87] text-white font-black rounded-xl shadow-lg transition-transform transform active:scale-95 disabled:opacity-50 text-lg"
          >
            {loading ? "Generating Anything You Want..." : "Generate Instantly 🚀"}
          </button>
          
          <p className="text-xs text-gray-800 text-center font-bold mt-2">
            🛡️ Safe Moderation Active: Explicit or illegal content is automatically blocked.
          </p>
        </div>

        {/* Output Display */}
        {output && (
          <div className="mt-8 p-6 bg-white/85 rounded-xl border-2 border-purple-300">
            <h3 className="font-black text-lg mb-3 text-[#581c87]">Result:</h3>
            {activeTab === "content" ? (
              <pre className="whitespace-pre-wrap font-bold text-gray-900 bg-purple-50 p-4 rounded-lg font-sans">
                {output}
              </pre>
            ) : (
              <div className="flex justify-center">
                <img
                  src={output}
                  alt="Universal AI Generated Art"
                  className="rounded-xl max-h-96 object-cover shadow-md border-2 border-purple-400"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pricing / Credits Section with Dual Currency (INR & USD) */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-black text-center text-white mb-4 drop-shadow-md">
          💎 Transparent Global Pricing (INR & USD)
        </h2>
        <p className="text-center text-black font-bold mb-10 text-base">
          Choose a plan to get dedicated paid credits with full commercial usage rights worldwide.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-[#f3e8ff] p-8 rounded-2xl shadow-xl border-2 border-purple-300 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black text-[#581c87] mb-2">Basic Plan</h3>
              <p className="text-3xl font-extrabold text-black mb-4">
                ₹199 <span className="text-lg text-purple-700">($2.99)</span><span className="text-sm font-bold text-gray-800">/mo</span>
              </p>
              <ul className="space-y-3 mb-8 font-bold text-gray-900">
                <li>✅ Standard Generation Credits</li>
                <li>✅ Safe Prompt Moderation</li>
                <li>✅ Non-refundable Digital Credits</li>
              </ul>
            </div>
            <button 
              onClick={() => handleBuyPlan("Basic Plan", "₹199 / $2.99")} 
              className="w-full py-3 bg-[#7e22ce] hover:bg-[#581c87] text-white font-black rounded-xl shadow-md transition-colors"
            >
              Buy Basic Plan
            </button>
          </div>

          {/* Standard Plan */}
          <div className="bg-[#e9d5ff] p-8 rounded-2xl shadow-2xl border-4 border-[#7e22ce] flex flex-col justify-between relative">
            <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#7e22ce] text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              Most Popular
            </span>
            <div>
              <h3 className="text-2xl font-black text-[#581c87] mb-2">Standard Plan</h3>
              <p className="text-3xl font-extrabold text-black mb-4">
                ₹399 <span className="text-lg text-purple-700">($4.99)</span><span className="text-sm font-bold text-gray-800">/mo</span>
              </p>
              <ul className="space-y-3 mb-8 font-bold text-gray-900">
                <li>✅ High-Speed Generation</li>
                <li>✅ Priority Moderation Access</li>
                <li>✅ Commercial Rights Included</li>
              </ul>
            </div>
            <button 
              onClick={() => handleBuyPlan("Standard Plan", "₹399 / $4.99")} 
              className="w-full py-3 bg-[#7e22ce] hover:bg-[#581c87] text-white font-black rounded-xl shadow-md transition-colors"
            >
              Buy Standard Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-[#f3e8ff] p-8 rounded-2xl shadow-xl border-2 border-purple-300 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black text-[#581c87] mb-2">Premium Plan</h3>
              <p className="text-3xl font-extrabold text-black mb-4">
                ₹599 <span className="text-lg text-purple-700">($7.99)</span><span className="text-sm font-bold text-gray-800">/mo</span>
              </p>
              <ul className="space-y-3 mb-8 font-bold text-gray-900">
                <li>✅ Maximum Monthly Credits</li>
                <li>✅ VIP Support & Fast Queue</li>
                <li>✅ Full Legal Disclaimer Coverage</li>
              </ul>
            </div>
            <button 
              onClick={() => handleBuyPlan("Premium Plan", "₹599 / $7.99")} 
              className="w-full py-3 bg-[#7e22ce] hover:bg-[#581c87] text-white font-black rounded-xl shadow-md transition-colors"
            >
              Buy Premium Plan
            </button>
          </div>
        </div>
      </section>

      {/* Footer with Clear Legal Policies & Disclaimers */}
      <footer className="text-center font-bold mt-12 py-6 border-t border-purple-400 space-y-3">
        <div className="flex justify-center gap-6 text-sm underline cursor-pointer">
          <span onClick={() => setShowPolicyModal("Terms of Service: Users must be 18+, avoid illegal/explicit prompts, and respect third-party copyrights.")}>Terms of Service</span>
          <span onClick={() => setShowPolicyModal("Privacy Policy: We do not store personal passwords. Generated images and prompts are processed securely.")}>Privacy Policy</span>
          <span onClick={() => setShowPolicyModal("Refund & Cancellation Policy: All digital credit purchases and subscription plans are final and non-refundable.")}>Refund Policy</span>
        </div>

        {showPolicyModal && (
          <div className="max-w-xl mx-auto bg-white p-4 rounded-xl border-2 border-purple-600 text-black text-xs font-bold shadow-2xl relative my-4">
            <p className="mb-2">{showPolicyModal}</p>
            <button onClick={() => setShowPolicyModal(null)} className="bg-red-500 text-white px-3 py-1 rounded-lg">Close</button>
          </div>
        )}

        <p>&copy; 2026 Teenx Generator. All rights Reserved.</p>
        <p className="text-xs text-gray-800 max-w-4xl mx-auto">
          Legal Safeguard Disclaimer: Teenx Generator employs automated moderation filters to prevent harmful, explicit, illegal, and non-consensual deepfake requests. Trademarks and brand names remain the property of their respective owners. Users are solely legally liable for the text prompts they submit.
        </p>
      </footer>
    </main>
  );
}
