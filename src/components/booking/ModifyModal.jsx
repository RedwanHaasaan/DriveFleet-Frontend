"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";
import { updateBooking } from "@/utils/booking";

export default function ModifyModal({ booking, onClose, onSave }) {
  const [dates, setDates] = useState({
    startDate: booking.startDate.split("T")[0],
    endDate: booking.endDate.split("T")[0],
  });
  const [isSaving, setIsSaving] = useState(false);

  const calculateNewPrice = () => {
    const start = new Date(dates.startDate);
    const end = new Date(dates.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * booking.dailyPrice : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(dates.startDate);
    const end = new Date(dates.endDate);

    if (end <= start) {
      toast.error("End date must be after start date");
      return;
    }

    setIsSaving(true);

    try {
      await updateBooking(booking._id, dates);
      toast.success("Booking updated successfully!");
      onSave();
    } catch (error) {
      toast.error(error.message || "Failed to update booking. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-border rounded-xl p-6 shadow-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Modify Booking</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-3 bg-muted/50 rounded-lg mb-4">
          <p className="font-semibold text-foreground">{booking.carModel}</p>
          <p className="text-sm text-muted-foreground mt-0.5">${booking.dailyPrice}/day</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Start Date</label>
            <input
              type="date"
              value={dates.startDate}
              onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">End Date</label>
            <input
              type="date"
              value={dates.endDate}
              onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
              min={dates.startDate}
              className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {calculateNewPrice() > 0 && (
            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">New Total</span>
                <span className="text-xl font-bold text-primary">
                  ${calculateNewPrice()}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
