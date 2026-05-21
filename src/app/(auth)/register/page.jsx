"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex justify-center items-center gap-2 mb-6">
            <div>
              <Image
                src="https://i.ibb.co/KjZ3cRSV/logo.png"
                alt="DriveFleet Logo"
                width={100}
                height={100}
              />
            </div>
            <span className="font-semibold text-xl text-foreground">
              DriveFleet
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Create Account
          </h1>
          <p className="text-muted-foreground">
            Join DriveFleet and start your journey
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <RegisterForm/>
          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
