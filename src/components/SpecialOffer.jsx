"use client"
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
const SpecialOffer=()=>{
    const specialOffers = [
  {
    title: "Weekend Special",
    discount: "20% OFF",
    description: "Book for the weekend and save big on your rental",
    bg: "from-primary/20 to-primary/5",
  },
  {
    title: "First-Time Renter",
    discount: "15% OFF",
    description: "New to DriveFleet? Enjoy an exclusive discount",
    bg: "from-success/20 to-success/5",
  },
  {
    title: "Long-Term Rental",
    discount: "25% OFF",
    description: "Rent for 7+ days and unlock maximum savings",
    bg: "from-ring/20 to-ring/5",
  },
];

    return(
<section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Special Offers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take advantage of our exclusive deals and save on your next rental.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {specialOffers.map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden p-6 rounded-xl bg-linear-to-br ${offer.bg} border border-border`}
              >
                <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                  {offer.discount}
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2 mt-6">
                  {offer.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>
                <Link
                  href="/cars"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Book Now
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
}

export default SpecialOffer;