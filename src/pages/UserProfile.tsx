import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/use-page-title";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Calendar,
  Star,
  Package,
  Heart,
  CheckCircle,
  MessageCircle,
  Shield,
  Award,
  Clock,
} from "lucide-react";

const UserProfile = () => {
  const { id } = useParams();
  const isOwnProfile = id === "me";

  // Mock user data - in real app, this would be fetched based on id
  const user = isOwnProfile
    ? {
        id: "me",
        name: "Budiman",
        avatar: "/placeholder.svg",
        bio: "Mahasiswa biasa dengan hobi menebar kebaikan",
        location: "Kediri",
        joinDate: "Juni 2025",
        verified: false,
        rating: 0,
        totalRatings: 0,
        totalDonations: 1,
        totalReceived: 0,
        completedTransactions: 0,
        responseTime: "Belum ada data",
        lastActive: "Online",
      }
    : {
        id: id || "1",
        name: "Sarah Martinez",
        avatar: "/placeholder.svg",
        bio: "Suka banget berbagi sama orang lain. Percaya kalo barang yang gak kepake bisa jadi berkah buat yang lain. Aktif donasi sejak 2023 dan seneng ketemu orang-orang baik di Givebox!",
        location: "Jakarta Selatan",
        joinDate: "Maret 2023",
        verified: true,
        rating: 4.8,
        totalRatings: 45,
        totalDonations: 23,
        totalReceived: 8,
        completedTransactions: 31,
        responseTime: "< 1 jam",
        lastActive: "2 jam yang lalu",
      };

  usePageTitle(isOwnProfile ? "Profil Saya" : `Profil ${user.name}`);

  const stats = [
    {
      icon: Package,
      label: "Total Donasi",
      value: user.totalDonations,
      color: "bg-blue-50 text-blue-400",
    },
    {
      icon: Heart,
      label: "Barang Diterima",
      value: user.totalReceived,
      color: "bg-red-50 text-red-400",
    },
    {
      icon: CheckCircle,
      label: "Transaksi Selesai",
      value: user.completedTransactions,
      color: "bg-green-50 text-green-400",
    },
    {
      icon: Star,
      label: "Rating",
      value: `${user.rating}/5`,
      color: "bg-yellow-50 text-yellow-400",
    },
  ];

  const donatedItems = isOwnProfile
    ? [
        {
          id: 1,
          title: "Buku Kalkulus Matematika",
          description:
            "Buku kalkulus untuk mahasiswa semester 1, masih bagus dan lengkap",
          image: "/placeholder.svg",
          category: "Pendidikan",
          status: "available",
          date: "2024-01-22",
          rating: null,
          recipient: null,
        },
      ]
    : [
        {
          id: 1,
          title: "Koleksi Jaket Musim Dingin",
          description: "5 jaket hangat untuk dewasa dan anak-anak",
          image: "/placeholder.svg",
          category: "Pakaian",
          status: "completed",
          date: "2024-01-15",
          rating: 5,
          recipient: "Ahmad Rahman",
        },
        {
          id: 2,
          title: "Buku Pendidikan Anak",
          description: "Koleksi buku cerita dan buku pelajaran",
          image: "/placeholder.svg",
          category: "Pendidikan",
          status: "completed",
          date: "2024-01-10",
          rating: 5,
          recipient: "Lina Kusuma",
        },
        {
          id: 3,
          title: "Set Peralatan Dapur",
          description: "Microwave, toaster, dan coffee maker",
          image: "/placeholder.svg",
          category: "Rumah Tangga",
          status: "available",
          date: "2024-01-12",
          rating: null,
          recipient: null,
        },
        {
          id: 4,
          title: "Laptop untuk Pelajar",
          description: "Laptop bekas pakai untuk belajar online",
          image: "/placeholder.svg",
          category: "Elektronik",
          status: "completed",
          date: "2024-01-08",
          rating: 4,
          recipient: "Budi Santoso",
        },
      ];

  const reviews = isOwnProfile
    ? [
        // No reviews yet as new user
      ]
    : [
        {
          id: 1,
          reviewer: "Ahmad Rahman",
          avatar: "/placeholder.svg",
          rating: 5,
          comment:
            "Sarah orangnya baik banget! Jaket-jaketnya persis yang dibutuhin shelter kami. Responsive dan gampang diatur jadwalnya. Makasih banyak!",
          date: "2024-01-15",
          item: "Koleksi Jaket Musim Dingin",
        },
        {
          id: 2,
          reviewer: "Lina Kusuma",
          avatar: "/placeholder.svg",
          rating: 5,
          comment:
            "Kondisi bukunya perfect! Anak-anak suka banget. Sarah juga ramah dan sabar jelasin kondisi barangnya. Recommended donor!",
          date: "2024-01-10",
          item: "Buku Pendidikan Anak",
        },
        {
          id: 3,
          reviewer: "Budi Santoso",
          avatar: "/placeholder.svg",
          rating: 4,
          comment:
            "Laptopnya masih bagus dan berfungsi dengan baik. Pickup lancar, Sarah juga kasih tips maintenance. Thanks!",
          date: "2024-01-08",
          item: "Laptop untuk Pelajar",
        },
      ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "available":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "available":
        return "Tersedia";
      case "pending":
        return "Proses";
      default:
        return "Unknown";
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-2xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {user.name}
                      </h1>
                      {user.verified ? (
                        <Badge className="bg-blue-100 text-blue-800">
                          <Shield className="h-3 w-3 mr-1" />
                          Terverifikasi
                        </Badge>
                      ) : isOwnProfile ? (
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 border-yellow-200"
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          Pengguna Baru
                        </Badge>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-4 text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Gabung {user.joinDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Aktif {user.lastActive}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {isOwnProfile ? (
                      <Link to="/profil/edit">
                        <Button variant="outline">
                          <Shield className="h-4 w-4 mr-2" />
                          Edit Profil
                        </Button>
                      </Link>
                    ) : (
                      <Link to="/chat">
                        <Button>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Chat {user.name}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{user.bio}</p>

                {/* Rating & Response Time */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(user.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{user.rating}</span>
                    <span className="text-gray-600">
                      ({user.totalRatings} ulasan)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      Respon: {user.responseTime}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 ${stat.color} rounded-full mb-2`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="donations">Donasi</TabsTrigger>
            <TabsTrigger value="reviews">
              Ulasan ({user.totalRatings})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="donations" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donatedItems.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="p-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary">{item.category}</Badge>
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusText(item.status)}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                          {new Date(item.date).toLocaleDateString("id-ID")}
                        </span>
                        {item.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{item.rating}</span>
                          </div>
                        )}
                      </div>
                      {item.recipient && (
                        <p className="text-xs text-gray-500">
                          Diterima oleh {item.recipient}
                        </p>
                      )}
                      <Link to={`/donasi/${item.id}`}>
                        <Button size="sm" className="w-full">
                          Lihat Detail
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>
                          {review.reviewer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{review.reviewer}</h4>
                            <p className="text-sm text-gray-600">
                              {review.item}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {review.rating}/5
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Achievement/Badges Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              {isOwnProfile ? "Pencapaian Kamu" : "Pencapaian"}
            </CardTitle>
            <CardDescription>
              {isOwnProfile
                ? "Badge yang udah kamu raih dari aktivitas donasi"
                : "Badge yang diraih karena kontribusi di Givebox"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Package className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Dermawan</h4>
                <p className="text-xs text-gray-600">20+ donasi berhasil</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Bintang 5</h4>
                <p className="text-xs text-gray-600">
                  Rating rata-rata di atas 4.5
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Terpercaya</h4>
                <p className="text-xs text-gray-600">30+ transaksi selesai</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <MessageCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Responsif</h4>
                <p className="text-xs text-gray-600">
                  Respon cepat kurang dari 1 jam
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserProfile;
