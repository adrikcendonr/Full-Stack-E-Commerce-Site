import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin">
      </div>
    </div>

  )
}

export default Loader;