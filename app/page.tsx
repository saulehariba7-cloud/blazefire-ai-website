'use client';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="text-2xl font-bold">
            Teenx <span className="text-cyan-400">Generator</span>
          </div>

          <div className="hidden gap-6 md:flex text-sm text-slate-300">
            <a href="#tools">AI Tools</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
          </div>

          <button className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-slate-950">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            AI Creation Studio
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
            Create With
            <span className="block text-cyan-400">Teenx Generator</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Create images, videos, animations, characters and voice content
            with powerful AI tools in one place.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-xl bg-cyan-500 px-7 py-3 font-bold text-slate-950">
              Start Creating
            </button>

            <a
              href="#pricing"
              className="rounded-xl border border-white/20 px-7 py-3 font-semibold"
            >
              View Plans
            </a>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-bold">
            AI Creation Tools
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
            Your creative workspace for images, video, animation, characters
            and voice.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ['🖼️', 'Images', 'Create AI images from text prompts.'],
              ['🎬', '2D Video', 'Turn ideas into AI video concepts.'],
              ['✨', '3D Video', 'Create animated content with AI.'],
              ['👤', '4K Characters', 'Design realistic AI characters.'],
              ['🔊', 'Text to Videos', 'Convert text into voice content.'],
            ].map(([icon, title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="text-4xl">{icon}</div>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm text-slate-400">{description}</p>

                <button className="mt-6 w-full rounded-lg border border-cyan-400/30 px-4 py-2 text-sm text-cyan-300">
                  Open Tool
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl font-bold">Choose Your Plan</h2>

          <p className="mx-auto mt-4 max-w-xl text-center text-slate-400">
            Choose a plan for your AI creation needs.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Basic',
                price: '₹399',
                features: ['AI Image Creation', 'Basic generations', 'Personal workspace'],
              },
              {
                name: 'Standard',
                price: '₹599',
                features: ['More AI generations', 'Image & Video tools', 'Priority workspace'],
              },
              {
                name: 'Premium',
                price: '₹999',
                features: ['Advanced AI tools', 'Higher usage limits', 'Premium workspace'],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-8"
              >
                <h3 className="text-2xl font-bold">{plan.name}</h3>

                <div className="mt-5 text-4xl font-extrabold">
                  {plan.price}
                  <span className="text-sm font-normal text-slate-400">
                    /month
                  </span>
                </div>

                <ul className="mt-7 space-y-3 text-sm text-slate-300">
                  {plan.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>

                <button className="mt-8 w-full rounded-xl bg-cyan-500 px-5 py-3 font-bold text-slate-950">
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">One Creative AI Workspace</h2>

        <p className="mx-auto mt-5 max-w-2xl text-slate-400">
          Teenx Generator is designed as a single workspace for creative
          AI generation.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        © 2026 Teenx Generator. All rights reserved.
      </footer>
    </main>
  );
}
        
       
          
