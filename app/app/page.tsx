export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-20 font-sans bg-indigo-950 text-white">
      
      <div className="border border-white/20 p-8 rounded-2xl max-w-3xl text-center bg-indigo-900/40 backdrop-blur-sm shadow-xl space-y-8">
        
        {/* Header / Bio Section */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-teal-300 to-emerald-400">
            Hi, Main Hoon [Ariba] </h1>
          </h1>
          <p className="text-lg text-slate-300">
            Yeh meri personal AI website hai jise maine Next.js aur Tailwind CSS se banaya hai.
          </p>
        </div>

        {/* Tech Stack / Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="p-4 rounded-xl bg-indigo-950/60 border border-white/10">
            <h3 className="font-bold text-teal-300 mb-1">⚡ Modern Tech</h3>
            <p className="text-sm text-slate-300">Next.js App Router aur React par built hai.</p>
          </div>
          <div className="p-4 rounded-xl bg-indigo-950/60 border border-white/10">
            <h3 className="font-bold text-emerald-400 mb-1">🎨 Custom Design</h3>
            <p className="text-sm text-slate-300">Pure Tailwind CSS se fully responsive.</p>
          </div>
        </div>

        {/* My Project Section (Aapka Project Box) */}
        <div className="text-left bg-indigo-950/80 border border-white/10 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-teal-300 mb-2">🚀 My First Project</h3>
          <p className="text-slate-300 mb-4 text-sm">
            [Yahan apne project ke baare mein thoda likhein, jaise: AI Portfolio Website jo maine Next.js se banai hai.]
          </p>
          <a 
            href="#" 
            target="_blank"
            className="inline-block px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg text-sm transition"
          >
            View Project ↗
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a 
            href="https://github.com/apna-github-username" 
            target="_blank" 
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-white/20 rounded-lg text-sm font-medium transition"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/apna-linkedin-username" 
            target="_blank" 
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition"
          >
            LinkedIn
          </a>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-400 pt-4 border-t border-white/10">
          © 2026 My Personal Website. Built with Next.js & Vercel.
        </p>
        
      </div>
      
    </main>
  );
}