export default function Home() {
  return (
    <main className="min-h-screen bg-indigo-950 text-white p-6 sm:p-12 font-sans">
      
      {/* Top Header / Brand Name */}
      <header className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400">
          Teenx generator 🚀
        </h1>
        <p className="text-slate-300 text-lg">
          Apka apna Advanced AI Creative Platform - 3D Animations, Videos, Photos, aur Audio Speaker. Shuru karein 3 free videos aur image generation ke sath!
        </p>
      </header>

      {/* AI Tools Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
        
        {/* Tool 1: Image Generator */}
        <div className="p-6 rounded-2xl bg-indigo-900/40 border border-white/10 backdrop-blur-sm shadow-xl hover:border-teal-400/50 transition">
          <h3 className="text-xl font-bold text-teal-300 mb-2">🎨 Image Generator</h3>
          <p className="text-sm text-slate-300 mb-6">Text prompts se high-quality AI photos aur images turant generate karein.</p>
          <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-black font-semibold rounded-lg text-sm transition cursor-pointer">
            Generate Free Image ↗
          </button>
        </div>

        {/* Tool 2: 3D Animations & Videos */}
        <div className="p-6 rounded-2xl bg-indigo-900/40 border border-white/10 backdrop-blur-sm shadow-xl hover:border-emerald-400/50 transition">
          <h3 className="text-xl font-bold text-emerald-400 mb-2">✨ 3D Animations & Videos</h3>
          <p className="text-sm text-slate-300 mb-6">Static images aur creative concepts ko immersive 3D videos mein badlein.</p>
          <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg text-sm transition cursor-pointer">
            Create Video ↗
          </button>
        </div>

        {/* Tool 3: Audio Speaker */}
        <div className="p-6 rounded-2xl bg-indigo-900/40 border border-white/10 backdrop-blur-sm shadow-xl hover:border-cyan-400/50 transition">
          <h3 className="text-xl font-bold text-cyan-400 mb-2">🎙️ Audio Speaker Studio</h3>
          <p className="text-sm text-slate-300 mb-6">Text ko lifelike audio voiceovers mein convert karein jo bilkul real bolte hain.</p>
          <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg text-sm transition cursor-pointer">
            Try Audio Speaker ↗
          </button>
        </div>

        {/* Free Offer Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-900/60 to-emerald-900/60 border border-teal-400/30 backdrop-blur-sm shadow-xl md:col-span-2 lg:col-span-3 text-center">
          <h3 className="text-2xl font-bold text-teal-300 mb-2">🎁 Special Launch Offer: 3 Free Videos & Image Generator</h3>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Naye users ke liye 3 free videos aur image generations bilkul muft uplabdh hain. Abhi signup karke try karein!
          </p>
        </div>

      </div>

      {/* Pricing Plans Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
          Monthly Subscription Plans 💳
        </h2>
        <p className="text-center text-slate-400 mb-10 text-sm">Apne business aur creative needs ke liye best plan chunein.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Basic Plan */}
          <div className="p-8 rounded-2xl bg-indigo-900/40 border border-white/10 backdrop-blur-sm shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-teal-300 mb-2">Basic Plan</h3>
              <p className="text-3xl font-extrabold text-white mb-4">₹399 <span className="text-sm font-normal text-slate-300">/ month</span></p>
              <p className="text-sm text-slate-300 mb-6">Starter access to core image and video tools with standard limits.</p>
            </div>
            <button className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-black font-semibold rounded-lg text-sm transition cursor-pointer">
              Get Basic
            </button>
          </div>

          {/* Standard Plan */}
          <div className="p-8 rounded-2xl bg-indigo-900/60 border-2 border-teal-400 backdrop-blur-sm shadow-2xl flex flex-col justify-between relative">
            <span className="absolute -top-3 right-6 bg-teal-400 text-black text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
            <div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-2">Standard Plan</h3>
              <p className="text-3xl font-extrabold text-white mb-4">₹599 <span className="text-sm font-normal text-slate-300">/ month</span></p>
              <p className="text-sm text-slate-300 mb-6">Advanced 3D animations, priority generation, and expanded storage.</p>
            </div>
            <button className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg text-sm transition cursor-pointer">
              Get Standard
            </button>
          </div>

          {/* Premium Plan */}
          <div className="p-8 rounded-2xl bg-indigo-900/40 border border-white/10 backdrop-blur-sm shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">Premium Plan</h3>
              <p className="text-3xl font-extrabold text-white mb-4">₹999 <span className="text-sm font-normal text-slate-300">/ month</span></p>
              <p className="text-sm text-slate-300 mb-6">Unrestricted unlimited access to all AI tools, speaker studio, and 3D videos.</p>
            </div>
            <button className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg text-sm transition cursor-pointer">
              Get Premium
            </button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 pt-6 border-t border-white/10">
        © 2026 Teenx generator. All rights reserved. Built for creators & advertising.
      </footer>
      
    </main>
  );
}