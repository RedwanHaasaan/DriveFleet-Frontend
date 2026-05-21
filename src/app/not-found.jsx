"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Car, Home } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-[120px] md:text-[150px] font-bold text-muted/50 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <Image
                src="https://i.ibb.co/KjZ3cRSV/logo.png"
                alt="DriveFleet Logo"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Oops! It looks like this page has driven off. The page you are looking
          for might have been moved, deleted, or never existed.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/cars"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
          >
            <Car className="h-4 w-4" />
            Browse Cars
          </Link>
        </div>

        {/* Fun message */}
        <p className="mt-8 text-sm text-muted-foreground">
          Need help?{" "}
          <a
            href="mailto:support@drivefleet.com"
            className="text-primary hover:underline"
          >
            Contact Support
          </a>
        </p>
      </motion.div>
    </div>
  );
}
