"use client"
import { motion } from "framer-motion";
import { Award, Car, Clock, Shield } from "lucide-react";
const WhyChooseUs=()=>{
    const features = [
  {
    icon: Car,
    title: "Wide Selection",
    description: "Choose from our extensive fleet of premium vehicles for any occasion",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "All rentals come with comprehensive insurance coverage",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support for your peace of mind",
  },
  {
    icon: Award,
    title: "Best Prices",
    description: "Competitive rates with no hidden fees or surprises",
  },
];
    return(
        <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose DriveFleet?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide more than just car rentals. We deliver experiences that make every journey memorable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    )
}

export default WhyChooseUs;