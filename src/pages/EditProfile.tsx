import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePageTitle } from "@/hooks/use-page-title";
import {
  User,
  Camera,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Save,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const EditProfile = () => {
  usePageTitle("Edit Profil");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "Budiman",
    lastName: "",
    email: "budiman@example.com",
    phone: "+62 812-3456-7890",
    location: "Jakarta Timur",
    bio: "Mahasiswa biasa dengan hobi menebar kebaikan",
    avatar: "/placeholder.svg",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocationChange = (value: string) => {
    setFormData({
      ...formData,
      location: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate back to profile
      navigate("/profil/me");
    }, 1500);
  };

  const locations = [
    { value: "jakarta-timur", label: "Jakarta Timur" },
    { value: "jakarta-barat", label: "Jakarta Barat" },
    { value: "jakarta-selatan", label: "Jakarta Selatan" },
    { value: "jakarta-utara", label: "Jakarta Utara" },
    { value: "jakarta-pusat", label: "Jakarta Pusat" },
    { value: "bandung", label: "Bandung" },
    { value: "surabaya", label: "Surabaya" },
    { value: "medan", label: "Medan" },
    { value: "semarang", label: "Semarang" },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/profil/me">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Profil
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <User className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900">Edit Profil</h1>
          </div>
          <p className="text-gray-600">
            Perbarui informasi profil dan pengaturan akun kamu
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Foto Profil
              </CardTitle>
              <CardDescription>
                Upload foto profil baru atau ganti yang sudah ada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={formData.avatar} />
                  <AvatarFallback className="text-2xl">
                    {formData.firstName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button type="button" variant="outline">
                    <Camera className="h-4 w-4 mr-2" />
                    Ganti Foto
                  </Button>
                  <p className="text-sm text-gray-600">
                    JPG, PNG atau GIF. Maksimal 5MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informasi Pribadi
              </CardTitle>
              <CardDescription>
                Update informasi dasar tentang diri kamu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nama Depan *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nama Belakang</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Ceritain sedikit tentang diri kamu..."
                />
                <p className="text-sm text-gray-500">
                  {formData.bio.length}/150 karakter
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Informasi Kontak
              </CardTitle>
              <CardDescription>
                Update email dan nomor telepon untuk komunikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor HP</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Lokasi
              </CardTitle>
              <CardDescription>
                Set lokasi untuk memudahkan pengambilan donasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="location">Kota/Area *</Label>
                <Select
                  value={formData.location}
                  onValueChange={handleLocationChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih lokasi kamu" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.value} value={location.value}>
                        {location.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>
                Atur notifikasi yang ingin kamu terima
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <h4 className="font-medium">Notifikasi Chat</h4>
                  <p className="text-sm text-gray-600">
                    Terima notifikasi untuk pesan baru
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Aktif
                </Button>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <h4 className="font-medium">Notifikasi Donasi</h4>
                  <p className="text-sm text-gray-600">
                    Notifikasi saat ada yang tertarik dengan donasi kamu
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Aktif
                </Button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="font-medium">Email Mingguan</h4>
                  <p className="text-sm text-gray-600">
                    Ringkasan aktivitas mingguan via email
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Nonaktif
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Privasi</CardTitle>
              <CardDescription>
                Kontrol siapa yang bisa melihat profil dan aktivitas kamu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <h4 className="font-medium">Profil Publik</h4>
                  <p className="text-sm text-gray-600">
                    Semua orang bisa melihat profil kamu
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Aktif
                </Button>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <h4 className="font-medium">Riwayat Donasi</h4>
                  <p className="text-sm text-gray-600">
                    Tampilkan riwayat donasi di profil
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Terlihat
                </Button>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <h4 className="font-medium">Status Online</h4>
                  <p className="text-sm text-gray-600">
                    Tampilkan status online ke pengguna lain
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Aktif
                </Button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="font-medium">Kontak Langsung</h4>
                  <p className="text-sm text-gray-600">
                    Izinkan orang lain menghubungi via WhatsApp
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Nonaktif
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Management */}
          <Card>
            <CardHeader>
              <CardTitle>Manajemen Akun</CardTitle>
              <CardDescription>Pengaturan akun dan keamanan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <h4 className="font-medium">Ubah Password</h4>
                  <p className="text-sm text-gray-600">
                    Update password untuk keamanan akun
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Ubah
                </Button>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <h4 className="font-medium">Verifikasi Akun</h4>
                  <p className="text-sm text-gray-600">
                    Verifikasi identitas untuk badge "Terverifikasi"
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Mulai Verifikasi
                </Button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="font-medium">Deaktivasi Akun</h4>
                  <p className="text-sm text-gray-600">
                    Matikan akun secara sementara
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  Deaktivasi
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-6 border-t">
            <Link to="/profil/me">
              <Button type="button" variant="outline">
                Batal
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Perubahan
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditProfile;
