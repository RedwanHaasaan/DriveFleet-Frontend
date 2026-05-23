"use client";

import { motion } from "framer-motion";
import { ArrowRight, Car, Sparkles } from "lucide-react";
import Link from "next/link";
import LottiePlayer from "./Lottie/LottiePlayer";
import car_Load from "@/assets/car_Load.json";
const Header = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-background" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Premium Car Rentals
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Drive Your Dreams with{" "}
              <span className="text-primary">DriveFleet</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Discover the freedom of the open road. Browse our premium
              collection of vehicles and find the perfect car for your next
              adventure.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/cars"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                View Available Cars
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
              >
                Join Now
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-6">
              {[
                { value: "500+", label: "Cars Available" },
                { value: "10k+", label: "Happy Customers" },
                { value: "50+", label: "Locations" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Car Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center ">
              <LottiePlayer
                animationData={car_Load}
                loop={false}
                autoplay={true}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Header;
