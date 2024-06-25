import pdfModel from '../models/pdfModel.js';
import path from 'path';
import fs from 'fs';

export const uploadPdf = async (req, res) => {
  const fileName = req.file.filename;
  try {
    await pdfModel.create({ pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
};

export const getFiles = async (req, res) => {
  try {
    const data = await pdfModel.find({});
    res.send({ status: "ok", data: data });
  } catch (error) {
    res.status(500).json({ status: error });
  }
};

export const getPdf = async (req, res) => {
  try {
    const { id,filename } = req.params;
    const pdfRecord = await pdfModel.findById(id);
    if (!pdfRecord) {
      return res.status(404).json({ status: "error", message: "PDF not found" });
    }
    const filePath = path.join(filename, '../uploads', pdfRecord.pdf);
    console.log(filePath);
    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(404).json({ status: "error", message: "File not found on server" });
    }
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
};
