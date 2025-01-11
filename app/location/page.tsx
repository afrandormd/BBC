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
