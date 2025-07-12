// utils/getBlurHashFromImage.ts
import { encode } from 'blurhash';

export const getBlurHashFromImage = (imageUrl: string): Promise<string> => {
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
