import { useState } from "react";
import Layout from "@/components/Layout";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Package,
  Heart,
  Filter,
  Download,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Circle,
} from "lucide-react";
import { Link } from "react-router-dom";

const History = () => {
  usePageTitle("Riwayat");

  const [filterPeriod, setFilterPeriod] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const donationHistory = [
    {
      id: 1,
      title: "Koleksi Jaket Musim Dingin",
      description: "5 jaket hangat untuk dewasa dan anak-anak",
      image: "/placeholder.svg",
      recipientName: "Sarah Martinez",
      recipientAvatar: "/placeholder.svg",
      status: "completed",
      date: "2024-01-15",
      location: "Jakarta Selatan",
      rating: 5,
      feedback:
        "Donasi yang luar biasa! Jaket-jaketnya persis yang dibutuhin shelter kami. Makasih banyak!",
    },
    {
      id: 2,
      title: "Buku Pendidikan Anak",
      description: "Koleksi buku cerita dan buku pelajaran",
      image: "/placeholder.svg",
      recipientName: "Ahmad Rahman",
      recipientAvatar: "/placeholder.svg",
      status: "completed",
      date: "2024-01-10",
      location: "Bandung",
      rating: 5,
      feedback: "Kondisi bukunya perfect! Anak-anak suka banget bacanya!",
    },
    {
      id: 3,
      title: "Laptop untuk Pelajar",
      description: "Laptop bekas pakai untuk belajar online",
      image: "/placeholder.svg",
      recipientAvatar: "/placeholder.svg",
      status: "available",
      date: "2024-01-08",
      location: "Jakarta Pusat",
      rating: null,
      feedback: null,
    },
  ];

  const receivedHistory = [
    {
      id: 5,
      title: "Paket Alat Tulis Sekolah",
      description: "Buku tulis, pensil, dan alat tulis lainnya",
      image: "/placeholder.svg",
      donorName: "Rina Permata",
      donorAvatar: "/placeholder.svg",
      status: "completed",
      date: "2024-01-14",
      location: "Jakarta Timur",
      rating: 5,
      feedback: "Donaturnya baik banget, barangnya sesuai deskripsi!",
    },
    {
      id: 6,
      title: "Baju Bayi & Mainan",
      description: "Baju bayi 0-12 bulan dan mainan edukatif",
      image: "/placeholder.svg",
      donorName: "Dani Marlianto",
      donorAvatar: "/placeholder.svg",
      status: "completed",
      date: "2024-01-09",
      location: "Semarang",
      rating: 4,
      feedback: "Barangnya dalam kondisi bagus, pengambilannya lancar.",
    },
    {
      id: 7,
      title: "Selimut Musim Dingin",
      description: "Selimut hangat untuk cuaca dingin",
      image: "/placeholder.svg",
      donorName: "Sinta Dewi",
      donorAvatar: "/placeholder.svg",
      status: "in-progress-review",
      date: "2024-01-13",
      location: "Medan",
      rating: null,
      feedback: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "available":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "in-progress-review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "in-progress-review":
        return <Star className="h-4 w-4 text-yellow-400" />;
      case "available":
        return <Circle className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "in-progress-review":
        return "Menunggu Review";
      case "available":
        return "Tersedia";
      default:
        return "Tersedia";
    }
  };

  const filteredDonations = donationHistory.filter((item) => {
    const matchesStatus =
      filterStatus === "all" || item.status === filterStatus;
    const matchesPeriod = filterPeriod === "all" || true; // Add date filtering logic
    return matchesStatus && matchesPeriod;
  });

  const filteredReceived = receivedHistory.filter((item) => {
    const matchesStatus =
      filterStatus === "all" || item.status === filterStatus;
    const matchesPeriod = filterPeriod === "all" || true; // Add date filtering logic
    return matchesStatus && matchesPeriod;
  });

  const stats = {
    totalDonated: donationHistory.length,
    totalReceived: receivedHistory.length,
    completedDonations: donationHistory.filter(
      (item) => item.status === "completed",
    ).length,
    averageRating: 4.8,
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Riwayat Donasi Kamu
          </h1>
          <p className="text-gray-600">
            Pantau aktivitas ngasih dan nerima donasi kamu
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full mb-2">
                <Package className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.totalDonated}
              </div>
              <div className="text-sm text-gray-600">Barang Dikasih</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-2">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.totalReceived}
              </div>
              <div className="text-sm text-gray-600">Barang Diterima</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-2">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.completedDonations}
              </div>
              <div className="text-sm text-gray-600">Selesai</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-2">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.averageRating}
              </div>
              <div className="text-sm text-gray-600">Rating Rata-rata</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select value={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Periode waktu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Waktu</SelectItem>
              <SelectItem value="last-week">Minggu Lalu</SelectItem>
              <SelectItem value="last-month">Bulan Lalu</SelectItem>
              <SelectItem value="last-3-months">3 Bulan Lalu</SelectItem>
              <SelectItem value="last-year">Tahun Lalu</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="in-progress-review">Menunggu Review</SelectItem>
              <SelectItem value="available">Tersedia</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="donated" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="donated">Barang yang Aku Kasih</TabsTrigger>
            <TabsTrigger value="received">Barang yang Aku Terima</TabsTrigger>
          </TabsList>

          <TabsContent value="donated" className="space-y-4">
            {filteredDonations.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {item.description}
                          </p>
                        </div>
                        <Badge
                          className={`${getStatusColor(item.status)} flex items-center gap-1`}
                        >
                          {getStatusIcon(item.status)}
                          {getStatusText(item.status)}
                        </Badge>
                      </div>

                      {item.recipientAvatar && item.recipientName && (
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={item.recipientAvatar} />
                            <AvatarFallback>
                              {item.recipientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">
                            Diterima oleh {item.recipientName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {new Date(item.date).toLocaleDateString("id-ID")}
                        </div>
                      </div>
                      )}

                      {item.status === "completed" && item.rating && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < item.rating!
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">
                              Rating: {item.rating}/5
                            </span>
                          </div>
                          {item.feedback && (
                            <p className="text-sm text-gray-700 italic">
                              "{item.feedback}"
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2 mt-4">
                        <Link to={`/donasi/${item.id}`}>
                          <Button variant="outline" size="sm">
                            Lihat Detail
                          </Button>
                        </Link>
                        {item.status === "pending" && (
                          <Link to="/chat">
                            <Button size="sm">Chat Penerima</Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="received" className="space-y-4">
            {filteredReceived.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {item.description}
                          </p>
                        </div>
                        <Badge
                          className={`${getStatusColor(item.status)} flex items-center gap-1`}
                        >
                          {getStatusIcon(item.status)}
                          {getStatusText(item.status)}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={item.donorAvatar} />
                            <AvatarFallback>
                              {item.donorName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">
                            Dikasih oleh {item.donorName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {new Date(item.date).toLocaleDateString("id-ID")}
                        </div>
                      </div>

                      {item.status === "completed" && item.rating && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < item.rating!
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">
                              Rating kamu: {item.rating}/5
                            </span>
                          </div>
                          {item.feedback && (
                            <p className="text-sm text-gray-700 italic">
                              "{item.feedback}"
                            </p>
                          )}
                        </div>
                      )}

                        {item.status === "in-progress-review" && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <h4 className="font-medium text-sm mb-2">Beri Rating & Ulasan</h4>
                          <div className="flex items-center gap-2 mb-3">

                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setSelectedRating(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="focus:outline-none"
                              >
                                <Star
                                  className={`h-6 w-6 cursor-pointer ${
                                    star <= (hoveredRating || selectedRating)
                                      ? "fill-yellow-400 text-yellow-400" 
                                      : "text-gray-300"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">Pilih rating</span>
                          </div>
                          
                          <textarea
                          className="w-full p-2 text-sm border border-gray-300 rounded-md mb-3"
                          rows={3}
                          placeholder="Tulis ulasan tentang donasi yang kamu terima..."
                          />
                          
                          <div className="flex justify-end">
                          <Button size="sm">
                            Kirim Review
                          </Button>
                          </div>
                        </div>
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Empty States */}
        {filteredDonations.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Belum ada donasi nih
            </h3>
            <p className="text-gray-600 mb-4">
              Yuk mulai berbagi barang sama temen-temen!
            </p>
            <Link to="/bagi">
              <Button>Mulai Donasi Pertama</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;
