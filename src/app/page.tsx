import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TickerBar } from "@/components/TickerBar";
import { SpecStrip } from "@/components/SpecStrip";
import { SwatchRack } from "@/components/SwatchRack";
import { ProviderManifest } from "@/components/ProviderManifest";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TickerBar />
      <SpecStrip />
      <SwatchRack />
      <ProviderManifest />
      <Footer />
    </main>
  );
}