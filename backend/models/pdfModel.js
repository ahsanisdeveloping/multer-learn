import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
  pdf: {
    type: String,
    required: true,
  },
});

const pdfModel = mongoose.model('PDF', pdfSchema);
export default pdfModel;
