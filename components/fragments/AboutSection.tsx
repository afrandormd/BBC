import Image from "next/image";
import { Card, CardContent } from "../elements/card";

export default function AboutSection() {
  return (
    <div className="w-full bg-[#FDF6EC] py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#8B5E34] mb-6 text-center">
          Tentang Askha Jaya
        </h1>
      </div>
    </div>
  );
}
