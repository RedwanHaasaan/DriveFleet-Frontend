"use client";
import { Car, MapPin } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
const CarCard = ({ car, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300"
    >
      {/* Car Image */}
      <div className="relative aspect-16/10 bg-muted overflow-hidden">
        {(car.imageUrl || car.image) ? (
          <Image
            src={car.imageUrl || car.image}
            alt={car.carModel || `${car.brand} ${car.model}`}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Car className="w-16 h-16 text-muted-foreground/40" />
          </div>
        )}
        {/* Availability Badge */}
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
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {car.carModel || `${car.brand} ${car.model}`}
        </h3>

        <div className="flex items-center gap-1 mt-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{car.location}</span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {car.description || "No description available"}
        </p>

        {/* Features */}
        {car.features && car.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {car.features.slice(0, 3).map((feature, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {feature}
              </span>
            ))}
            {car.features.length > 3 && (
              <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-md">
                +{car.features.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price and Action */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div>
            <span className="text-xl font-bold text-primary">
              ${car.dailyRentalPrice}
            </span>
            <span className="text-sm text-muted-foreground">/day</span>
          </div>
          <Link
            href={`/cars/${car._id}`}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default CarCard;
