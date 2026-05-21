"use client"
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
const CTA=()=>{
    return(
              <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Hit the Road?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of satisfied customers who trust DriveFleet for their car rental needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/cars"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Browse Cars
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    )
}
export default CTA;