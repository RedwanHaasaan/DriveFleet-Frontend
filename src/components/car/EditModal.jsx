"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateCar } from "@/utils/fetchCar";
import { getMongoId } from "@/utils/mongoId";

export default function EditModal({ car, onClose, onSave }) {
  const [formData, setFormData] = useState({
    brand: car.brand || "",
    model: car.model || "",
    dailyRentalPrice: car.dailyRentalPrice || "",
    availability: car.availability || false,
    location: car.location || "",
    image: car.image || "",
    description: car.description || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateCar(getMongoId(car._id), formData);
      toast.success("Car updated successfully!");
      onSave();
    } catch (error) {
      toast.error(error.message || "Failed to update car");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-card border border-border rounded-xl p-6 shadow-xl my-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Update Car</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Brand</label>
            <input name="brand" type="text" value={formData.brand} onChange={handleChange} required className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Model</label>
            <input name="model" type="text" value={formData.model} onChange={handleChange} required className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Daily Price ($)</label>
            <input name="dailyRentalPrice" type="number" value={formData.dailyRentalPrice} onChange={handleChange} min="1" required className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Location</label>
            <input name="location" type="text" value={formData.location} onChange={handleChange} required className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Image URL</label>
            <input name="image" type="url" value={formData.image} onChange={handleChange} className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <textarea name="description" rows={3} value={formData.description} onChange={handleChange} className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>
          <div className="flex items-center gap-3">
            <input name="availability" type="checkbox" checked={formData.availability} onChange={handleChange} className="h-4 w-4 rounded border-input text-primary focus:ring-ring" />
            <span className="text-sm font-medium text-foreground">Available for booking</span>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" disabled={isSaving} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50">
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
