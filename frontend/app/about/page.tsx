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
    </div>
  );
};

export default AboutPage;
