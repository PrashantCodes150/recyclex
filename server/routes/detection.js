const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Simulated waste detection AI (will integrate YOLOv8 later)
const wasteCategories = {
  'plastic': { type: 'Plastic', value: 'plastic', color: '#3b82f6' },
  'metal': { type: 'Metal', value: 'metal', color: '#6b7280' },
  'paper': { type: 'Paper', value: 'paper', color: '#d4a574' },
  'glass': { type: 'Glass', value: 'glass', color: '#e0f2fe' },
  'organic': { type: 'Organic', value: 'organic', color: '#22c55e' },
  'textile': { type: 'Textile', value: 'textile', color: '#ec4899' },
  'ewaste': { type: 'E-Waste', value: 'ewaste', color: '#a78bfa' },
};

const mockDetectionResults = [
  {
    object: 'Plastic Bottle',
    material: 'PET Plastic',
    wasteType: 'plastic',
    quantity: 5,
    quantityUnit: 'units',
    condition: 'Good',
    confidence: 0.95,
  },
  {
    object: 'Aluminum Can',
    material: 'Aluminum',
    wasteType: 'metal',
    quantity: 12,
    quantityUnit: 'units',
    condition: 'Excellent',
    confidence: 0.92,
  },
  {
    object: 'Cardboard Box',
    material: 'Corrugated Paper',
    wasteType: 'paper',
    quantity: 8,
    quantityUnit: 'kg',
    condition: 'Good',
    confidence: 0.88,
  },
];

// POST /api/detection/upload - Upload and detect waste
router.post('/upload', upload.single('image'), async (req, file, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Simulate detection (in production, integrate YOLOv8 or Google Vision)
    const randomResult = mockDetectionResults[
      Math.floor(Math.random() * mockDetectionResults.length)
    ];

    const detectionResult = {
      filePath: `/uploads/${req.file.filename}`,
      fileName: req.file.filename,
      detections: [randomResult],
      timestamp: new Date(),
      userId: req.body.userId,
    };

    res.json({
      success: true,
      data: detectionResult,
    });
  } catch (error) {
    console.error('Detection error:', error);
    res.status(500).json({ error: 'Detection failed' });
  }
});

// POST /api/detection/create-listing - Create auto-listing from detection
router.post('/create-listing', async (req, res) => {
  try {
    const {
      userId,
      imagePath,
      detectionData,
      userEdits,
    } = req.body;

    // Merge detection data with user edits
    const listingData = {
      userId,
      imagePath,
      wasteType: userEdits?.wasteType || detectionData.wasteType,
      material: userEdits?.material || detectionData.material,
      itemName: userEdits?.itemName || detectionData.object,
      quantity: userEdits?.quantity || detectionData.quantity,
      quantityUnit: userEdits?.quantityUnit || detectionData.quantityUnit,
      condition: userEdits?.condition || detectionData.condition,
      description: userEdits?.description || `Detected waste: ${detectionData.object}`,
      price: userEdits?.price || 0,
      aiConfidence: detectionData.confidence,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Simulate DB save (in production, save to MongoDB)
    console.log('Listing created:', listingData);

    res.json({
      success: true,
      data: {
        listingId: `listing_${Date.now()}`,
        ...listingData,
      },
    });
  } catch (error) {
    console.error('Listing creation error:', error);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

module.exports = router;
