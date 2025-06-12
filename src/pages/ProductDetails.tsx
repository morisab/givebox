import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/use-page-title";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Clock,
  Heart,
  Share2,
  Flag,
  MessageCircle,
  ChevronLeft,
  Star,
  Calendar,
  Package,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data - in real app, this would be fetched based on id
  const product = {
    id: id,
    title: "Koleksi Jaket Musim Dingin",
    description:
      "Koleksi jaket musim dingin yang hangat cocok untuk dewasa dan anak-anak. Jaket-jaket ini dalam kondisi sangat bagus dan cocok banget buat musim dingin yang akan datang. Koleksinya termasuk berbagai ukuran dari S sampai XL untuk dewasa dan ukuran 2-10 untuk anak-anak. Semua jaket udah dicuci bersih dan siap dipake langsung. Ideal buat keluarga yang membutuhkan atau organisasi yang membantu orang-orang kurang mampu saat musim dingin.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    category: "Pakaian",
    location: "Jakarta Selatan",
    exactLocation: "Kemang, Jakarta Selatan",
    condition: "Seperti Baru",
    quantity: "5 item",
    donorName: "Sarah Martinez",
    donorAvatar: "/placeholder.svg",
    donorRating: 4.8,
    donorJoinDate: "Maret 2023",
    totalDonations: 23,
    timePosted: "2 jam yang lalu",
    isUrgent: false,
    pickupAvailable: true,
    deliveryAvailable: false,
    preferredPickupTime: "Hari kerja jam 9 pagi - 5 sore",
    additionalNotes:
      "Tolong bawa kendaraan sendiri ya buat ambilnya. Barang-barangnya disimpan di tempat yang bersih dan kering. Chat aku dulu sebelum dateng biar aku pastiin lagi ada di tempat.",
  };

  const relatedItems = [
    {
      id: 2,
      title: "Sepatu Boot Anak Musim Dingin",
      image: "/placeholder.svg",
      location: "Jakarta Pusat",
      category: "Pakaian",
    },
    {
      id: 3,
      title: "Selimut Hangat",
      image: "/placeholder.svg",
      location: "Jakarta Utara",
      category: "Rumah Tangga",
    },
    {
      id: 4,
      title: "Topi & Sarung Tangan Musim Dingin",
      image: "/placeholder.svg",
      location: "Jakarta Barat",
      category: "Pakaian",
    },
  ];

  usePageTitle(product.title);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/donasi">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Balik ke Donasi
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.isUrgent && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                  Urgent
                </Badge>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart
                    className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>
                <Button variant="secondary" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index
                      ? "border-blue-400"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {product.timePosted}
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{product.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{product.quantity}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Donor Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Info Donatur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={product.donorAvatar} />
                    <AvatarFallback>
                      {product.donorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.donorName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{product.donorRating}</span>
                      <span>•</span>
                      <span>{product.totalDonations} donasi</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Gabung {product.donorJoinDate}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to="/chat" className="flex-1">
                    <Button className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat Donatur
                    </Button>
                  </Link>
                  <Link to="/profil/sarah-martinez">
                    <Button variant="outline">Lihat Profil</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Pickup Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Pengambilan & Pengiriman
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Bisa Diambil</span>
                  <span
                    className={
                      product.pickupAvailable
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {product.pickupAvailable ? "Bisa" : "Gak Bisa"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Bisa Diantar</span>
                  <span
                    className={
                      product.deliveryAvailable
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {product.deliveryAvailable ? "Bisa" : "Gak Bisa"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Waktu Pengambilan:</span>
                  <p className="text-sm mt-1">{product.preferredPickupTime}</p>
                </div>
                <div>
                  <span className="text-gray-600">Lokasi:</span>
                  <p className="text-sm mt-1">{product.exactLocation}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Deskripsi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                {product.description}
              </p>
              {product.additionalNotes && (
                <div>
                  <h4 className="font-semibold mb-2">Catatan Tambahan:</h4>
                  <p className="text-gray-600 text-sm">
                    {product.additionalNotes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Related Items */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Donasi Serupa
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedItems.map((item) => (
              <Card
                key={item.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardHeader className="p-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {item.location}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <Link to={`/donasi/${item.id}`}>
                    <Button size="sm" className="w-full">
                      Lihat Detail
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
