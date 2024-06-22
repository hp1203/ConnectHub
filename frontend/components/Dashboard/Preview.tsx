import Card from '@/UI/Card';
import React, { useState, useEffect } from 'react';
import { IoReloadOutline } from 'react-icons/io5';

interface LivePreviewProps {
  url: string;
  reload: boolean;
}

const LivePreview: React.FC<LivePreviewProps> = ({ url, reload }) => {
  const [key, setKey] = useState<number>(0);
  const [error, setError] = useState<string>('');

  // Validate the URL
  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Effect to reload iframe when reload flag changes
  useEffect(() => {
    if (reload) {
      if (isValidUrl(url)) {
        setKey(prevKey => prevKey + 1);
        setError('');
      } else {
        setError('Invalid URL');
      }
    }
  }, [reload, url]);

  return (
    <Card title='Preview'>
      <div className='flex items-center rounded-lg p-1 bg-gray-50 mb-2'>
        {url && <p className='text-sm flex-1 text-gray-600 ml-2'>{url}</p>}
        {/* <button className='bg-gray-200 rounded-lg p-2 cursor-pointer' onClick={() => reloadIframe()}>
          <IoReloadOutline className='text-gray-700 w-5 h-5'/>
        </button> */}
      </div>
      {url && isValidUrl(url) && (
        <iframe
          key={key}
          src={url}
          title="Live Preview"
          style={{ width: '100%', height: '600px' }}
        />
      )}
    </Card>
  );
};

export default LivePreview;
