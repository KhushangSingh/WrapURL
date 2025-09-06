import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UserUrl from '../components/UserUrl';
import ResultDisplay from '../components/ResultDisplay';
import { useSelector } from 'react-redux';

const DashboardPage = () => {
  const [result, setResult] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 pt-20 gap-8">
      
      <UrlForm onResult={setResult} />

      {result && <ResultDisplay result={result} />}
      
      {isAuthenticated && (
        <div className="w-full max-w-4xl">
          <UserUrl />
        </div>
      )}

    </div>
  );
};

export default DashboardPage;