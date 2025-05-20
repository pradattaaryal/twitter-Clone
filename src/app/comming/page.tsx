export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center px-6">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-10 max-w-xl text-center shadow-2xl animate-fade-in-up">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🚀 New Feature Coming Soon!
        </h1>
        <p className="text-gray-600 mb-6">
          We're working on something amazing. Stay tuned and be the first to know when we launch!
        </p>

        <form className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
          >
            Notify Me
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          We promise not to spam you. 💌
        </p>
      </div>
    </div>
  );
}
