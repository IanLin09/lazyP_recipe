import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.ts';


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const publicId = `recipe/${file.originalname.split('.')[0]}`;
        return {
          folder: 'recipe',
          allowed_formats: ['jpg','png','gif','jpeg','webp'],
          overwrite: false,
          public_id:publicId
        };
      },
  });

const upload = multer({ storage });


export default upload;
