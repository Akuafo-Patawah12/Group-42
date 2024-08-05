const mongoose= require('mongoose')
const {Schema} = mongoose;


const supplierSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    address: String
  }); 

const productSchema = new mongoose.Schema({
    name:String,
    description: String,
    price: Number
  });

const purchaseOrderSchema = new Schema({
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    date: Date,
    total: Number
  });

  
  const Supplier = mongoose.model('Supplier', supplierSchema);
  const Product = mongoose.model('Product', productSchema);
  
  const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
  
  module.exports = {PurchaseOrder, Product,Supplier};
  