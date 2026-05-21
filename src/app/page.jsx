import Header from "@/components/Header";
import SpecialOffer from "@/components/SpecialOffer";
import WhyChooseUs from "@/components/WhyChoseUS";

export default function Home() {
  return (
    <div className="relative">
      <Header/>
      <WhyChooseUs/>
      <SpecialOffer/>
    </div>
  );
}
