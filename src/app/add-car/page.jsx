"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Car,
  DollarSign,
  MapPin,
  FileText,
  Loader2,
  Plus,
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Users,
  FileImage,
} from "lucide-react";
import { addCar } from "@/utils/addCar";

export default function AddCarPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    location: "",
    dailyRentalPrice: "",
    transmission: "",
    fuelType: "",
    seats: "",
    image: "",
    description: "",
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.brand ||
      !formData.model ||
      !formData.year ||
      !formData.location ||
      !formData.dailyRentalPrice ||
      !formData.transmission ||
      !formData.fuelType ||
      !formData.seats
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await addCar(formData);
      toast.success("Car added successfully!");
      router.push("/cars");
    } catch (error) {
      toast.error(error.message || "Failed to add car. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Back Button */}
        <Link
          href="/cars"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cars
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Add New Car</h1>
            </div>
            <p className="text-muted-foreground">
              List your car on DriveFleet and start earning
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              {/* Brand and Model */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="brand" className="text-sm font-medium text-foreground">
                    Brand <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="brand"
                      name="brand"
                      type="text"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="e.g., Toyota"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="model" className="text-sm font-medium text-foreground">
                    Model <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="model"
                      name="model"
                      type="text"
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="e.g., Camry"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Year and Seats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="year" className="text-sm font-medium text-foreground">
                    Year <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="year"
                      name="year"
                      type="number"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="e.g., 2024"
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="seats" className="text-sm font-medium text-foreground">
                    Seats <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="seats"
                      name="seats"
                      type="number"
                      value={formData.seats}
                      onChange={handleChange}
                      placeholder="e.g., 5"
                      min="1"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Transmission and Fuel Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="transmission" className="text-sm font-medium text-foreground">
                    Transmission <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <select
                      id="transmission"
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-10 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select transmission</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-muted-foreground w-0 h-0" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="fuelType" className="text-sm font-medium text-foreground">
                    Fuel Type <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Fuel className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <select
                      id="fuelType"
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-10 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select fuel type</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-muted-foreground w-0 h-0" />
                  </div>
                </div>
              </div>

              {/* Price and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="dailyRentalPrice" className="text-sm font-medium text-foreground">
                    Daily Rental Price ($) <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="dailyRentalPrice"
                      name="dailyRentalPrice"
                      type="number"
                      value={formData.dailyRentalPrice}
                      onChange={handleChange}
                      placeholder="e.g., 50"
                      min="1"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium text-foreground">
                    Location <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., New York, NY"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium text-foreground">
                  Image URL
                </label>
                <div className="relative">
                  <FileImage className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/car-image.jpg"
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-foreground">
                  Description
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your car, its condition, and any special details..."
                    rows={4}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none transition-all"
                  />
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3">
                <input
                  id="availability"
                  name="availability"
                  type="checkbox"
                  checked={formData.availability}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-ring cursor-pointer"
                />
                <label htmlFor="availability" className="text-sm font-medium text-foreground cursor-pointer select-none">
                  Available for booking immediately
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Add Car
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
