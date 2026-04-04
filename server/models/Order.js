import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Pending Pickup', 'In Transit', 'Completed', 'Cancelled'],
      default: 'Pending',
      index: true,
    },
    pickupLocation: {
      address: String,
      city: String,
      state: String,
      zipCode: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    paymentStatus: {
      type: String,
      enum: ['Unpaid', 'Processing', 'Completed', 'Failed'],
      default: 'Processing',
    },
    paymentMethod: {
      type: String,
      enum: ['Card', 'Wallet', 'Bank Transfer'],
      default: 'Card',
    },
    transactionId: {
      type: String,
      default: null,
    },
    trackingNumber: {
      type: String,
      default: null,
    },
    estimatedPickupDate: Date,
    actualPickupDate: Date,
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ buyerId: 1, createdAt: -1 });
orderSchema.index({ sellerId: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);
export default Order;
