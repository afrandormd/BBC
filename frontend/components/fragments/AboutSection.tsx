import Image from "next/image";
import { Card, CardContent } from "../elements/card";

export default function AboutSection() {
  return (
    <div className="w-full bg-[#FDF6EC] py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <h2 className="text-4xl font-serif md:text-5xl font-bold text-secondary mb-6 text-center">
          Tentang Askha Jaya
        </h2>
        {/* About Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-justify">
              Kami adalah produsen keripik yang mengedepankan rasa, kualitas,
              dan keaslian. Dibuat dari bahan-bahan pilihan dengan proses
              tradisional yang terjaga, setiap gigitan keripik Askha Jaya
              menyajikan cita rasa asli Lampung yang menggugah selera.
            </p>
            <p className="text-gray-700 leading-relaxed text-justify">
              Berawal dari kecintaan kami pada kuliner lokal, Askha Jaya hadir
              untuk membawa kebahagiaan dalam setiap bungkusnya, baik untuk
              dinikmati sendiri maupun sebagai buah tangan istimewa bagi orang
              tersayang.
            </p>
          </div>
          <Card className="overflow-hidden border-none shadow-lg max-w-md mx-auto">
            <CardContent className="p-0">
              <Image
                src="/gambar-toko.png"
                alt="Askha Jaya Store"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg"
              />
            </CardContent>
          </Card>
        </div>
        {/* Vision & Mission Section */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="overflow-hidden border-none shadow-lg max-w-md mx-auto">
            <CardContent className="p-0">
              <Image
                src="/visi-misi.png"
                alt="Askha Jaya Team"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg"
              />
            </CardContent>
          </Card>
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold font-serif text-secondary mb-4">
                Visi Kami
              </h2>
              <p className="text-gray-700 text-lg">
                Menghadirkan minimal 500 cabang pada tahun 2026
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold font-serif text-secondary mb-4">
                Misi kami
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Menghadirkan makanan dan minuman yang dapat dinikmati
                    seluruh lapisan masyarakat dengan harga terjangkau.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Membuka lebih banyak lapangan kerja dan meningkatkan jumlah
                    wirausahawan.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
