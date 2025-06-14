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
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Pelanggan Setia",
      content:
        "Askha Jaya selalu menjadi pilihan utama saya untuk belanja kebutuhan sehari-hari. Produknya berkualitas dan pelayanannya luar biasa!",
      rating: 5,
    },
    {
      name: "Siti Rahayu",
      role: "Pengusaha UMKM",
      content:
        "Sebagai mitra bisnis, Askha Jaya sangat membantu perkembangan usaha saya. Mereka tidak hanya menjual produk, tapi juga memberikan dukungan yang luar biasa.",
      rating: 5,
    },
    {
      name: "Andi Prasetyo",
      role: "Konsumen Baru",
      content:
        "Baru-baru ini saya mulai berbelanja di Askha Jaya dan saya sangat terkesan. Harga bersaing dan kualitas produk sangat baik.",
      rating: 4,
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
      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">
          Tim Kami
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((member) => (
            <div key={member} className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <Image
                  src={`/placeholder.svg?height=128&width=128&text=Team+Member+${member}`}
                  alt={`Team Member ${member}`}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-amber-900">
                Nama Anggota {member}
              </h3>
              <p className="text-amber-700">Posisi di Perusahaan</p>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">
          Apa Kata Mereka
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-amber-50 p-6 rounded-lg">
              <p className="text-amber-700 mb-4">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-amber-900">{testimonial.name}</p>
                  <p className="text-amber-600 text-sm">{testimonial.role}</p>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-amber-500 fill-current"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Achievements */}
      <div className="bg-amber-50 p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-amber-900">
          Pencapaian Kami
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-800">
              Penghargaan
            </h3>
            <ul className="list-disc list-inside text-amber-700 space-y-2">
              <li>Penghargaan Pelayanan Pelanggan Terbaik 2022</li>
              <li>Top Brand Award 2021</li>
              <li>Penghargaan Inovasi Bisnis 2020</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-800">
              Sertifikasi
            </h3>
            <ul className="list-disc list-inside text-amber-700 space-y-2">
              <li>ISO 9001:2015 - Manajemen Mutu</li>
              <li>ISO 14001:2015 - Manajemen Lingkungan</li>
              <li>OHSAS 18001 - Kesehatan dan Keselamatan Kerja</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Community Involvement */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-amber-900">
          Keterlibatan Komunitas
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Image
              src="/placeholder.svg?height=300&width=400&text=Community+Event"
              alt="Community Event"
              width={400}
              height={300}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2 text-amber-800">
              Program Pemberdayaan UMKM
            </h3>
            <p className="text-amber-700">
              Kami aktif mendukung pertumbuhan UMKM lokal melalui program
              pelatihan dan pendampingan bisnis.
            </p>
          </div>
          <div>
            <Image
              src="/placeholder.svg?height=300&width=400&text=CSR+Activity"
              alt="CSR Activity"
              width={400}
              height={300}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2 text-amber-800">
              Kegiatan Sosial
            </h3>
            <p className="text-amber-700">
              Askha Jaya secara rutin mengadakan kegiatan sosial, termasuk donor
              darah dan bantuan bencana alam.
            </p>
          </div>
        </div>
      </div>
      {/* Call to Action */}
      <div className="text-center bg-amber-800 text-white p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Bergabung dengan Kami</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Mari menjadi bagian dari perjalanan kami dalam memberikan layanan
          terbaik untuk masyarakat.
        </p>
        <button className="bg-white text-amber-800 px-8 py-3 rounded-lg font-bold hover:bg-amber-50 transition-colors">
          Hubungi Kami
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
