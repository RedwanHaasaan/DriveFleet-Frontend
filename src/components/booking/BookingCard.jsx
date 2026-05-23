"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  CalendarDays,
  Car,
  MapPin,
  Clock,
  Edit2,
  Trash2,
} from "lucide-react";
import { getMongoId } from "@/utils/mongoId";

export default function BookingCard({ booking, onModify, onCancel }) {
  const startDate = new Date(booking.startDate);
  const endDate = new Date(booking.endDate);
  const isUpcoming = startDate > new Date();
  const isOngoing = startDate <= new Date() && endDate >= new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col md:flex-row">
        {/* Car Image */}
        <div className="relative w-full md:w-48 h-40 md:h-auto bg-muted shrink-0">
          {booking.carImage ? (
            <img
              src={booking.carImage}
              alt={booking.carModel}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Car className="w-12 h-12 text-muted-foreground/40" />
            </div>
          )}
          {/* Status Badge */}
          <div
            className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full ${
              isOngoing
                ? "bg-primary text-primary-foreground"
                : isUpcoming
                ? "bg-emerald-500 text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {isOngoing ? "Ongoing" : isUpcoming ? "Upcoming" : "Completed"}
          </div>
        </div>

        {/* Booking Info */}
        <div className="flex-1 p-5">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <Link
                href={`/cars/${getMongoId(booking.carId)}`}
                className="font-semibold text-lg text-foreground hover:text-primary transition-colors"
              >
                {booking.carModel}
              </Link>
              <div className="flex items-center gap-1.5 text-muted-foreground mt-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-sm">{booking.location}</span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xl font-extrabold text-primary">
                ${booking.totalPrice}
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">
                {booking.days} day{booking.days !== 1 ? "s" : ""} x ${booking.dailyPrice}
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-wrap gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-muted/60">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Start Date</p>
                <p className="text-sm font-medium text-foreground">
                  {format(startDate, "MMM d, yyyy")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-muted/60">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">End Date</p>
                <p className="text-sm font-medium text-foreground">
                  {format(endDate, "MMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          {(isUpcoming || isOngoing) && (
            <div className="flex gap-2 pt-3.5 border-t border-border">
              <button
                onClick={() => onModify(booking)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Edit2 className="h-3.5 w-3.5" />
                Modify Date
              </button>
              <button
                onClick={() => onCancel(booking)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
