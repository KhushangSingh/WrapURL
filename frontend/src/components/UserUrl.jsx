import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'
import { deleteShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'

const UserUrl = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds to update click counts
    staleTime: 0, // Consider data stale immediately so it refetches when invalidated
    retry: 1, // Only retry once to avoid unnecessary API calls
    // Only run the query if user is authenticated
    enabled: isAuthenticated,
    // Don't show errors automatically - only when user interacts
    retryOnWindowFocus: false,
    retryOnMount: false,
    // Don't throw errors for empty responses
    throwOnError: false,
  })
  
  const deleteMutation = useMutation({
    mutationFn: deleteShortUrl,
    onSuccess: () => {
      queryClient.invalidateQueries(['userUrls']);
      setUrlToDelete(null);
    },
  });

  const [copiedId, setCopiedId] = useState(null)
  const [urlToDelete, setUrlToDelete] = useState(null);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    
    // Reset the copied state after 1 second
    setTimeout(() => {
      setCopiedId(null)
    }, 1000)
  }

  const handleDeleteClick = (id) => {
    setUrlToDelete(id);
  };

  const confirmDelete = () => {
    if (urlToDelete) {
      deleteMutation.mutate(urlToDelete);
    }
  };

  const cancelDelete = () => {
    setUrlToDelete(null);
  };

  // Don't show anything if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Check if urls data exists and has the expected structure
  if (!urls || !urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-gray-200 my-6 p-4 bg-black border-2 border-gray-300 rounded-lg">
        <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        <p className="text-lg font-medium">No URLs found</p>
        <p className="mt-1">You haven't created any shortened URLs yet.</p>
      </div>
    )
  }

  // Only show error if there's actual data but an error occurred
  if (isError && urls && urls.urls && urls.urls.length > 0) {
    return (
      <div className="bg-red-800 border-2 border-red-400 text-red-100 px-4 py-3 rounded my-4">
        Error loading your URLs: {error.message}
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Your Shortened URLs
      </h2>
      {[...urls.urls].reverse().map((url) => (
        <div key={url._id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-lg rounded-xl p-4 flex items-center justify-between gap-4">
          <div className="flex-grow">
            <p className="text-lg font-semibold text-blue-400 break-all">{`http://localhost:3000/${url.short_url}`}</p>
            <p className="text-sm text-gray-400 break-all">{url.full_url}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 bg-gray-700/50 px-2.5 py-1.5 rounded-lg">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                <span className="text-sm font-medium text-white">{url.clicks}</span>
            </div>
            <button
              onClick={() => handleCopy(`http://localhost:3000/${url.short_url}`, url._id)}
              className={`inline-flex items-center justify-center w-28 px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm transition-all duration-200 transform hover:scale-105 ${
                copiedId === url._id
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {copiedId === url._id ? (
                <>
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                  </svg>
                  Copy URL
                </>
              )}
            </button>
            <button
              onClick={() => handleDeleteClick(url._id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {urls && urls.length === 0 && (
        <p className="text-center text-gray-400 mt-4">You haven't created any short URLs yet.</p>
      )}

      {urlToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this URL?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={cancelDelete} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                No
              </button>
              <button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserUrl