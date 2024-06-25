import express from 'express';
import multer from 'multer';
import { uploadPdf, getFiles, getPdf } from '../controllers/pdfController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post('/upload-files', upload.single('file'), uploadPdf);
router.get('/get-files', getFiles);
router.get('/download/:id/:filename', getPdf);

export default router;
