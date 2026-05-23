import CTA from "@/components/CTA";
import Header from "@/components/Header";
import RecentListing from "@/components/RecentListing";
import SpecialOffer from "@/components/SpecialOffer";
import WhyChooseUs from "@/components/WhyChoseUS";

export default function Home() {
  return (
    <div className="relative">
      <Header/>
      <RecentListing/>
      <WhyChooseUs/>
      <SpecialOffer/>
      <CTA/>
    </div>
  );
}
