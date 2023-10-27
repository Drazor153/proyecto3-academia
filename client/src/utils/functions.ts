export const countDecimals = function (value: number) {
  return value % 1 ? value.toString().split('.')[1].length : 0
}

interface CompressImageProps {
  fileImage: File | Blob | MediaSource;
  percentQuality: number;
}

export const compressImage = ({ fileImage, percentQuality }: CompressImageProps) => {

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