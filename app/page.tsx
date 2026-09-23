export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">BlazeFire AI</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        
        {/* 1. Images Card */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Images</h3>
            <p className="text-gray-400 mb-4">Generate stunning AI images.</p>
          </div>
          <button className="bg-transparent border border-gray-600 px-4 py-2 rounded-lg w-full hover:bg-gray-800 transition">
            Open Tool
          </button>
        </div>

        {/* 2. Text to Video Card */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Text to Video</h3>
            <p className="text-gray-400 mb-4">Transform text into dynamic videos.</p>
          </div>
          <button className="bg-transparent border border-gray-600 px-4 py-2 rounded-lg w-full hover:bg-gray-800 transition">
            Open Tool
          </button>
        </div>

        {/* 3. 3D Animation Video Card */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">3D Animation Video</h3>
            <p className="text-gray-400 mb-4">Create animated content with AI.</p>
          </div>
          <button className="bg-transparent border border-gray-600 px-4 py-2 rounded-lg w-full hover:bg-gray-800 transition">
            Open Tool
          </button>
        </div>

        {/* 4. Characters Card */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Characters</h3>
            <p className="text-gray-400 mb-4">Design realistic AI characters.</p>
          </div>
          <button className="bg-transparent border border-gray-600 px-4 py-2 rounded-lg w-full hover:bg-gray-800 transition">
            Open Tool
          </button>
        </div>

      </div>
    </main>
  );
}