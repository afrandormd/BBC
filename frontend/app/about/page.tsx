/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Image from "next/image";
import {
  Users,
  Target,
  History,
  Award,
  CheckCircle,
  Truck,
  HeartHandshake,
  Leaf,
  Star,
} from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: <CheckCircle className="h-8 w-8 text-amber-800" />,
      title: "Kualitas Terbaik",
      description:
        "Kami berkomitmen untuk selalu menyediakan produk dengan kualitas terbaik untuk kepuasan pelanggan.",
    },
    {
      icon: <Users className="h-8 w-8 text-amber-800" />,
      title: "Pelayanan Prima",
      description:
        "Mengutamakan pelayanan yang ramah dan profesional kepada setiap pelanggan.",
    },
    {
      icon: <Award className="h-8 w-8 text-amber-800" />,
      title: "Inovasi Berkelanjutan",
      description:
        "Terus berinovasi dalam produk dan layanan untuk memenuhi kebutuhan pelanggan yang berkembang.",
    },
    {
      icon: <Truck className="h-8 w-8 text-amber-800" />,
      title: "Pengiriman Tepat Waktu",
      description:
        "Menjamin pengiriman produk tepat waktu ke seluruh pelanggan kami.",
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-amber-800" />,
      title: "Kepercayaan Pelanggan",
      description:
        "Membangun dan menjaga kepercayaan pelanggan melalui transparansi dan integritas.",
    },
    {
      icon: <Leaf className="h-8 w-8 text-amber-800" />,
      title: "Tanggung Jawab Lingkungan",
      description:
        "Berkomitmen untuk menjalankan bisnis dengan cara yang ramah lingkungan dan berkelanjutan.",
    },
  ];
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6 mt-8 text-amber-900">
          Tentang Askha Jaya
        </h1>

        <p className="text-lg text-amber-700 max-w-3xl mx-auto">
          Askha Jaya adalah perusahaan terpercaya yang telah melayani masyarakat
          selama bertahun-tahun dengan komitmen untuk memberikan produk
          berkualitas dan pelayanan terbaik.
        </p>
      </div>
      {/* Vision & Mission */}
      <div className="flex flex-col gap-8 mb-16">
        <div className="bg-amber-50 p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <Target className="h-8 w-8 text-amber-800" />
            <h2 className="text-2xl font-bold text-amber-900">Visi Kami</h2>
          </div>
          <p className="text-amber-700">
            Menjadi perusahaan terdepan dalam industri dengan mengutamakan
            kepuasan pelanggan dan inovasi berkelanjutan.
          </p>
        </div>
        <div className="bg-amber-50 p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <History className="h-8 w-8 text-amber-800" />
            <h2 className="text-2xl font-bold text-amber-900">Misi Kami</h2>
          </div>
          <ul className="text-amber-700 space-y-2">
            <li>• Menyediakan produk berkualitas tinggi</li>
            <li>• Memberikan pelayanan terbaik kepada pelanggan</li>
            <li>• Mengembangkan inovasi dalam setiap aspek bisnis</li>
            <li>• Berkontribusi positif kepada masyarakat</li>
          </ul>
        </div>
      </div>
      {/* Company Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">
          Nilai-Nilai Perusahaan
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center p-6 border border-amber-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-amber-900">
                {value.title}
              </h3>
              <p className="text-amber-700">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* History Section */}
      <div className="bg-amber-50 p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-amber-900">
          Perjalanan Kami
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-none">
                <div className="w-4 h-4 rounded-full bg-amber-800 mt-2"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-amber-900">2010</h3>
                <p className="text-amber-700">
                  Pembukaan toko pertama Askha Jaya
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-none">
                <div className="w-4 h-4 rounded-full bg-amber-800 mt-2"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-amber-900">2015</h3>
                <p className="text-amber-700">
                  Ekspansi dengan membuka cabang kedua
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-none">
                <div className="w-4 h-4 rounded-full bg-amber-800 mt-2"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-amber-900">2018</h3>
                <p className="text-amber-700">
                  Peluncuran program loyalitas pelanggan
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-none">
                <div className="w-4 h-4 rounded-full bg-amber-800 mt-2"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-amber-900">2020</h3>
                <p className="text-amber-700">
                  Implementasi sistem manajemen inventori terbaru
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-none">
                <div className="w-4 h-4 rounded-full bg-amber-800 mt-2"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-amber-900">2023</h3>
                <p className="text-amber-700">
                  Pengembangan platform digital dan layanan online
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
