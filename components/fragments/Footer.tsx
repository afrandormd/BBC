import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "../elements/button";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#4F2F16] to-[#FFCC33] w-full  py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 relative mb-6">
            <Image
              src="/logo-askhajaya.png"
              alt="Askha Jaya Logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-white/90 max-w-[800px] text-sm md:text-base">
            Menghadirkan kelezatan otentik dan kualitas terbaik di setiap
            sajian. Berkomitmen untuk menjadi teman setia dalam setiap momen
            kamu dan orang terkasih.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 border-t border-white/10 pt-8">
          <div className="text-center md:text-left">
            <h3 className="text-[#FFB800] text-xl font-semibold mb-4">
              Contact Us
            </h3>
            <p className="text-white/90 mb-6 text-sm md:text-base">
              Kami siap mendengar dan membantu Anda! Jika Anda memiliki
              pertanyaan, masukan atau ingin mengetahui informasi lebih lanjut
              tentang produk dan layanan Askha Jaya, jangan ragu untuk
              menghubungi kami ya!
            </p>
            <Button
              variant="outline"
              className="bg-[#FFB800] text-white hover:bg-[#E5A600] border-none"
            >
              Contact Us
            </Button>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-[#FFB800] text-xl font-semibold mb-4">
              Explore Askha Jaya
            </h3>
            <p className="text-white/90 mb-6 text-sm md:text-base">
              Temukan kami di berbagai platform media sosial
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Link
                href="#"
                className="bg-[#FFB800] p-2 rounded-full hover:bg-[#E5A600] transition-colors"
              >
                <Instagram className="w-6 h-6 text-white" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="bg-[#FFB800] p-2 rounded-full hover:bg-[#E5A600] transition-colors"
              >
                <Facebook className="w-6 h-6 text-white" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="bg-[#FFB800] p-2 rounded-full hover:bg-[#E5A600] transition-colors"
              >
                <MessageCircle className="w-6 h-6 text-white" />
                <span className="sr-only">WhatsApp</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
