import { writeFile } from 'fs/promises';

export const savePdf = (name: string, file: Express.Multer.File) => {
  const extension = file.originalname.split('.').pop();
  const newFilename = `${name}.${extension}`;
  return writeFile(`./public/pdf/${newFilename}`, file.buffer);
};
