import Link from "next/link";
import { Car, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import Image from "next/image";
export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div>
                <Image
                  src="https://i.ibb.co/KjZ3cRSV/logo.png"
                  alt="DriveFleet Logo"
                  width={70}
                  height={70}
                />
              </div>
              <span className="font-semibold text-lg text-foreground">
                DriveFleet
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for premium car rentals. Experience the
              freedom of the open road with our diverse fleet of vehicles.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <FaFacebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <FaXTwitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/cars", label: "Available Cars" },
                { href: "/add-car", label: "Add Your Car" },
                { href: "/my-bookings", label: "My Bookings" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              {[
                { href: "#", label: "FAQs" },
                { href: "#", label: "Terms of Service" },
                { href: "#", label: "Privacy Policy" },
                { href: "#", label: "Contact Us" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">
                  123 Fleet Street, Downtown, City 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">
                  support@drivefleet.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DriveFleet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
