const AuthLayout = ({ children }) => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("../../public/singlePoint.jpg")',
      }}
    >
        {children}
      </div>
   
  );
};

export default AuthLayout;
