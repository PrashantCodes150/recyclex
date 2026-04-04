import React, { useRef, useState, useEffect } from 'react';
import { Camera, Upload, X, Check, AlertCircle } from 'lucide-react';

export default function ImageDetectionModule({ userId, onListingCreated }) {
  const [step, setStep] = useState('capture'); // 'capture' | 'uploading' | 'detection' | 'editor' | 'complete'
  const [uploadedImage, setUploadedImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Form state for editing detected data
  const [formData, setFormData] = useState({
    itemName: '',
    material: '',
    quantity: '',
    quantityUnit: 'units',
    condition: 'Good',
    description: '',
    price: '',
  });

  // Start camera
  const startCamera = async () => {
    try {
      console.log('🎥 Starting camera...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
      });
      console.log('✅ Camera stream acquired:', stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        console.log('✅ Stream attached to video element');
        
        videoRef.current.onloadedmetadata = () => {
          console.log('✅ Video metadata loaded, playing...');
          videoRef.current?.play().catch(err => console.error('❌ Play error:', err));
        };
        
        videoRef.current.onerror = (err) => {
          console.error('❌ Video element error:', err);
          setError('Video playback error');
        };
        
        setCameraActive(true);
        setError(null);
        console.log('✅ Camera active set to true');
      }
    } catch (err) {
      console.error('❌ Camera error:', err);
      if (err.name === 'NotAllowedError') {
        setError('🚫 Camera permission denied. Check your browser settings.');
      } else if (err.name === 'NotFoundError') {
        setError('🎥 No camera found on this device.');
      } else {
        setError('❌ Unable to access camera: ' + err.message);
      }
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      setCameraActive(false);
    }
  };

  // Capture photo from camera
  const capturePhoto = async () => {
    try {
      console.log('📸 Starting capture...');
      if (!videoRef.current || !canvasRef.current) {
        console.error('❌ Video or canvas ref not available');
        setError('Camera or canvas not available');
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      console.log(`📐 Canvas set to ${canvas.width}x${canvas.height}`);

      if (canvas.width === 0 || canvas.height === 0) {
        console.error('❌ Video not ready - dimensions are 0');
        setError('Video stream not ready. Please try again.');
        return;
      }

      const context = canvas.getContext('2d');
      if (!context) {
        console.error('❌ Could not get canvas context');
        setError('Unable to get canvas context');
        return;
      }

      // Draw video frame to canvas
      console.log('🎨 Drawing video frame to canvas...');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      console.log('✅ Frame drawn successfully');

      // Convert canvas to blob
      console.log('💾 Converting canvas to blob...');
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error('❌ Blob creation failed');
            setError('Failed to capture image');
            return;
          }
          console.log('✅ Blob created:', blob.size, 'bytes');
          const file = new File([blob], `camera_${Date.now()}.jpg`, { type: 'image/jpeg' });
          console.log('✅ File created:', file.name);
          handleImageFile(file);
          stopCamera();
        },
        'image/jpeg',
        0.95
      );
    } catch (err) {
      console.error('❌ Capture error:', err);
      setError('Failed to capture photo: ' + err.message);
    }
  };

  // Handle file selection/upload
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  // Process image file
  const handleImageFile = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      setUploadedImage(e.target.result);
      setStep('uploading');
      await performDetection(file);
    };
    reader.readAsDataURL(file);
  };

  // Perform AI detection
  const performDetection = async (file) => {
    try {
      setLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      formDataToSend.append('image', file);
      formDataToSend.append('userId', userId);

      const response = await fetch('/api/detection/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Detection failed');

      const { data } = await response.json();
      const detection = data.detections[0];

      setDetectionResult({
        filePath: data.filePath,
        ...detection,
      });

      // Pre-fill form with detected data
      setFormData({
        itemName: detection.object,
        material: detection.material,
        quantity: detection.quantity.toString(),
        quantityUnit: detection.quantityUnit,
        condition: detection.condition,
        description: `Detected waste: ${detection.object}`,
        price: '',
      });

      setStep('editor');
    } catch (err) {
      setError(err.message);
      setStep('capture');
    } finally {
      setLoading(false);
    }
  };

  // Create listing from detection
  const createListing = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/detection/create-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          imagePath: detectionResult.filePath,
          detectionData: detectionResult,
          userEdits: formData,
        }),
      });

      if (!response.ok) throw new Error('Listing creation failed');

      const { data } = await response.json();

      setStep('complete');
      if (onListingCreated) {
        onListingCreated(data);
      }

      // Reset after 2 seconds
      setTimeout(() => {
        resetDetection();
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset everything
  const resetDetection = () => {
    setStep('capture');
    setUploadedImage(null);
    setDetectionResult(null);
    setError(null);
    setFormData({
      itemName: '',
      material: '',
      quantity: '',
      quantityUnit: 'units',
      condition: 'Good',
      description: '',
      price: '',
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* STEP 1: Capture/Upload */}
      {step === 'capture' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Detect & List Your Waste</h2>

          {/* Camera Capture */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
            <div className="text-center mb-6">
              <Camera className="w-16 h-16 mx-auto text-green-700 mb-4" />
              <h3 className="text-lg font-bold text-slate-900">Capture with Camera</h3>
              <p className="text-sm text-stone-600 mt-2">Point your camera at the waste item</p>
            </div>

            {!cameraActive ? (
              <button
                onClick={startCamera}
                className="w-full px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-all font-bold"
              >
                📱 Start Camera
              </button>
            ) : (
              <div className="space-y-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ display: 'block', width: '100%', minHeight: '400px', backgroundColor: '#000', borderRadius: '0.5rem' }}
                  className="rounded-lg"
                />
                <canvas ref={canvasRef} className="hidden" width={640} height={480} />
                <div className="flex gap-3">
                  <button
                    onClick={capturePhoto}
                    className="flex-1 px-4 py-3 bg-green-700 text-white rounded-lg hover:bg-green-600 font-bold"
                  >
                    📸 Capture Photo
                  </button>
                  <button
                    onClick={stopCamera}
                    className="flex-1 px-4 py-3 bg-stone-400 text-white rounded-lg hover:bg-stone-500 font-bold"
                  >
                    ✕ Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* File Upload */}
          <div className="bg-blue-50 rounded-2xl p-8 border-2 border-dashed border-blue-300">
            <div className="text-center mb-6">
              <Upload className="w-16 h-16 mx-auto text-blue-700 mb-4" />
              <h3 className="text-lg font-bold text-slate-900">Upload Image</h3>
              <p className="text-sm text-stone-600 mt-2">Choose an image from your device</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-all font-bold"
            >
              📁 Choose File
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: Uploading */}
      {step === 'uploading' && (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="w-20 h-20 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-xl font-bold text-slate-900">Analyzing Image...</p>
            <p className="text-sm text-stone-600 mt-2">Running AI detection</p>
          </div>
        </div>
      )}

      {/* STEP 3: Detection Results & Editor */}
      {step === 'editor' && detectionResult && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Preview */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200">
              <img
                src={uploadedImage}
                alt="Detected waste"
                className="w-full rounded-lg mb-4"
              />
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-stone-600">Detected Item</p>
                  <p className="text-lg font-bold text-slate-900">{detectionResult.object}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-stone-600">Material</p>
                  <p className="text-lg font-bold text-slate-900">{detectionResult.material}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-stone-600">AI Confidence</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-stone-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${detectionResult.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-green-700">{(detectionResult.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Form */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Edit Listing Details</h3>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Item Name</label>
                <input
                  type="text"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Material</label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Unit</label>
                  <select
                    value={formData.quantityUnit}
                    onChange={(e) => setFormData({ ...formData, quantityUnit: e.target.value })}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  >
                    <option value="units">Units</option>
                    <option value="kg">Kg</option>
                    <option value="liters">Liters</option>
                    <option value="boxes">Boxes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Condition</label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                >
                  <option value="Poor">Poor</option>
                  <option value="Fair">Fair</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Price (Optional)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  rows="3"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={createListing}
                  disabled={loading || !formData.itemName}
                  className="flex-1 px-4 py-3 bg-green-700 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold"
                >
                  ✓ Create Listing
                </button>
                <button
                  onClick={resetDetection}
                  className="flex-1 px-4 py-3 border border-stone-300 text-slate-700 rounded-lg hover:bg-stone-50 transition-all font-bold"
                >
                  ✕ Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Success */}
      {step === 'complete' && (
        <div className="text-center py-12 bg-green-50 rounded-2xl border-2 border-green-200 p-8">
          <div className="inline-block">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Listing Created!</h2>
            <p className="text-stone-600 mb-6">Your waste item has been listed on the marketplace</p>
            <button
              onClick={resetDetection}
              className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-600 font-bold"
            >
              List Another Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
