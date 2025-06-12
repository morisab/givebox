import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "@/hooks/use-page-title";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  X,
  MapPin,
  Calendar,
  Package,
  Heart,
  ImageIcon,
  AlertCircle,
} from "lucide-react";

const DonationForm = () => {
  usePageTitle("Berbagi Donasi");

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    quantity: "",
    location: "",
    exactLocation: "",
    pickupAvailable: true,
    deliveryAvailable: false,
    preferredPickupTime: "",
    urgentNeed: false,
    additionalNotes: "",
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const categories = [
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

  const conditions = [
    { value: "new", label: "Baru" },
    { value: "like-new", label: "Seperti Baru" },
    { value: "good", label: "Kondisi Bagus" },
    { value: "fair", label: "Kondisi Lumayan" },
    { value: "needs-repair", label: "Perlu Perbaikan Kecil" },
  ];

  const locations = [
    { value: "jakarta", label: "Jakarta" },
    { value: "bandung", label: "Bandung" },
    { value: "surabaya", label: "Surabaya" },
    { value: "medan", label: "Medan" },
    { value: "semarang", label: "Semarang" },
    { value: "makassar", label: "Makassar" },
    { value: "palembang", label: "Palembang" },
    { value: "yogyakarta", label: "Yogyakarta" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setUploadedImages((prev) => [...prev, ...newImages].slice(0, 5)); // Max 5 images
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Donation form submitted:", formData);
    // Navigate to success page or products page
    navigate("/donasi");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
            <Heart className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Berbagi Donasi Kamu
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bantu bikin perbedaan di hidup orang lain dengan berbagi barang yang
            gak kepake lagi. Isi form di bawah buat posting donasi kamu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Info Dasar
              </CardTitle>
              <CardDescription>
                Ceritain tentang barang yang mau kamu donasiikan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="contoh: Jaket Musim Dingin untuk Anak"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Jelasin barang kamu secara detail - kondisi, ukuran, warna, dll."
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori *</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Kondisi *</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("condition", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kondisi" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem
                          key={condition.value}
                          value={condition.value}
                        >
                          {condition.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Jumlah/Banyaknya</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  placeholder="contoh: 3 jaket, 1 tas baju"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Foto-foto
              </CardTitle>
              <CardDescription>
                Tambahin foto biar yang mau nerima bisa liat barang kamu
                (maksimal 5 foto)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Upload Foto</p>
                  <p className="text-gray-600">
                    Drag dan drop file ke sini, atau klik buat pilih
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button type="button" variant="outline" asChild>
                      <span>Pilih File</span>
                    </Button>
                  </label>
                </div>
              </div>

              {/* Uploaded Images */}
              {uploadedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location & Pickup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Lokasi & Detail Pengambilan
              </CardTitle>
              <CardDescription>
                Bantu yang mau nerima tahu di mana dan gimana cara ambil
                barangnya
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Kota *</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("location", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kota kamu" />
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

                <div className="space-y-2">
                  <Label htmlFor="exactLocation">Area/Kelurahan</Label>
                  <Input
                    id="exactLocation"
                    name="exactLocation"
                    placeholder="contoh: Kemang, Jakarta Selatan"
                    value={formData.exactLocation}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pickupAvailable"
                    checked={formData.pickupAvailable}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "pickupAvailable",
                        checked as boolean,
                      )
                    }
                  />
                  <Label htmlFor="pickupAvailable">
                    Bisa diambil di tempat saya
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="deliveryAvailable"
                    checked={formData.deliveryAvailable}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "deliveryAvailable",
                        checked as boolean,
                      )
                    }
                  />
                  <Label htmlFor="deliveryAvailable">
                    Saya bisa antar dalam area sekitar
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredPickupTime">
                  Waktu Pengambilan yang Cocok
                </Label>
                <Input
                  id="preferredPickupTime"
                  name="preferredPickupTime"
                  placeholder="contoh: Hari kerja sore 14-18, Weekend pagi"
                  value={formData.preferredPickupTime}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Opsi Tambahan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgentNeed"
                  checked={formData.urgentNeed}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("urgentNeed", checked as boolean)
                  }
                />
                <Label htmlFor="urgentNeed" className="flex items-center gap-2">
                  Tandai sebagai urgent
                  <Badge variant="destructive" className="text-xs">
                    URGENT
                  </Badge>
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Catatan Tambahan</Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  placeholder="Instruksi khusus, syarat, atau info tambahan lainnya..."
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="border-blue-100 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-700 mb-2">
                    Panduan Donasi
                  </h3>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>
                      • Pastikan semua barang bersih dan masih bisa dipake
                    </li>
                    <li>• Jujur soal kondisi barang kamu</li>
                    <li>• Bales chat dari yang tertarik dengan cepat</li>
                    <li>
                      • Cuma posting barang yang beneran mau kamu kasih gratis
                    </li>
                    <li>
                      • Ikuti panduan keamanan saat ketemu yang mau nerima
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/donasi")}
            >
              Batal
            </Button>
            <Button type="submit" size="lg">
              Posting Donasi
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default DonationForm;
