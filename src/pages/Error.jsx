import { Home, ArrowLeft, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Error({
  title = "Oops! Something went wrong",
  message = "The page you're looking for doesn't exist or has been moved.",
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Animated Error Icon */}
        <div className="mb-8 relative">
          <XCircle
            className="w-24 h-24 mx-auto text-red-500 animate-bounce"
            strokeWidth={1.5}
          />
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
        </div>

        {/* Error Number with Glitch Effect */}
        <div className="relative mb-4">
          <h1 className="text-8xl font-bold text-gray-800 animate-glitch">
            404
          </h1>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 animate-fadeIn">
          {title}
        </h2>
        <p className="text-gray-600 mb-8 animate-fadeIn">{message}</p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Link to={-1}>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 animate-fadeIn">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 animate-fadeIn"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
