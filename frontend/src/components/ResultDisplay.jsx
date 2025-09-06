import React, { useState } from 'react';

const ResultDisplay = ({ result }) => {
    const [copied, setCopied] = useState(false);

    if (!result || !result.shortUrl) {
        return null;
    }

    const handleCopy = () => {
        // Using document.execCommand for broader compatibility in restricted environments like iframes
        const el = document.createElement('textarea');
        el.value = result.shortUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <div className="text-gray-300 p-4 bg-gray-800/50 border border-gray-700 rounded-xl w-full max-w-lg flex items-center gap-4">
            
            <div className="flex-grow flex-shrink-0">
                <h3 className="text-md font-semibold mb-2 text-gray-200">Your shortened URL:</h3>
                <div className="flex items-center">
                    <input
                        type="text"
                        readOnly
                        value={result.shortUrl}
                        className="flex-1 p-2 border border-gray-600 rounded-l-md bg-gray-800 text-gray-300 focus:outline-none min-w-0"
                    />
                    <button
                        onClick={handleCopy}
                        className={`flex-shrink-0 inline-flex items-center justify-center w-24 px-4 py-2 rounded-r-md transition-all duration-300 border ${
                            copied 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 text-white'
                        }`}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>

            {result.message && (
                <div className="p-2 bg-blue-500/20 border border-blue-500 text-blue-300 rounded-md text-center text-xs">
                    {result.message}
                </div>
            )}
            
        </div>
    );
};

export default ResultDisplay;
