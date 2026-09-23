export default function Home() {
  return (
    <main className="min-h-screen bg-indigo-950 text-white p-6 sm:p-12 font-sans">
      
      {/* Top Navbar */}
      <nav className="max-w-6xl mx-auto flex justify-between items-center mb-16 pb-4 border-b border-white/10">
        <div className="text-2xl font-black text-teal-400">TEENX GENERATOR ⚡</div>
      </nav>

      {/* Hero Section */}
      <header className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-semibold">
          🎁 Launch Offer: 3 Free Videos & Images Included
        </div>
        <h1 className="text-5xl sm:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400">
          Teenx generator
        </h1>
        <p className="text-slate-300 text-lg">
          3D animations, videos, images aur audio speaker ke sath apna creative AI platform.
        </p>
      </header>

      {/* AI Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10">
          <h3 className="text-xl font-bold text-teal-300 mb-2">🎨 Image Generator</h3>
          <p className="text-sm text-slate-400 mb-6">High-quality AI images aur photos generate karein.</p>
          <button className="w-full py-2.5 bg-teal-500 text-slate-950 font-bold rounded-xl text-sm cursor-pointer">Generate Image</button>
        </div>
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10">
          <h3 className="text-xl font-bold text-emerald-400 mb-2">✨ 3D Animations & Videos</h3>
          <p className="text-sm text-slate-400 mb-6">Concepts ko immersive 3D videos mein badlein.</p>
          <button className="w-full py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-sm cursor-pointer">Create Video</button>
        </div>
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10">
          <h3 className="text-xl font-bold text-cyan-400 mb-2">🎙️ Audio Speaker</h3>
          <p className="text-sm text-slate-400 mb-6">Text ko natural human voiceovers mein convert karein.</p>
          <button className="w-full py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-xl text-sm cursor-pointer">Open Speaker</button>
        </div>
      </div>

      {/* Pricing Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-teal-400">Monthly Subscription Plans 💳</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-teal-300 mb-2">Basic Plan</h3>
              <div className="text-4xl font-black text-white mb-4">₹399 <span className="text-xs text-slate-400">/ month</span></div>
              <p className="text-sm text-slate-400 mb-6">Starter access to core AI tools.</p>
            </div>
            <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm cursor-pointer">Choose Basic</button>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/80 border-2 border-teal-400 flex flex-col justify-between relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-400 text-slate-950 text-xs font-extrabold px-4 py-1 rounded-full">POPULAR</span>
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2">Standard Plan</h3>
              <div className="text-4xl font-black text-white mb-4">₹599 <span className="text-xs text-slate-400">/ month</span></div>
              <p className="text-sm text-slate-400 mb-6">Advanced 3D animations and priority speed.</p>
            </div>
            <button className="w-full py-3 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold rounded-xl text-sm cursor-pointer">Choose Standard</button>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Premium Plan</h3>
              <div className="text-4xl font-black text-white mb-4">₹999 <span className="text-xs text-slate-400">/ month</span></div>
              <p className="text-sm text-slate-400 mb-6">Unrestricted full access to all studio tools.</p>
            </div>
            <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm cursor-pointer">Choose Premium</button>
          </div>

        </div>
      </section>

      <footer className="text-center text-xs text-slate-500 pt-8 border-t border-white/10">
        © 2026 Teenx generator. All rights reserved.
      </footer>
      
    </main>
  );
}