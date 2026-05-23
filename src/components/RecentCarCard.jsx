"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { Car, MapPin } from "lucide-react";
import Link from "next/link";
const RecentCarCard=({ car, index })=>{
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300"
    >
      <div className="relative aspect-16/10 bg-muted overflow-hidden">
        { (car.imageUrl || car.image) ? (
          <Image
            src={car.imageUrl || car.image}
            alt={car.carModel || `${car.brand} ${car.model}`}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Car className="w-12 h-12 text-muted-foreground/40" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {car.carModel || `${car.brand} ${car.model}`}
        </h3>
        <div className="flex items-center gap-1 mt-1 text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="text-sm">{car.location}</span>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div>
            <span className="text-lg font-bold text-primary">${car.dailyRentalPrice}</span>
            <span className="text-sm text-muted-foreground">/day</span>
          </div>
          <Link
            href={`/cars/${car._id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
export default RecentCarCard;