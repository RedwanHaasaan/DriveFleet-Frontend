"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Car, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import RecentCarCard from "./RecentCarCard";
import { fetchRecentCars } from "@/utils/fetchCar";

const RecentListing = () => {
  const [recentCars, setRecentCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecentCars = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchRecentCars();
        setRecentCars(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load recent listings");
      } finally {
        setIsLoading(false);
      }
    };

    getRecentCars();
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Recent Listings
            </h2>
            <p className="text-muted-foreground">
              Explore our latest additions to the fleet
            </p>
          </div>
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View All Cars
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-destructive/5 rounded-xl border border-destructive/10">
            <p className="text-destructive font-medium">Failed to load recent listings.</p>
          </div>
        ) : recentCars && recentCars.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCars.map((car, index) => (
              <RecentCarCard key={car._id} car={car} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-xl">
            <Car className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground">
              No cars listed yet. Be the first to add one!
            </p>
            <Link
              href="/add-car"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add Your Car
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentListing;