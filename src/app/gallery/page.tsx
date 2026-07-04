import { Navbar } from "@/components/Navbar";
import { Portfolio } from "@/components/Portfolio";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Portfolio />
      </main>
    </>
  );
}
