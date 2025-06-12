import { useState } from "react";
import Layout from "@/components/Layout";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Send, Paperclip, Smile, Circle, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

const ChatPage = () => {
  usePageTitle("Chat");

  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [showGiveItemButton, setShowGiveItemButton] = useState(true); // Show when someone requested an item

  const chatList = [
    {
      id: 1,
      name: "Sarah Martinez",
      avatar: "/placeholder.svg",
      lastMessage: "Hai! Jaket musim dinginnya masih ada gak?",
      time: "2 menit lalu",
      unread: 2,
      online: true,
      productTitle: "Koleksi Jaket Musim Dingin",
      hasRequested: true, // User has requested this item
      itemStatus: "available", // available, given, completed
    },
    {
      id: 2,
      name: "Ahmad Rahman",
      avatar: "/placeholder.svg",
      lastMessage: "Makasih banget buat bukunya!",
      time: "1 jam lalu",
      unread: 0,
      online: false,
      productTitle: "Buku Pendidikan Anak",
      hasRequested: false,
      itemStatus: "completed",
    },
    {
      id: 3,
      name: "Lina Kusuma",
      avatar: "/placeholder.svg",
      lastMessage: "Kapan nih enaknya ambil barangnya?",
      time: "3 jam lalu",
      unread: 1,
      online: true,
      productTitle: "Set Peralatan Dapur",
      hasRequested: true,
      itemStatus: "given", // Already given, arranging pickup
    },
    {
      id: 4,
      name: "Budi Santoso",
      avatar: "/placeholder.svg",
      lastMessage: "Oke! Nanti aku dateng besok jam 2 siang ya",
      time: "Kemarin",
      unread: 0,
      online: false,
      productTitle: "Laptop untuk Pelajar",
      hasRequested: false,
      itemStatus: "completed",
    },
  ];

  const messages = [
    {
      id: 1,
      senderId: 2,
      senderName: "Sarah Martinez",
      content:
        "Hai! Aku liat postingan kamu tentang jaket musim dingin. Masih ada gak?",
      time: "10:30",
      isMe: false,
    },
    {
      id: 2,
      senderId: 1,
      senderName: "Me",
      content: "Masih dong! Aku punya 5 jaket dengan berbagai ukuran.",
      time: "10:32",
      isMe: true,
    },
    {
      id: 3,
      senderId: 2,
      senderName: "Sarah Martinez",
      content:
        "Wah bagus banget! Aku kelola shelter lokal nih dan lagi persiapan buat musim dingin. Bisa ceritain lebih detail gak soal ukurannya?",
      time: "10:35",
      isMe: false,
    },
    {
      id: 4,
      senderId: 1,
      senderName: "Me",
      content:
        "Tentu! Ada 2 dewasa ukuran L, 1 dewasa ukuran M, 1 anak ukuran 8, sama 1 anak ukuran 6. Semua masih bagus banget kondisinya.",
      time: "10:37",
      isMe: true,
    },
    {
      id: 5,
      senderId: 2,
      senderName: "Sarah Martinez",
      content:
        "Perfect banget! Ukuran-ukuran itu bakal sangat membantu. Kapan enaknya aku ambil?",
      time: "10:40",
      isMe: false,
    },
    {
      id: 6,
      senderId: 1,
      senderName: "Me",
      content:
        "Aku free hari kerja dari jam 9 pagi sampai 5 sore. Besok sore gimana?",
      time: "10:42",
      isMe: true,
    },
    {
      id: 7,
      senderId: 2,
      senderName: "Sarah Martinez",
      content: "Hai! Jaket musim dinginnya masih ada gak?",
      time: "Baru aja",
      isMe: false,
    },
  ];

  const selectedChatData = chatList.find((chat) => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleGiveItem = () => {
    // Handle giving item to the requester
    console.log("Giving item to:", selectedChatData?.name);
    setShowGiveItemButton(false);
    // In real app, this would update the database and send a notification
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex-1 grid lg:grid-cols-12 gap-0 overflow-hidden">
          {/* Chat List */}
          <div className="lg:col-span-4 flex flex-col border-r border-gray-200">
            <div className="flex-1 flex flex-col min-h-0">
              {/* Fixed Header */}
              <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
                <h2 className="text-lg font-semibold">Pesan</h2>
              </div>

              {/* Scrollable Chat List */}
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-0">
                  {chatList.map((chat) => (
                    <div
                      key={chat.id}
                      className={cn(
                        "flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors",
                        selectedChat === chat.id &&
                          "bg-blue-50 border-r-2 border-blue-400",
                      )}
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={chat.avatar} />
                          <AvatarFallback>
                            {chat.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <Circle className="absolute -bottom-1 -right-1 h-4 w-4 fill-green-500 text-green-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-sm truncate">
                            {chat.name}
                          </h3>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <span className="text-xs text-gray-500">
                              {chat.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">
                            {chat.lastMessage}
                          </p>
                          {chat.unread > 0 && (
                            <div className="bg-blue-400 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 ml-2">
                              {chat.unread}
                            </div>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {chat.productTitle}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-8 flex flex-col min-h-0">
            <div className="h-full flex flex-col">
              {/* Fixed Chat Header */}
              <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={selectedChatData?.avatar} />
                        <AvatarFallback>
                          {selectedChatData?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {selectedChatData?.online && (
                        <Circle className="absolute -bottom-1 -right-1 h-4 w-4 fill-green-500 text-green-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {selectedChatData?.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {selectedChatData?.online
                          ? "Online"
                          : "Terakhir online 2 jam lalu"}
                      </p>
                    </div>
                  </div>
                </div>
                {selectedChatData?.productTitle && (
                  <div className="mt-2 flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      Tentang: {selectedChatData.productTitle}
                    </Badge>
                    <div className="h-6 flex items-center">
                      {selectedChatData?.hasRequested &&
                        selectedChatData?.itemStatus === "available" &&
                        showGiveItemButton && (
                          <Button
                            size="sm"
                            onClick={handleGiveItem}
                            className="bg-green-500 hover:bg-green-600 h-6 px-3 text-xs"
                          >
                            <Gift className="h-3 w-3 mr-1" />
                            Berikan Barang
                          </Button>
                        )}
                      {selectedChatData?.itemStatus === "given" && (
                        <Badge className="bg-orange-100 text-orange-800 text-xs h-6 flex items-center">
                          Barang Sudah Diberikan
                        </Badge>
                      )}
                      {selectedChatData?.itemStatus === "completed" && (
                        <Badge className="bg-green-100 text-green-800 text-xs h-6 flex items-center">
                          Transaksi Selesai
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Scrollable Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.isMe ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                        message.isMe
                          ? "bg-blue-400 text-white"
                          : "bg-gray-100 text-gray-900",
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={cn(
                          "text-xs mt-1",
                          message.isMe ? "text-blue-100" : "text-gray-500",
                        )}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fixed Message Input */}
              <div className="flex-shrink-0 border-t border-gray-200 p-4 bg-white">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Ketik pesan..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />
                  </div>
                  <Button variant="ghost" size="icon">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
