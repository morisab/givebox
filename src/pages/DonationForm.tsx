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
  SelectItem,
  SelectContent,
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
import api from "@/lib/api";

const categories = [
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
  const [error, setError] = useState<string | null>(null);

  const conditions = [
    { value: "5", label: "Baru" },
    { value: "4", label: "Seperti Baru" },
    { value: "3", label: "Kondisi Bagus" },
    { value: "2", label: "Kondisi Lumayan" },
    { value: "1", label: "Perlu Perbaikan Kecil" },
  ];

  const locations = [
    { value: "Jakarta", label: "Jakarta" },
    { value: "Bandung", label: "Bandung" },
    { value: "Surabaya", label: "Surabaya" },
    { value: "Medan", label: "Medan" },
    { value: "Semarang", label: "Semarang" },
    { value: "Makassar", label: "Makassar" },
    { value: "Palembang", label: "Palembang" },
    { value: "Yogyakarta", label: "Yogyakarta" },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!formData.title.trim()) {
      setError("Judul donasi harus diisi.");
      return;
    }
    if (!formData.description.trim()) {
      setError("Deskripsi donasi harus diisi.");
      return;
    }
    if (!formData.category) {
      setError("Kategori harus dipilih.");
      return;
    }
    if (!formData.condition) {
      setError("Kondisi barang harus dipilih.");
      return;
    }
    if (!formData.location) {
      setError("Kota harus dipilih.");
      return;
    }

    // Map formData to API payload
    const payload = {
      name: formData.title.trim(),
      description: formData.description.trim(),
      category_id: formData.category,
      condition: parseInt(formData.condition, 10),
      quantity_description: formData.quantity.trim() || null,
      pick_city: formData.location,
      pick_address: formData.exactLocation.trim() || null,
      picking_status:
        formData.pickupAvailable && formData.deliveryAvailable
          ? "both"
          : formData.pickupAvailable
          ? "pick"
          : formData.deliveryAvailable
          ? "delivery"
          : "pick", // Default to "pick" if neither is selected
      delivery_time: formData.preferredPickupTime.trim() || null,
      is_urgent: formData.urgentNeed,
      additional_note: formData.additionalNotes.trim() || null,
      // Images are not included as per your note
    };

    try {
      const res = await api.post("/donation/donated-item/open", payload);
      console.log("Donation created:", (res as any).data?.data);
      alert("Donasi berhasil diposting!");
      navigate("/donasi");
    } catch (err: any) {
      console.error("Gagal membuat donasi:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Gagal membuat donasi. Silakan coba lagi.";
      setError(errorMessage);
    }
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

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

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
                    onValueChange={(value) => handleSelectChange("category", value)}
                    required
                    value={formData.category}
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
                    required
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
                (maksimal 5 foto, tidak diunggah ke server)
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
                    Drag dan drop file ke sini, atau klik buat pilih (hanya untuk
                    pratinjau)
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
                    required
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