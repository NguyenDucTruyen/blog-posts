import { cn } from '@/lib/utils';
import React, { useLayoutEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';
type LazyImageProps = {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
};

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt = '', className }) => {
  const [loaded, setLoaded] = useState(false);
  const [blurHash, setBlurHash] = useState<string | null>(null);

  useLayoutEffect(() => {
    let isMounted = true;
    getBlurHashFromImage(src)
      .then(hash => {
        if (isMounted) setBlurHash(hash);
      })
      .catch(err => console.error('BlurHash error:', err));

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <div className={cn('relative w-full h-full', className)}>
      {blurHash && (
        <Blurhash
          hash={blurHash}
          width={'100%'}
          height={'100%'}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={cn(
          'w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
};

import { encode } from 'blurhash';

const getBlurHashFromImage = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'Anonymous'; // Bắt buộc để load ảnh external
    image.src = imageUrl;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const width = 32;
      const height = 32;

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(image, 0, 0, width, height);
      const imageData = ctx?.getImageData(0, 0, width, height);

      if (!imageData) return reject(new Error('Could not get image data'));

      const hash = encode(
        imageData.data,
        imageData.width,
        imageData.height,
        4, // componentX
        3 // componentY
      );

      resolve(hash);
    };

    image.onerror = () => {
      reject(new Error('Failed to load image for blurhash'));
    };
  });
};
