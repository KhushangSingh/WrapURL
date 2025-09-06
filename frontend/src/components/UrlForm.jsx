import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { queryClient } from '../main'

const UrlForm = ({ onResult }) => {
  
  const [url, setUrl] = useState("")
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")
  const [loading, setLoading] = useState(false)
  const {isAuthenticated} = useSelector((state) => state.auth)

  const handleSubmit = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError(null);
    
    try{
      const result = await createShortUrl(url,customSlug)
      if (onResult) {
        onResult(result);
      }
      queryClient.invalidateQueries({queryKey: ['userUrls']})
    }catch(err){
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Shorten Your URL
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 rounded-md text-center">
            {error}
          </div>
        )}
        
        <div className="mb-6">
          <label htmlFor="url" className="block text-gray-300 text-sm font-bold mb-2">
            Enter your URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onInput={(event)=>setUrl(event.target.value)}
            placeholder="https://example.com"
            required
            className="shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 text-white bg-gray-900/50 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        
        {isAuthenticated && (
          <div className="mb-6">
            <label htmlFor="customSlug" className="block text-gray-300 text-sm font-bold mb-2">
              Custom URL (optional)
            </label>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(event) => setCustomSlug(event.target.value)}
              placeholder="e.g., my-awesome-link"
              className="shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 text-white bg-gray-900/50 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        )}
        
        <div className="flex items-center justify-center">
          <button
            onClick={handleSubmit}
            type="button"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-5 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UrlForm