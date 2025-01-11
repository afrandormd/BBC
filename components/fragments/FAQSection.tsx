"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../elements/accordion";
import { Input } from "../elements/input";

const faqs = [
  {
    question: "Apa saja jenis oleh-oleh yang tersedia di toko kami?",
    answer:
      "Kami menyediakan berbagai jenis oleh-oleh khas daerah, termasuk makanan ringan, kue tradisional, kerajinan tangan, dan produk-produk unik lainnya.",
  },
  {
    question: "Bagaimana cara memesan produk dari e-katalog?",
    answer:
      "Anda dapat memesan produk dengan memilih item yang diinginkan, menambahkannya ke keranjang belanja, dan kemudian melanjutkan ke proses checkout.",
  },
  {
    question: "Apakah ada layanan pengiriman ke luar kota atau luar negeri?",
    answer:
      "Ya, kami menyediakan layanan pengiriman ke seluruh Indonesia dan juga ke beberapa negara tujuan internasional. Biaya pengiriman akan dihitung saat checkout.",
  },
  {
    question: "Berapa lama waktu pengiriman untuk pesanan saya?",
    answer:
      "Waktu pengiriman bervariasi tergantung lokasi tujuan. Untuk pengiriman dalam kota biasanya memakan waktu 1-2 hari kerja, sedangkan untuk luar kota atau luar negeri bisa memakan waktu 3-7 hari kerja.",
  },
  {
    question: "Apakah produk-produk yang dijual memiliki sertifikasi halal?",
    answer:
      "Sebagian besar produk makanan yang kami jual telah memiliki sertifikasi halal. Informasi detail mengenai sertifikasi dapat dilihat pada deskripsi masing-masing produk.",
  },
];
