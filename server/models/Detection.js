import mongoose from 'mongoose';

const detectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageBase64: {
      type: String,
      // Large data - stored for re-verification
    },
    // AI Detection Results
    detectedObjects: [
      {
        name: String,
        confidence: Number,
        boundingBox: {
          x: Number, y: Number, width: Number, height: Number
        }
      }
    ],
    wasteType: {
      type: String,
      enum: ['Plastic', 'Paper', 'Metal', 'Organic', 'E-waste', 'Textile', 'Unknown'],
      required: true,
      index: true,
    },
    primaryMaterial: String,
    confidence: {
      type: Number,
      min: 0,
      max: 1,
      required: true,
    },
    estimatedQuantity: {
      value: Number,
      unit: { type: String, enum: ['kg', 'lbs', 'pieces'], default: 'kg' }
    },
    estimatedQuality: {
      type: String,
      enum: ['New', 'Good', 'Fair', 'Poor'],
      default: 'Fair'
    },
    aiAnalysis: {
      description: String,
      recommendedPrice: Number,
      category: String,
      flags: [String], // E.g., ['hazardous', 'contaminated']
    },
    detectionModel: {
      type: String,
      enum: ['YOLO', 'GoogleVision', 'Ensemble'],
      default: 'Ensemble'
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'manual-review'],
      default: 'pending',
      index: true,
    },
    relatedListingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      default: null,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

const Detection = mongoose.model('Detection', detectionSchema);
export default Detection;
