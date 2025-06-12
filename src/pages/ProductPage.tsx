import { useState } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/use-page-title";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, MapPin, Heart, Clock } from "lucide-react";

const ProductPage = () => {
  usePageTitle("Donasi");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const categories = [
    { value: "all", label: "Semua Kategori" },
    { value: "clothing", label: "Pakaian & Aksesoris" },
    { value: "electronics", label: "Elektronik" },
    { value: "books", label: "Buku & Pendidikan" },
    { value: "household", label: "Rumah Tangga" },
    { value: "toys", label: "Mainan & Permainan" },
    { value: "furniture", label: "Furnitur" },
    { value: "sports", label: "Olahraga & Rekreasi" },
    { value: "baby", label: "Barang Bayi & Anak" },
    { value: "other", label: "Lainnya" },
  ];

  const locations = [
    { value: "all", label: "Semua Lokasi" },
    { value: "jakarta", label: "Jakarta" },
    { value: "bandung", label: "Bandung" },
    { value: "surabaya", label: "Surabaya" },
    { value: "medan", label: "Medan" },
    { value: "semarang", label: "Semarang" },
  ];

  const donasi = [
    {
      id: 1,
      title: "Koleksi Jaket Musim Dingin",
      description:
        "Jaket hangat untuk dewasa dan anak-anak, cocok untuk cuaca dingin",
      image: "/placeholder.svg",
      category: "Pakaian",
      location: "Jakarta",
      donorName: "Sarah M.",
      timePosted: "2 jam yang lalu",
      isUrgent: false,
    },
    {
      id: 2,
      title: "Laptop untuk Pelajar",
      description:
        "Laptop bekas pakai yang masih jalan, cocok untuk belajar online dan tugas",
      image: "/placeholder.svg",
      category: "Elektronik",
      location: "Bandung",
      donorName: "Ahmad R.",
      timePosted: "5 jam yang lalu",
      isUrgent: true,
    },
    {
      id: 3,
      title: "Buku Cerita Anak",
      description:
        "Koleksi buku cerita berwarna untuk anak-anak umur 3-8 tahun",
      image: "/placeholder.svg",
      category: "Buku & Pendidikan",
      location: "Surabaya",
      donorName: "Lina K.",
      timePosted: "1 hari yang lalu",
      isUrgent: false,
    },
    {
      id: 4,
      title: "Set Peralatan Dapur",
      description:
        "Peralatan dapur lengkap termasuk panci, wajan, dan sendok garpu",
      image: "/placeholder.svg",
      category: "Rumah Tangga",
      location: "Jakarta",
      donorName: "Budi S.",
      timePosted: "2 hari yang lalu",
      isUrgent: false,
    },
    {
      id: 5,
      title: "Baju Bayi & Mainan",
      description:
        "Baju bayi bekas pakai (0-12 bulan) dan mainan edukatif dalam kondisi bagus",
      image: "/placeholder.svg",
      category: "Pakaian",
      location: "Medan",
      donorName: "Rina P.",
      timePosted: "3 hari yang lalu",
      isUrgent: true,
    },
    {
      id: 6,
      title: "Paket Alat Tulis Sekolah",
      description:
        "Buku tulis, pensil, penghapus, dan perlengkapan sekolah lainnya",
      image: "/placeholder.svg",
      category: "Buku & Pendidikan",
      location: "Semarang",
      donorName: "Dani M.",
      timePosted: "4 hari yang lalu",
      isUrgent: false,
    },
  ];

  const filteredDonasi = donasi.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase().includes(selectedCategory);
    const matchesLocation =
      selectedLocation === "all" ||
      product.location.toLowerCase() === selectedLocation;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Donasi Tersedia
          </h1>
          <p className="text-gray-600">
            Temukan barang-barang yang dibagikan oleh orang-orang yang murah
            hati
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari barang yang kamu butuhin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Lokasi" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan {filteredDonasi.length} dari {donasi.length} donasi
          </p>
        </div>

        {/* Donasi Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonasi.map((product) => (
            <Card
              key={product.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {product.isUrgent && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      Urgent
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{product.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {product.location}
                  </div>
                </div>
                <CardTitle className="mb-2 line-clamp-2">
                  {product.title}
                </CardTitle>
                <CardDescription className="mb-4 line-clamp-2">
                  {product.description}
                </CardDescription>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>dari {product.donorName}</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {product.timePosted}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/donasi/${product.id}`} className="flex-1">
                      <Button className="w-full" size="sm">
                        Lihat Detail
                      </Button>
                    </Link>
                    <Link to="/chat">
                      <Button variant="outline" size="sm">
                        Chat
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDonasi.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tidak ada donasi ditemukan
            </h3>
            <p className="text-gray-600 mb-4">
              Coba sesuaikan pencarian atau filter untuk menemukan yang kamu
              cari.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedLocation("all");
              }}
            >
              Hapus Filter
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredDonasi.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Muat Lebih Banyak
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;
