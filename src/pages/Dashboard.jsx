import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-school-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard!</h1>
          <p className="text-gray-600 mb-8">
            You have successfully logged in. This is a placeholder dashboard page.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 bg-school-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Go to Home
            </Link>
            <Link
              to="/directory"
              className="px-6 py-3 bg-school-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              View Alumni Directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

