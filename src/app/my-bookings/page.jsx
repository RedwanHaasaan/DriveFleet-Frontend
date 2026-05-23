"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { CalendarDays, Car, Loader2 } from "lucide-react";

import BookingCard from "@/components/booking/BookingCard";
import ModifyModal from "@/components/booking/ModifyModal";
import CancelModal from "@/components/booking/CancelModal";
import { fetchMyBookings } from "@/utils/booking";

export default function MyBookingsPage() {
  const { data: session, isPending } = useSession();
  
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [modifyingBooking, setModifyingBooking] = useState(null);
  const [cancellingBooking, setCancellingBooking] = useState(null);

  const loadBookings = async () => {
    if (!session?.user?.id) return;
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchMyBookings(session.user.id);
      setBookings(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      loadBookings();
    } else if (!isPending) {
      setIsLoading(false);
    }
  }, [session, isPending]);

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Sort bookings: upcoming first, then ongoing, then completed
  const sortedBookings = [...bookings].sort((a, b) => {
    const now = new Date();
    const aStart = new Date(a.startDate);
    const bStart = new Date(b.startDate);
    const aEnd = new Date(a.endDate);
    const bEnd = new Date(b.endDate);

    const aIsUpcoming = aStart > now;
    const bIsUpcoming = bStart > now;
    const aIsOngoing = aStart <= now && aEnd >= now;
    const bIsOngoing = bStart <= now && bEnd >= now;

    if (aIsUpcoming && !bIsUpcoming) return -1;
    if (!aIsUpcoming && bIsUpcoming) return 1;
    if (aIsOngoing && !bIsOngoing) return -1;
    if (!aIsOngoing && bIsOngoing) return 1;

    return bStart - aStart;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">
            View and manage your car rental bookings
          </p>
        </div>

        {/* Bookings List */}
        {error ? (
          <div className="text-center py-20">
            <p className="text-destructive">
              Failed to load bookings. Please try again.
            </p>
          </div>
        ) : sortedBookings && sortedBookings.length > 0 ? (
          <div className="space-y-4">
            {sortedBookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onModify={setModifyingBooking}
                onCancel={setCancellingBooking}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <CalendarDays className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No bookings yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Browse our collection and book your first car
            </p>
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Car className="h-4 w-4" />
              Browse Cars
            </Link>
          </div>
        )}
      </div>

      {/* Modify Modal */}
      {modifyingBooking && (
        <ModifyModal
          booking={modifyingBooking}
          onClose={() => setModifyingBooking(null)}
          onSave={() => {
            setModifyingBooking(null);
            loadBookings();
          }}
        />
      )}

      {/* Cancel Modal */}
      {cancellingBooking && (
        <CancelModal
          booking={cancellingBooking}
          onClose={() => setCancellingBooking(null)}
          onConfirm={() => {
            setCancellingBooking(null);
            loadBookings();
          }}
        />
      )}
    </div>
  );
}
