"use client";
import Image from "next/image";
import { MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/elements/button";
import { Card, CardContent, CardHeader } from "@/components/elements/card";

interface StoreLocation {
  name: string;
  branch: string;
  address: string;
  operatingHours: string;
  phone: string;
  mapUrl: string;
}
const storeLocations: StoreLocation[] = [
  {
    name: "Askha Jaya",
    branch: "Cabang Utama",
    address:
      "Jl. Pagar Alam, Segala Mider, Kec. Tj. Karang Bar., Kota Bandar Lampung, Lampung 35151",
    operatingHours: "07.00 - 22.00",
    phone: "085279466443",
    mapUrl: "https://maps.app.goo.gl/8v2npBce2VPG1hzp8",
  },
  {
    name: "Askha Jaya",
    branch: "Cabang Kedua",
    address:
      "Jl. Pagar Alam No.9, Kedaton, Kec. Kedaton, Kota Bandar Lampung, Lampung 35148",
    operatingHours: "07.00 - 22.00",
    phone: "085279466443",
    mapUrl: "https://maps.app.goo.gl/7FDMeE5DLWJRvcvY6",
  },
];
export default function StoreLocations() {
  const handleMapClick = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <section className="pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2 text-secondary font-serif">
            Lokasi Toko Kami
          </h2>
          <p className="text-muted-foreground">
            Kunjungi toko Askha Jaya terdekat di lokasi Anda
          </p>
        </div>

        <div className="grid gap-6">
          {storeLocations.map((store, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-primary/5 py-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <p className="font-medium">
                    {store.name} - {store.branch}
                  </p>
                </div>
              </CardHeader>
              <div className="relative w-full h-[200px] bg-muted">
                <Image
                  src="/gambar-toko.png"
                  alt={`${store.name} ${store.branch}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="text-sm font-medium">Alamat:</div>
                    <div className="text-sm text-muted-foreground">
                      {store.address}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">Jam Operasional:</span>
                      <span className="text-muted-foreground">
                        {store.operatingHours}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">Telepon:</span>
                      <span className="text-muted-foreground">
                        {store.phone}
                      </span>
                    </div>
                  </div>
                  <Button
                    // variant="outline"
                    className="w-full sm:w-auto hover:bg-secondary text-secondary hover:text-primary"
                    onClick={() => handleMapClick(store.mapUrl)}
                  >
                    Lihat di Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
