import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { usePageTitle } from "@/hooks/use-page-title";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    const conditions = [
    { value: "5", label: "Baru" },
    { value: "4", label: "Seperti Baru" },
    { value: "3", label: "Kondisi Bagus" },
    { value: "2", label: "Kondisi Lumayan" },
    { value: "1", label: "Perlu Perbaikan Kecil" },
  ];
  const { id } = useParams();
  const navigate = useNavigate();
  type Product = {
    id: string;
    title?: string;
    name?: string;
    images?: string[];
    is_urgent?: boolean;
    category?: string;
    created_at?: string;
    pick_city?: string;
    location?: string;
    quantity_description?: number | string;
    donorAvatar?: string;
    donor_name?: string;
    donorRating?: number | string;
    totalDonations?: number;
    donorJoinDate?: string;
    donorId?: string;
    pickupAvailable?: boolean;
    deliveryAvailable?: boolean;
    preferredPickupTime?: string;
    exactLocation?: string;
    description?: string;
    additionalNotes?: string;
    condition?: number;
  };

  type RelatedItem = {
    id: string;
    title?: string;
    name?: string;
    image?: string;
    category?: string;
    pick_city?: string;
    location?: string;
  };

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedItems, setRelatedItems] = useState<RelatedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  usePageTitle(product ? product.title : "Donasi"); // Set title safely

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<{ data: Product }>(`/donation/donated-item/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Gagal memuat data donasi:", err);
        setError("Gagal memuat data donasi");
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedItems = async () => {
      try {
        // Example endpoint for related items; adjust based on your API
        const res = await api.get<{ data: RelatedItem[] }>(`/donation/donated-item?category=${product?.category}&per_page=3`);
        setRelatedItems(res.data.data || []);
      } catch (err) {
        console.error("Gagal memuat donasi serupa:", err);
      }
    };

    fetchProduct();
    if (product?.category) {
      fetchRelatedItems();
    }
  }, [id, product?.category]);

  const handleChat = async () => {
    try {
      const res = await api.post<{ data: any }>("/chat", {
        donated_item_id: product.id,
      });
      console.log("Berhasil mulai chat:", res.data.data);
      navigate("/chat"); // Use navigate for redirect
    } catch (err) {
      console.error("Gagal mulai chat:", err);
      alert("Gagal memulai chat");
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!product) return null; // Fallback

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
                src={
                  product.images?.[currentImageIndex] || "/placeholder.svg"
                }
                alt={product.title || "Donasi"}
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.is_urgent && (
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
            {product.images?.length > 1 && (
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
            )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {new Date(product.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                })}
              </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title || product.name}
              </h1>

              <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{product.pick_city || product.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{product.quantity_description || "Tidak diketahui"}</span>
              </div>
              </div>

              <div className="mb-4">
              <span className="text-sm text-gray-500">Kondisi:</span>
              <div className="mt-1">
                <Badge variant={product.condition >= 3 ? "default" : product.condition >= 1 ? "secondary" : "destructive"}>
                  {conditions.find(c => c.value === product.condition.toString())?.label || `Kondisi ${product.condition}`}
                </Badge>
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
                    <AvatarImage src={product.donorAvatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {product.donor_name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "NN"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.donor_name || "Anonim"}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{product.donorRating || "N/A"}</span>
                      <span>•</span>
                      <span>{product.totalDonations || 0} donasi</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Gabung{" "}
                      {product.donorJoinDate
                        ? new Date(product.donorJoinDate).toLocaleDateString("id-ID")
                        : "Tidak diketahui"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="w-full" onClick={handleChat}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat Donatur
                  </Button>
                  <Link to={`/profil/${product.donorId || "unknown"}`}>
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
                  <p className="text-sm mt-1">
                    {product.preferredPickupTime || "Tidak ditentukan"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Lokasi:</span>
                  <p className="text-sm mt-1">
                    {product.exactLocation || product.pick_city || "Tidak diketahui"}
                  </p>
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
                {product.description || "Tidak ada deskripsi tersedia"}
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
        {relatedItems.length > 0 && (
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
                      src={item.image || "/placeholder.svg"}
                      alt={item.title || item.name}
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
                        {item.pick_city || item.location}
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{item.title || item.name}</h3>
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
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;