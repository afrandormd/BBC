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
    </div>
  );
};

export default AboutPage;
