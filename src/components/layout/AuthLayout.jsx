

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left content area (40%) */}
      <div className="w-[40%] flex flex-col items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right feature area (60%) */}
      <div className="w-[60%] bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center relative">
        {/* Single Point Text with Logo in Top Right */}
        <h2 className="text-2xl font-bold text-white flex items-center"> </h2>
        <div className="absolute top-8 right-8 flex items-center gap-2">
        Single  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Point</span>
              {/* Your logo will go here */}
              <img 
             src="https://blobcntainerinstacharter.blob.core.windows.net/instacharter-az-0125-container/Instacharter_Images/logo/image4.png"
              alt="SinglePoint Logo"
              className="h-8 w-auto object-contain"
             style={{
                 maxWidth: '180px',
                 marginTop: '20px',
              marginBottom: '20px'
        }}
      />
          
         
        </div>

        <div className="max-w-2xl text-center text-white p-12">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Design workflows
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 block mt-2">
              #withSinglePoint
            </span>
          </h1>
          <p className="text-xl mb-12 text-gray-300 leading-relaxed">
            From tasks and workflows to apps and systems, build and automate 
            anything in one powerful visual platform.
          </p>

          {/* Stats Section */}
          <div className="flex items-center justify-center space-x-12 text-gray-300">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                500K+
              </div>
              <div className="text-sm font-medium">Active Users</div>
            </div>
            <div className="h-8 w-px bg-gray-700/50"></div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Trusted
              </div>
              <div className="text-sm font-medium">Enterprise Platform</div>
            </div>
            <div className="h-8 w-px bg-gray-700/50"></div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                24/7
              </div>
              <div className="text-sm font-medium">Support</div>
            </div>
          </div>

          {/* Abstract Shape Background */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;