"use client";

import { useEffect, useState } from "react";

import CarCard from "@/components/carCard/CarCard";


import {
  ArrowUpDown,
  Car,
  DollarSign,
  Loader2,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { motion } from "framer-motion";
import { fetchCars } from "@/utils/fetchCar";

export default function CarsPage() {
  // States
  const [cars, setCars] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // Fetch Cars
  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);

        setError("");

        const data = await fetchCars({
          search,
          filters,
        });

        setCars(data);

      } catch (err) {
        setError(err.message);

      } finally {
        setLoading(false);
      }
    };

    loadCars();

  }, [search, filters]);

  // Search Submit
  const handleSearch = (e) => {
    e.preventDefault();
  };

  // Clear Filters
  const clearFilters = () => {
    setFilters({
      location: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    });

    setSearch("");
  };

  // Active Filters
  const hasActiveFilters =
    filters.location ||
    filters.minPrice ||
    filters.maxPrice ||
    search;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Available Cars
          </h1>

          <p className="text-muted-foreground">
            Browse our collection of premium vehicles for your next adventure
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by model, brand, or location..."
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setShowFilters(!showFilters)
              }
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors ${
                showFilters || hasActiveFilters
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-input text-foreground hover:bg-muted"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />

              Filters

              {hasActiveFilters && (
                <span className="w-2 h-2 bg-primary rounded-full" />
              )}
            </button>
          </form>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="p-4 bg-card border border-border rounded-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-foreground">
                  Filters
                </h3>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />

                    Clear all
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Location
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                    <input
                      type="text"
                      value={filters.location}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          location: e.target.value,
                        })
                      }
                      placeholder="Enter location"
                      className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-foreground"
                    />
                  </div>
                </div>

                {/* Min Price */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Min Price
                  </label>

                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                    <input
                      type="number"
                      min="0"
                      value={filters.minPrice}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          minPrice: e.target.value,
                        })
                      }
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-foreground"
                    />
                  </div>
                </div>

                {/* Max Price */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Max Price
                  </label>

                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                    <input
                      type="number"
                      min="0"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          maxPrice: e.target.value,
                        })
                      }
                      placeholder="1000"
                      className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-foreground"
                    />
                  </div>
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Sort By
                  </label>

                  <div className="relative">
                    <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                    <select
                      value={`${filters.sortBy}-${filters.sortOrder}`}
                      onChange={(e) => {
                        const [
                          sortBy,
                          sortOrder,
                        ] = e.target.value.split("-");

                        setFilters({
                          ...filters,
                          sortBy,
                          sortOrder,
                        });
                      }}
                      className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-foreground appearance-none cursor-pointer"
                    >
                      <option value="createdAt-desc">
                        Newest First
                      </option>

                      <option value="createdAt-asc">
                        Oldest First
                      </option>

                      <option value="dailyRentalPrice-asc">
                        Price: Low to High
                      </option>

                      <option value="dailyRentalPrice-desc">
                        Price: High to Low
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>

        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive">
              {error}
            </p>
          </div>

        ) : cars.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Showing {cars.length} car
              {cars.length !== 1 ? "s" : ""}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car, index) => (
                <CarCard
                  key={car._id}
                  car={car}
                  index={index}
                />
              ))}
            </div>
          </>

        ) : (
          <div className="text-center py-20">
            <Car className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />

            <h3 className="text-lg font-medium text-foreground mb-2">
              No cars found
            </h3>

            <p className="text-muted-foreground mb-4">
              {hasActiveFilters
                ? "Try adjusting your filters or search query"
                : "Check back later for new listings"}
            </p>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-primary hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}