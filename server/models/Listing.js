import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Plastic', 'Paper', 'Metal', 'Organic', 'E-waste'],
      required: true,
      index: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 0.1,
    },
    unit: {
      type: String,
      enum: ['kg', 'lbs'],
      default: 'kg',
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
    co2Saved: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    rawLabel: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['Available', 'Sold', 'Expired'],
      default: 'Available',
      index: true,
    },
    condition: {
      type: String,
      enum: ['New', 'Used', 'Refurbished'],
      default: 'Used',
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
);

listingSchema.index({ status: 1, category: 1 });
listingSchema.index({ sellerId: 1, status: 1 });
listingSchema.index({ createdAt: -1 });

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;
