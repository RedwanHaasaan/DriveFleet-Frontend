"use client";

import { useState, use, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  Car,
  MapPin,
  Calendar,
  ArrowLeft,
  Loader2,
  User,
  Check,
  X,
  CalendarDays,
  Info,
  Gauge,
  Fuel,
  Users,
} from "lucide-react";

import { fetchCarById } from "@/utils/fetchCar";
import { createBooking } from "@/utils/booking";
import Image from "next/image";

export default function CarDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [isBooking, setIsBooking] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDates, setBookingDates] = useState({
    startDate: "",
    endDate: "",
  });

  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const loadCarDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchCarById(id);
        setCar(data);
      } catch (err) {
        setError(err.message || "Failed to load car details");
      } finally {
        setIsLoading(false);
      }
    };

    loadCarDetails();
  }, [id]);

  useEffect(() => {
    if (searchParams.get("book") === "1" && session && car && !car.error) {
      setShowBookingModal(true);
    }
  }, [searchParams, session, car]);

  const calculateTotalPrice = () => {
    if (!bookingDates.startDate || !bookingDates.endDate || !car) return 0;
    const start = new Date(bookingDates.startDate);
    const end = new Date(bookingDates.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * car.dailyRentalPrice : 0;
  };

  const handleBookNow = () => {
    if (!session) {
      const returnUrl = `/cars/${id}?book=1`;
      router.push(`/login?callbackUrl=${encodeURIComponent(returnUrl)}`);
      return;
    }
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async () => {
    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(`/cars/${id}?book=1`)}`);
      return;
    }

    if (!bookingDates.startDate || !bookingDates.endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    const start = new Date(bookingDates.startDate);
    const end = new Date(bookingDates.endDate);

    if (end <= start) {
      toast.error("End date must be after start date");
      return;
    }

    setIsBooking(true);

    try {
      await createBooking({
        carId: id,
        startDate: bookingDates.startDate,
        endDate: bookingDates.endDate,
      });

      toast.success("Booking confirmed successfully!");
      setShowBookingModal(false);
      router.push("/my-bookings");
    } catch (error) {
      toast.error(error.message || "Failed to book car. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !car || car.error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Car className="h-16 w-16 text-muted-foreground/40" />
        <h2 className="text-xl font-semibold text-foreground">Car not found</h2>
        <Link
          href="/cars"
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all cars
        </Link>
      </div>
    );
  }

  const isOwner = session?.user?.id === car.userId;
  const carName = car.carModel || `${car.brand} ${car.model}`;
  const carImageSrc = car.imageUrl || car.image;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/cars"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all cars
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-16/10 bg-muted rounded-xl overflow-hidden">
              {carImageSrc ? (
                <Image
                  src={carImageSrc}
                  alt={carName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Car className="w-24 h-24 text-muted-foreground/40" />
                </div>
              )}
              <div
                className={`absolute top-4 right-4 px-3 py-1.5 text-sm font-medium rounded-full ${
                  car.availability
                    ? "bg-success/90 text-success-foreground"
                    : "bg-destructive/90 text-destructive-foreground"
                }`}
              >
                {car.availability ? "Available" : "Unavailable"}
              </div>
            </div>

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-medium text-foreground mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feature, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 px-3 py-1.5 bg-muted text-muted-foreground text-sm rounded-lg"
                    >
                      <Check className="h-3 w-3 text-primary" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {carName}
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">
                  ${car.dailyRentalPrice}
                </span>
                <span className="text-muted-foreground">/day</span>
              </div>
            </div>

            {/* Specs Grid */}
            {(car.transmission || car.fuelType || car.seats) && (
              <div className="grid grid-cols-3 gap-4">
                {car.transmission && (
                  <div className="p-3 bg-card border border-border rounded-xl flex flex-col items-center justify-center text-center">
                    <Gauge className="h-5 w-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Transmission</span>
                    <span className="text-sm font-semibold text-foreground mt-0.5">{car.transmission}</span>
                  </div>
                )}
                {car.fuelType && (
                  <div className="p-3 bg-card border border-border rounded-xl flex flex-col items-center justify-center text-center">
                    <Fuel className="h-5 w-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Fuel Type</span>
                    <span className="text-sm font-semibold text-foreground mt-0.5">{car.fuelType}</span>
                  </div>
                )}
                {car.seats && (
                  <div className="p-3 bg-card border border-border rounded-xl flex flex-col items-center justify-center text-center">
                    <Users className="h-5 w-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Seats</span>
                    <span className="text-sm font-semibold text-foreground mt-0.5">{car.seats} Seats</span>
                  </div>
                )}
              </div>
            )}

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Location</span>
                </div>
                <p className="font-medium text-foreground">{car.location}</p>
              </div>

              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-sm">Bookings</span>
                </div>
                <p className="font-medium text-foreground">{car.bookingCount || 0} times</p>
              </div>

              {car.vehicleRegistrationNumber && (
                <div className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Info className="h-4 w-4" />
                    <span className="text-sm">Registration</span>
                  </div>
                  <p className="font-medium text-foreground font-mono">
                    {car.vehicleRegistrationNumber}
                  </p>
                </div>
              )}

              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Year</span>
                </div>
                <p className="font-medium text-foreground">{car.year || "N/A"}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-medium text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {car.description || "No description provided for this vehicle."}
              </p>
            </div>

            {/* Owner Info */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-medium text-foreground mb-3">Listed By</h3>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {car.userName || "Anonymous"}
                  </p>
                  <p className="text-sm text-muted-foreground">{car.userEmail || "No email listed"}</p>
                </div>
              </div>
            </div>

            {/* Book Button */}
            {car.availability && !isOwner && (
              <button
                onClick={handleBookNow}
                className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Book Now
              </button>
            )}

            {isOwner && (
              <div className="p-4 bg-muted/50 border border-border rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  This is your car listing.{" "}
                  <Link href="/my-cars" className="text-primary hover:underline">
                    Manage your cars
                  </Link>
                </p>
              </div>
            )}

            {!car.availability && !isOwner && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive text-center">
                  This car is currently not available for booking.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-card border border-border rounded-xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Book This Car</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Car Info */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-foreground">{carName}</p>
                <p className="text-sm text-muted-foreground">
                  ${car.dailyRentalPrice}/day
                </p>
              </div>

              {/* Date Inputs */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={bookingDates.startDate}
                    onChange={(e) =>
                      setBookingDates({ ...bookingDates, startDate: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={bookingDates.endDate}
                    onChange={(e) =>
                      setBookingDates({ ...bookingDates, endDate: e.target.value })
                    }
                    min={bookingDates.startDate || new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
              </div>

              {/* Total Price */}
              {calculateTotalPrice() > 0 && (
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Price</span>
                    <span className="text-xl font-bold text-primary">
                      ${calculateTotalPrice()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.ceil(
                      (new Date(bookingDates.endDate) -
                        new Date(bookingDates.startDate)) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    day(s) x ${car.dailyRentalPrice}/day
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2.5 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={isBooking || !bookingDates.startDate || !bookingDates.endDate}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBooking && <Loader2 className="h-4 w-4 animate-spin" />}
                  Confirm Booking
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
