const mongoose = require('mongoose');

// Define sub-schemas
const installmentSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  period: { type: Number, required: true },
}, { _id: false });

const priceSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  currency: { type: String, required: true },
  installment: installmentSchema,
  validFrom: { type: Date, required: true },
  validTo: { type: Date, required: true },
}, { _id: false });

// Main Product Schema
const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
  capacity: { 
    type: Number, 
    enum: [8, 9, 10.5], 
    required: true 
  },
  dimensions: { type: String, required: true },
  features: {
    type: [{
      type: String,
      enum: ['Drzwi AddWash™', 'Panel AI Control', 'Silnik inwerterowy', 'Wyświetlacz elektroniczny'],
    }],
    required: true,
  },
  energyClass: {
    type: String,
    enum: ['A', 'B', 'C'],
    required: true,
  },
  price: priceSchema,
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);