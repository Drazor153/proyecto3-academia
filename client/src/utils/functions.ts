import { RutFormat, formatRut } from '@fdograph/rut-utilities';
import { SetStateAction, useEffect, useState } from 'react';

export const countDecimals = function (value: number) {
  return value % 1 ? value.toString().split('.')[1].length : 0;
};

interface CompressImageProps {
  fileImage: File | Blob | MediaSource;
  percentQuality: number;
}

export const compressImage = ({
  fileImage,
  percentQuality,
}: CompressImageProps) => {
  return new Promise<Blob>((resolve, reject) => {
    const $canvas = document.createElement('canvas');
    const image = new Image();
    image.onload = () => {
      $canvas.width = image.width;
      $canvas.height = image.height;
      $canvas.getContext('2d')?.drawImage(image, 0, 0);
      $canvas.toBlob(
        blob => {
          if (blob === null) {
            return reject(blob);
          } else {
            resolve(blob);
          }
        },
        'image/jpeg',
        percentQuality / 100,
      );
    };
    image.src = URL.createObjectURL(fileImage);
  });
};

export const handleRUNChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setRun: React.Dispatch<SetStateAction<string>>,
) => {
  const newRUN = event.target.value;
  if (newRUN.length > 12) return;
  const cleanRUN = newRUN.replace(/[^0-9kK]/g, '').toUpperCase();
  setRun(formatRut(cleanRUN, RutFormat.DOTS_DASH));
};

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const getYYYYMMDD = (date: string) => {
  const [day, month, year] = date.split('-');
  return `${day}/${month}/${year.split('T')[0]}`;
}