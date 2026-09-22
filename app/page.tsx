'use client';export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-between p-8 sm:p-20 font-sans">
      {/* Hero Section */}
      <main className="flex flex-col items-center text-center max-w-2xl my-auto">
        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-950 text-cyan-500 border border-white/20 mb-6">
          🚀 Welcome to My Space
        </span>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-teal-300 to-emerald-400">
          Main Apni AI Website Bana Rahi Hu
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
          Yeh meri personal website hai jise maine Next.js, React aur Tailwind CSS ka use karke banaya hai.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 w-full text-left">
          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
            <h3 className="font-semibold text-lg text-blue-400">⚡ Modern Tech</h3>
            <p className="text-sm text-slate-400 mt-1">Next.js App Router aur React par built hai.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
            <h3 className="font-semibold text-lg text-emerald-400">🎨 Custom Design</h3>
            <p className="text-sm text-slate-400 mt-1">Pure Tailwind CSS se fully customized aur responsive.</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <button 
            onClick={() => alert("Welcome to my site!")}
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 font-medium transition-all duration-200 shadow-lg shadow-blue-500/30"
          >
            Click Me
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-slate-500 text-sm mt-12">
        © {new Date().getFullYear()} My Personal Website. Built with Next.js
      </footer>
    </div>
  );
}