"use client";

import { motion } from "framer-motion";
import { Car, MapPin, Edit2, Trash2 } from "lucide-react";

export default function CarCard({ car, onEdit, onDelete }) {
  const carTitle = car.brand && car.model
    ? `${car.brand} ${car.model}`
    : car.carModel || "Unknown Car";

  const carImage = car.image || car.imageUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      {/* Car Image */}
      <div className="relative aspect-[16/10] bg-muted">
        {carImage ? (
          <img src={carImage} alt={carTitle} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Car className="w-12 h-12 text-muted-foreground/40" />
          </div>
        )}
        <div
          className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full ${
            car.availability
              ? "bg-success/90 text-success-foreground"
              : "bg-destructive/90 text-destructive-foreground"
          }`}
        >
          {car.availability ? "Available" : "Unavailable"}
        </div>
      </div>

      {/* Car Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-1">{carTitle}</h3>
        <div className="flex items-center gap-1 mt-1 text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="text-sm">{car.location}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-primary">${car.dailyRentalPrice}</span>
            <span className="text-sm text-muted-foreground">/day</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {car.bookingCount || 0} bookings
          </div>
        </div>
        {/* Actions */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
          <button
            onClick={() => onEdit(car)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
            Update
          </button>
          <button
            onClick={() => onDelete(car)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}
