const AuthLayout = ({ children, title, description }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Hero Image */}
            <div className="lg:w-1/2 bg-gradient-to-br from-school-blue via-blue-600 to-school-orange p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="2" />
                  <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="2" />
                  <circle cx="200" cy="200" r="50" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <div className="relative z-10 text-center text-white">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <span className="text-4xl font-bold">KSE</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Kakatiya School of Excellence</h2>
                <p className="text-blue-100 text-lg">
                  Connecting Alumni • Building Communities • Creating Impact
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="mb-8">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <div className="w-12 h-12 bg-school-blue rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">KSE</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 text-center lg:text-left mb-2">
                  {title}
                </h1>
                {description && (
                  <p className="text-gray-600 text-center lg:text-left">
                    {description}
                  </p>
                )}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

