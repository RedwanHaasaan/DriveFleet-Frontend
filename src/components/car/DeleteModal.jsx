"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { deleteCar } from "@/utils/fetchCar";
import { getMongoId } from "@/utils/mongoId";

export default function DeleteModal({ car, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCar(getMongoId(car._id));
      toast.success("Car deleted successfully!");
      onConfirm();
    } catch (error) {
      toast.error(error.message || "Failed to delete car");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-border rounded-xl p-6 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Delete Car</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Are you sure you want to delete <span className="font-medium text-foreground">{car.brand && car.model ? `${car.brand} ${car.model}` : car.carModel || "this car"}</span>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors">
            Cancel
          </button>
          <button onClick={handleDelete} disabled={isDeleting} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-destructive text-destructive-foreground font-medium rounded-lg hover:bg-destructive/90 transition-colors disabled:opacity-50">
            {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
