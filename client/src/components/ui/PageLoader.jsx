import React from 'react';
import Loader from './Loader';

export default function PageLoader({ title = 'Loading page...' }) {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center p-8">
      <Loader title={title} className="py-0" />
    </div>
  );
}