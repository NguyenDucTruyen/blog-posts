// components/LazyImage.tsx
import { cn } from '@/lib/utils';
import { getBlurHashFromImage } from '@/utils/helpers/blurhash'; // Adjust the import path as necessary
import React, { useLayoutEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';
type LazyImageProps = {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
};

const LazyImage: React.FC<LazyImageProps> = ({ src, alt = '', className }) => {
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

export default LazyImage;
