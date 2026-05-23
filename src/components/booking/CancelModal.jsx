"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AlertTriangle, Loader2 } from "lucide-react";
import { cancelBooking } from "@/utils/booking";
import { getMongoId } from "@/utils/mongoId";

export default function CancelModal({ booking, onClose, onConfirm }) {
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    setIsCancelling(true);

    try {
      await cancelBooking(getMongoId(booking._id));
      toast.success("Booking cancelled successfully!");
      onConfirm();
    } catch (error) {
      toast.error(error.message || "Failed to cancel booking. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-border rounded-xl p-6 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Cancel Booking</h2>
        </div>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          Are you sure you want to cancel your booking for{" "}
          <span className="font-semibold text-foreground">{booking.carModel}</span>? This
          action cannot be undone and your slot will be made available to other drivers.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
          >
            Keep Booking
          </button>
          <button
            onClick={handleCancel}
            disabled={isCancelling}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-destructive text-destructive-foreground font-medium rounded-lg hover:bg-destructive/90 transition-colors disabled:opacity-50"
          >
            {isCancelling && <Loader2 className="h-4 w-4 animate-spin" />}
            Cancel Booking
          </button>
        </div>
      </motion.div>
    </div>
  );
}
