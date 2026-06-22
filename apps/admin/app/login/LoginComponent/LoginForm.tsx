export default function LoginForm() {
  return (
    <div className="w-1/2 flex items-center justify-center bg-white">
      <div className="w-[450px]">
        <h1 className="text-4xl font-bold mb-2">
          Admin Login
        </h1>

        <p className="text-gray-500 mb-8">
          Enter your credentials to continue
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="admin@glowdrape.com"
            className="w-full border border-gray-300 rounded-md p-3"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="********"
            className="w-full border border-gray-300 rounded-md p-3"
          />
        </div>

        {/* Remember Me */}
        <div className="flex justify-between items-center mb-8">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember Me
          </label>

          <a
            href="#"
            className="text-indigo-700 font-medium"
          >
            Forgot Password?
          </a>
        </div>

        {/* Button */}
        <button className="w-full bg-indigo-700 text-white py-3 rounded-md hover:bg-indigo-800">
          Login
        </button>
      </div>
    </div>
  );
}