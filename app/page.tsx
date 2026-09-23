export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Navigation / Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-200 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="text-2xl font-black text-indigo-600 tracking-tight">
          Teenx generator
        </div>
        <div className="space-x-6 hidden md:block text-sm font-semibold text-gray-700">
          <a href="#features" className="hover:text-indigo-600 transition">Features</a>
          <a href="#characters" className="hover:text-indigo-600 transition">3D Characters</a>
          <a href="#pricing" className="hover:text-indigo-600 transition">Pricing</a>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-indigo-700 transition shadow-sm">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-gradient-to-b from-indigo-50/60 to-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-black">
          Welcome to <span className="text-indigo-600">Teenx generator</span>
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-8 font-medium">
          Create stunning AI images, dynamic videos, immersive 3D animations, and realistic characters all in one platform.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-black text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition shadow-lg">
            Start Creating
          </button>
          <a href="#pricing" className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-50 transition flex items-center font-bold">
            View Plans
          </a>
        </div>
      </section>

      {/* Tools / Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-extrabold mb-3 text-center text-black">AI Power Tools</h2>
        <p className="text-gray-600 text-center mb-10 font-medium">Everything you need to bring your imagination to life.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl flex flex-col justify-between hover:border-indigo-600 hover:shadow-xl transition">
            <div>
              <div className="text-indigo-600 text-3xl mb-3">🎨</div>
              <h3 className="text-xl font-bold mb-2 text-black">Images</h3>
              <p className="text-gray-600 text-sm mb-4">Generate breathtaking visuals and graphics from text prompts.</p>
            </div>
            <button className="bg-indigo-50 text-indigo-700 text-sm py-2 rounded-lg hover:bg-indigo-100 transition font-bold">Open Tool</button>
          </div>

          <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl flex flex-col justify-between hover:border-indigo-600 hover:shadow-xl transition">
            <div>
              <div className="text-indigo-600 text-3xl mb-3">🎥</div>
              <h3 className="text-xl font-bold mb-2 text-black">Text to Video</h3>
              <p className="text-gray-600 text-sm mb-4">Transform your text scripts into cinematic video clips effortlessly.</p>
            </div>
            <button className="bg-indigo-50 text-indigo-700 text-sm py-2 rounded-lg hover:bg-indigo-100 transition font-bold">Open Tool</button>
          </div>

          <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl flex flex-col justify-between hover:border-indigo-600 hover:shadow-xl transition">
            <div>
              <div className="text-indigo-600 text-3xl mb-3">🧊</div>
              <h3 className="text-xl font-bold mb-2 text-black">3D Animation</h3>
              <p className="text-gray-600 text-sm mb-4">Produce immersive 3D animated sequences using advanced AI models.</p>
            </div>
            <button className="bg-indigo-50 text-indigo-700 text-sm py-2 rounded-lg hover:bg-indigo-100 transition font-bold">Open Tool</button>
          </div>

          <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl flex flex-col justify-between hover:border-indigo-600 hover:shadow-xl transition">
            <div>
              <div className="text-indigo-600 text-3xl mb-3">👤</div>
              <h3 className="text-xl font-bold mb-2 text-black">Characters</h3>
              <p className="text-gray-600 text-sm mb-4">Design unique, lifelike virtual characters with custom traits.</p>
            </div>
            <button className="bg-indigo-50 text-indigo-700 text-sm py-2 rounded-lg hover:bg-indigo-100 transition font-bold">Open Tool</button>
          </div>
        </div>
      </section>

      {/* 3D Characters Showcase Section */}
      <section id="characters" className="max-w-7xl mx-auto px-6 py-16 bg-indigo-50/40 rounded-3xl my-8">
        <h2 className="text-3xl font-extrabold mb-3 text-center text-black">Featured 3D Characters</h2>
        <p className="text-gray-600 text-center mb-10 font-medium">Explore high-quality 3D rendered avatars on your home page.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white border-2 border-indigo-100 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition">
            <div className="h-48 bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-5xl group-hover:scale-105 transition duration-300">
              🧊👩‍🎤
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg text-black">3D Cyber Aria</h4>
              <p className="text-xs text-indigo-600 font-semibold mt-1">Futuristic 3D Avatar</p>
            </div>
          </div>

          <div className="bg-white border-2 border-indigo-100 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition">
            <div className="h-48 bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-5xl group-hover:scale-105 transition duration-300">
              🧊🧙‍♂️
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg text-black">3D Mystic Orion</h4>
              <p className="text-xs text-indigo-600 font-semibold mt-1">Fantasy 3D Character</p>
            </div>
          </div>

          <div className="bg-white border-2 border-indigo-100 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition">
            <div className="h-48 bg-gradient-to-tr from-indigo-700 to-slate-900 flex items-center justify-center text-5xl group-hover:scale-105 transition duration-300">
              🧊🥷
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg text-black">3D Shadow Shinobi</h4>
              <p className="text-xs text-indigo-600 font-semibold mt-1">Stealth 3D Hero</p>
            </div>
          </div>

          <div className="bg-white border-2 border-indigo-100 rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition">
            <div className="h-48 bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-5xl group-hover:scale-105 transition duration-300">
              🧊🤖
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg text-black">3D Nova Bot</h4>
              <p className="text-xs text-indigo-600 font-semibold mt-1">Sci-Fi 3D Android</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Subscriptions Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-16 border-t border-gray-200">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-3 text-black">Monthly Subscription Plans</h2>
          <p className="text-gray-600 font-medium">Choose the perfect monthly plan for your creative journey on Teenx generator</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan (₹399) */}
          <div className="bg-white border-2 border-gray-200 p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-lg transition">
            <div>
              <h3 className="text-xl font-extrabold mb-2 text-black">Basic</h3>
              <p className="text-gray-600 text-sm mb-6 font-medium">Essential tools for beginners and creators.</p>
              <div className="text-4xl font-black mb-6 text-black">₹399<span className="text-sm font-semibold text-gray-500">/month</span></div>
              <ul className="space-y-3 text-sm text-gray-800 font-medium mb-8">
                <li>✓ 100 AI Image Generations</li>
                <li>✓ 10 Video Generations</li>
                <li>✓ Standard Support</li>
              </ul>
            </div>
            <button className="w-full bg-black text-white hover:bg-gray-800 py-3 rounded-xl font-bold transition shadow-md">
              Choose Basic
            </button>
          </div>

          {/* Standard Plan (₹599) */}
          <div className="bg-white border-2 border-indigo-600 p-8 rounded-3xl flex flex-col justify-between relative shadow-2xl scale-105">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm">
              Most Popular
            </div>
            <div>
              <h3 className="text-xl font-extrabold mb-2 text-black">Standard</h3>
              <p className="text-gray-600 text-sm mb-6 font-medium">For regular creators and growing projects.</p>
              <div className="text-4xl font-black mb-6 text-indigo-600">₹599<span className="text-sm font-semibold text-gray-500">/month</span></div>
              <ul className="space-y-3 text-sm text-gray-800 font-medium mb-8">
                <li>✓ 300 AI Image Generations</li>
                <li>✓ 30 Video & 3D Animations</li>
                <li>✓ Standard 3D Characters</li>
                <li>✓ Priority Support</li>
              </ul>
            </div>
            <button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 py-3 rounded-xl font-bold transition shadow-md">
              Choose Standard
            </button>
          </div>

          {/* Premium Plan (₹999) */}
          <div className="bg-white border-2 border-gray-200 p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-lg transition">
            <div>
              <h3 className="text-xl font-extrabold mb-2 text-black">Premium</h3>
              <p className="text-gray-600 text-sm mb-6 font-medium">Maximum power for professionals and power users.</p>
              <div className="text-4xl font-black mb-6 text-black">₹199<span className="text-sm font-semibold text-gray-500">/month</span></div>
              <ul className="space-y-3 text-sm text-gray-800 font-medium mb-8">
                <li>✓ Unlimited AI Images</li>
                <li>✓ Unlimited Videos & 3D Animations</li>
                <li>✓ Custom 3D Characters & Training</li>
                <li>✓ 24/7 Dedicated Support</li>
              </ul>
            </div>
            <button className="w-full bg-black text-white hover:bg-gray-800 py-3 rounded-xl font-bold transition shadow-md">
              Choose Premium
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 text-center text-gray-600 text-sm font-semibold bg-gray-50">
        <p>© 2026 Teenx generator. All rights reserved.</p>
      </footer>
    </main>
  );
}