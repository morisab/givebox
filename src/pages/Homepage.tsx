import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/use-page-title";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  Package,
  TrendingUp,
  ArrowRight,
  MapPin,
  Shirt,
  Smartphone,
  BookOpen,
  Home,
  Gamepad2,
  Baby,
} from "lucide-react";
import { Link } from "react-router-dom";

const Homepage = () => {
  usePageTitle("Beranda");

  const featuredItems = [
    {
      id: 1,
      title: "Jaket Musim Dingin untuk Anak",
      description:
        "Jaket hangat untuk anak-anak yang membutuhkan saat musim dingin",
      image: "/placeholder.svg",
      category: "Pakaian",
      location: "Jakarta",
      donorName: "Sarah M.",
    },
    {
      id: 2,
      title: "Buku Pelajaran",
      description: "Koleksi buku pelajaran sekolah dan buku cerita",
      image: "/placeholder.svg",
      category: "Pendidikan",
      location: "Bandung",
      donorName: "Ahmad R.",
    },
    {
      id: 3,
      title: "Peralatan Dapur",
      description:
        "Peralatan dapur bekas pakai yang masih bagus untuk keluarga",
      image: "/placeholder.svg",
      category: "Rumah Tangga",
      location: "Surabaya",
      donorName: "Lina K.",
    },
  ];

  const stats = [
    { icon: Heart, label: "Barang Didonasikan", value: "2,547" },
    { icon: Users, label: "Pengguna Aktif", value: "1,823" },
    { icon: Package, label: "Barang Tersedia", value: "456" },
    { icon: TrendingUp, label: "Tingkat Keberhasilan", value: "94%" },
  ];

  const popularCategories = [
    {
      name: "Pakaian",
      icon: Shirt,
      count: "156 item",
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
      description: "Baju, celana, jaket, dan aksesoris",
    },
    {
      name: "Elektronik",
      icon: Smartphone,
      count: "89 item",
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
      description: "Gadget, laptop, dan peralatan elektronik",
    },
    {
      name: "Buku & Pendidikan",
      icon: BookOpen,
      count: "124 item",
      color: "bg-green-50 text-green-600 hover:bg-green-100",
      description: "Buku pelajaran, novel, dan alat tulis",
    },
    {
      name: "Rumah Tangga",
      icon: Home,
      count: "67 item",
      color: "bg-orange-50 text-orange-600 hover:bg-orange-100",
      description: "Perabot, peralatan dapur, dan dekorasi",
    },
    {
      name: "Mainan & Permainan",
      icon: Gamepad2,
      count: "43 item",
      color: "bg-pink-50 text-pink-600 hover:bg-pink-100",
      description: "Mainan anak, puzzle, dan permainan",
    },
    {
      name: "Barang Bayi",
      icon: Baby,
      count: "32 item",
      color: "bg-yellow-50 text-yellow-600 hover:bg-yellow-100",
      description: "Perlengkapan bayi dan anak-anak",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Satu Donasi,
              <br />
              <span className="text-blue-100">Seribu Arti.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Terhubung dengan sesama untuk memberi dan menerima barang-barang
              yang bermanfaat. Setiap donasi membuat perbedaan di hidup
              seseorang.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donasi">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-3"
                >
                  Lihat Donasi
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/bagi">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-blue-500"
                >
                  Mulai Berbagi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kategori Paling Dicari
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kategori donasi yang paling banyak dicari dan dibutuhkan
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {popularCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={index}
                  to={`/donasi?category=${category.name.toLowerCase()}`}
                  className={`group p-6 rounded-xl transition-colors ${category.color}`}
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs opacity-75 mb-2">{category.count}</p>
                    <p className="text-xs opacity-60 hidden md:block">
                      {category.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link to="/donasi">
              <Button size="lg" variant="outline">
                Lihat Semua Kategori
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Donasi Unggulan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Temukan barang-barang keren yang dibagikan oleh temen-temen
              sekitar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredItems.map((item) => (
              <Card
                key={item.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardHeader className="p-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{item.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {item.location}
                    </div>
                  </div>
                  <CardTitle className="mb-2">{item.title}</CardTitle>
                  <CardDescription className="mb-4">
                    {item.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      dari {item.donorName}
                    </span>
                    <Link to={`/donasi/${item.id}`}>
                      <Button size="sm">Lihat Detail</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" variant="outline">
                Lihat Semua Donasi
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Gimana Caranya?
            </h2>
            <p className="text-xl text-gray-600">
              Langkah mudah untuk mulai berbagi dan peduli
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Posting Barangmu</h3>
              <p className="text-gray-600">
                Upload foto dan deskripsikan barang yang mau kamu donasikan
                untuk membantu orang lain yang membutuhkan.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
                <span className="text-2xl font-bold text-blue-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Ngobrol & Chat</h3>
              <p className="text-gray-600">
                Yang tertarik bisa chat kamu langsung untuk ngatur gimana cara
                ambil barangnya.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Buat Dampak Positif
              </h3>
              <p className="text-gray-600">
                Selesaikan donasi dan liat dampak positif yang udah kamu buat di
                hidup orang lain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-400 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Bikin Perbedaan?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Gabung sama ribuan orang yang udah berbagi dan peduli sesama.
          </p>
          <div className="flex justify-center">
            <Link to="/bagi">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-3"
              >
                Mulai Berbagi Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Homepage;
