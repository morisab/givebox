import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/use-page-title";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
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

  const conditions = [
    { value: "5", label: "Baru" },
    { value: "4", label: "Seperti Baru" },
    { value: "3", label: "Kondisi Bagus" },
    { value: "2", label: "Kondisi Lumayan" },
    { value: "1", label: "Perlu Perbaikan Kecil" },
  ];

const categories = [
  { value: "all", label: "Semua Kategori" },
  { value: "01cef7e0-e9b0-486c-be62-514dd275a7a0", label: "Pakaian & Aksesoris" },
  { value: "ec339ced-3eaa-4b7d-86d8-771f08482568", label: "Elektronik" },
  { value: "7a466f8f-662a-4edc-b737-47d647bd6a5a", label: "Buku & Pendidikan" },
  { value: "d45d87fc-35a6-43c3-8ccd-1827eab3618c", label: "Rumah Tangga" },
  { value: "08815789-63f4-4aad-9b27-2a1bc4dece42", label: "Mainan & Permainan" },
  { value: "088df485-5c59-4fc3-8e08-591bc7cd7b47", label: "Furnitur" },
  { value: "006f3ef2-14e5-4058-80ab-3cc92e3a232a", label: "Olahraga & Rekreasi" },
  { value: "877a31b6-737d-4ca0-b760-912e090ff9d5", label: "Barang Bayi & Anak" },
  { value: "102eefe9-a8f7-4967-985c-e8c0927bc155", label: "Lainnya" },
];


  const locations = [
    { value: "all", label: "Semua Lokasi" },
    { value: "jakarta", label: "Jakarta" },
    { value: "bandung", label: "Bandung" },
    { value: "surabaya", label: "Surabaya" },
    { value: "yogyakarta", label: "Yogyakarta" },
    { value: "medan", label: "Medan" },
    { value: "semarang", label: "Semarang" },
    { value: "makassar", label: "Makassar" },
    { value: "palembang", label: "Palembang" },
  ];

  const [donasi, setDonasi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filterError, setFilterError] = useState(null);

  // Debounce function for search query
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch donations
  const fetchDonasi = useCallback(
    async (newPage = 1, isLoadMore = false) => {
      setLoading(true);
      setFilterError(null);

      try {
        let endpoint = "/donation/donated-item";

        // Handle filter combinations
        if (selectedCategory !== "all" && selectedLocation !== "all") {
          // Backend doesn't support both filters; prioritize category or show error
          setFilterError(
            "Maaf, filter kategori dan lokasi tidak dapat digabungkan saat ini."
          );
          setDonasi([]);
          setLoading(false);
          return;
        } else if (selectedCategory !== "all") {
          endpoint = `/donation/donated-item/category/${selectedCategory}`;
        } else if (selectedLocation !== "all") {
          endpoint = `/donation/donated-item/city/${selectedLocation}`;
        }

        const params = new URLSearchParams();
        params.append("page", newPage.toString());
        params.append("per_page", "6");
        if (searchQuery) {
          params.append("search", searchQuery);
        }

        const res = await api.get(`${endpoint}?${params.toString()}`) as { data: { data: any[] } };
        const newData = res.data.data || [];

        // Update state
        setDonasi((prev) => (isLoadMore ? [...prev, ...newData] : newData));
        setHasMore(newData.length === 6); // Assume 6 items means more pages exist
        setPage(newPage);

        console.log("URL:", `${endpoint}?${params.toString()}`);
      } catch (error) {
        console.error("Gagal fetch donasi", error);
        setDonasi([]);
        setFilterError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    },
    [selectedCategory, selectedLocation, searchQuery]
  );

  // Debounced search query handler
  const debouncedFetchDonasi = useCallback(debounce(fetchDonasi, 300), [
    fetchDonasi,
  ]);

  // Fetch on filter changes
  useEffect(() => {
    // Reset page and fetch immediately for category/location changes
    if (selectedCategory !== "all" || selectedLocation !== "all") {
      setPage(1);
      fetchDonasi(1);
    } else {
      // For search query, use debounced fetch
      setPage(1);
      debouncedFetchDonasi(1);
    }
  }, [selectedCategory, selectedLocation, debouncedFetchDonasi]);

  // Handle load more
  const handleLoadMore = () => {
    fetchDonasi(page + 1, true);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Donasi Tersedia
          </h1>
          <p className="text-gray-600">
            Temukan barang-barang yang dibagikan oleh orang-orang yang murah hati
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

        {/* Filter Error Message */}
        {filterError && (
          <div className="mb-6 text-red-600 text-center">
            {filterError}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan {donasi.length} donasi
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Memuat donasi...</p>
          </div>
        )}

        {/* Donasi Grid */}
        {!loading && donasi.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donasi.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="p-0">
            <div className="relative">
              <img
                src={"/placeholder.svg"} // Placeholder karena tidak ada field image dari API
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {product.is_urgent && (
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
                {product.pick_city}
              </div>
            </div>
            <CardTitle className="mb-2 line-clamp-2">
              {product.name}
            </CardTitle>
            <CardDescription className="mb-4 line-clamp-2">
              {product.description}
            </CardDescription>
            <div className="space-y-3">
              {/* Condition Badge */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
            {conditions.find(c => c.value === product.condition.toString())?.label || `Kondisi ${product.condition}`}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>dari {product.donor_name}</span>
                <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {new Date(product.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
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
        )}

        {/* Empty State */}
        {!loading && donasi.length === 0 && !filterError && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tidak ada donasi ditemukan
            </h3>
            <p className="text-gray-600 mb-4">
              Coba sesuaikan pencarian atau filter untuk menemukan yang kamu cari.
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
        {!loading && donasi.length > 0 && hasMore && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={handleLoadMore}>
              Muat Lebih Banyak
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;