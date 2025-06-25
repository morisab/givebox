import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import api from "@/lib/api";

const ChatPage = () => {
  usePageTitle("Chat");
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);

  // Pastikan initial state adalah array
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState(null);

  // Check if redirected from ProductDetails with a new conversation
  const newConversation = location.state?.newConversation;

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      setLoadingConversations(true);
      setError(null);
      try {
        const res = await api.get("/chat/conversation");
        
        // Lebih defensive dalam menghandle response
        const responseData = res.data;
        let conversationData = [];
        
        if (responseData && typeof responseData === 'object' && 'data' in responseData && Array.isArray((responseData as any).data)) {
          conversationData = (responseData as any).data;
        } else if (responseData && Array.isArray(responseData)) {
          conversationData = responseData;
        }
        
        console.log("Conversations data:", conversationData);
        setConversations(conversationData);
        
        // If redirected from ProductDetails, select the new conversation
        if (newConversation && conversationData.length > 0) {
          const matchingConvo = conversationData.find(
            (convo) => convo.id === newConversation.id
          );
          if (matchingConvo) {
            setSelectedConversationId(matchingConvo.id);
          }
        } else if (conversationData.length > 0) {
          // Select the first conversation by default
          setSelectedConversationId(conversationData[0].id);
        }
      } catch (err) {
        console.error("Gagal memuat daftar percakapan:", err);
        setError("Gagal memuat daftar percakapan");
        setConversations([]); // Pastikan tetap array saat error
      } finally {
        setLoadingConversations(false);
      }
    };

    fetchConversations();
  }, [newConversation]);

  // Fetch messages for the selected conversation
  useEffect(() => {
    if (!selectedConversationId) return;

    const fetchMessages = async () => {
      setLoadingMessages(true);
      setError(null);
      try {
        const res = await api.get(
          `/chat/conversation/${selectedConversationId}/message`,
          {
            params: { page: 1, per_page: 10 },
          }
        );
        
        // Defensive handling untuk messages juga
        const responseData = res.data;
        let messageData = [];
        
        if (responseData && typeof responseData === 'object' && 'data' in responseData) {
          const nestedData = (responseData as any).data;
          if (nestedData && typeof nestedData === 'object' && 'data' in nestedData && Array.isArray((nestedData as any).data)) {
            messageData = (nestedData as any).data;
          } else if (Array.isArray(nestedData)) {
            messageData = nestedData;
          }
        } else if (Array.isArray(responseData)) {
          messageData = responseData;
        }
        
        console.log("Messages data:", messageData);
        setMessages(messageData);
      } catch (err) {
        console.error("Gagal memuat pesan:", err);
        setError("Gagal memuat pesan");
        setMessages([]); // Pastikan tetap array saat error
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [selectedConversationId]);

  // Scroll to the bottom of messages when they update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversationId) return;

    try {
      const res = await api.post("/chat/send", {
        conversation_id: selectedConversationId,
        message_content: newMessage,
      });
      
      const responseData = res.data;
      const newMsg = (responseData && typeof responseData === 'object' && 'data' in responseData) 
        ? (responseData as any).data 
        : responseData;
      
      setMessages((prev) => [
        ...prev,
        {
          id: newMsg.id,
          message_content: newMsg.message_content,
          message_created_at: newMsg.message_created_at,
          is_mine: true,
        },
      ]);
      setNewMessage("");
      
      // Update conversation's latest message
      setConversations((prev) =>
        prev.map((convo) =>
          convo.id === selectedConversationId
            ? {
                ...convo,
                latest_message_content: newMsg.message_content,
                latest_message_created_at: newMsg.message_created_at,
              }
            : convo
        )
      );
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
      alert("Gagal mengirim pesan");
    }
  };

  // Handle giving item (placeholder; assumes an API endpoint)
  const handleGiveItem = async () => {
    if (!selectedConversationId) return;

    try {
      await api.post("/donation/give-item", {
        conversation_id: selectedConversationId,
      });
      
      setConversations((prev) =>
        prev.map((convo) =>
          convo.id === selectedConversationId
            ? { ...convo, itemStatus: "given" }
            : convo
        )
      );
      alert("Barang berhasil diberikan!");
    } catch (err) {
      console.error("Gagal memberikan barang:", err);
      alert("Gagal memberikan barang");
    }
  };

  // Gunakan defensive programming untuk find
  const selectedConversation = Array.isArray(conversations) 
    ? conversations.find((convo) => convo.id === selectedConversationId)
    : null;

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
                {loadingConversations ? (
                  <div className="p-4 text-center text-gray-600">
                    Memuat percakapan...
                  </div>
                ) : error ? (
                  <div className="p-4 text-center text-red-600">{error}</div>
                ) : !Array.isArray(conversations) || conversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-600">
                    Tidak ada percakapan
                  </div>
                ) : (
                  <div className="space-y-0">
                    {conversations.map((chat) => (
                      <div
                        key={chat.id}
                        className={cn(
                          "flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors",
                          selectedConversationId === chat.id &&
                            "bg-blue-50 border-r-2 border-blue-400"
                        )}
                        onClick={() => setSelectedConversationId(chat.id)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {chat.message_receiver_name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("") || "NN"}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-sm truncate">
                              {chat.message_receiver_name || "Unknown"}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {chat.latest_message_created_at
                                ? new Date(
                                    chat.latest_message_created_at
                                  ).toLocaleTimeString("id-ID", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : ""}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 truncate">
                              {chat.latest_message_content || "Tidak ada pesan"}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {chat.donated_item_name || "Item tidak diketahui"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-8 flex flex-col min-h-0">
            <div className="h-full flex flex-col">
              {/* Fixed Chat Header */}
              <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white">
                {selectedConversation ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {selectedConversation.message_receiver_name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "NN"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {selectedConversation.message_receiver_name || "Unknown"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Terakhir online{" "}
                          {selectedConversation.latest_message_created_at
                            ? new Date(
                                selectedConversation.latest_message_created_at
                              ).toLocaleString("id-ID", {
                                dateStyle: "short",
                                timeStyle: "short",
                              })
                            : "Tidak diketahui"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        Tentang: {selectedConversation.donated_item_name || "Item tidak diketahui"}
                      </Badge>
                      <div className="h-6 flex items-center">
                        {selectedConversation?.itemStatus === "available" && (
                          <Button
                            size="sm"
                            onClick={handleGiveItem}
                            className="bg-green-500 hover:bg-green-600 h-6 px-3 text-xs"
                          >
                            <Gift className="h-3 w-3 mr-1" />
                            Berikan Barang
                          </Button>
                        )}
                        {selectedConversation?.itemStatus === "given" && (
                          <Badge className="bg-orange-100 text-orange-800 text-xs h-6 flex items-center">
                            Barang Sudah Diberikan
                          </Badge>
                        )}
                        {selectedConversation?.itemStatus === "completed" && (
                          <Badge className="bg-green-100 text-green-800 text-xs h-6 flex items-center">
                            Transaksi Selesai
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-600">
                    Pilih percakapan untuk melihat pesan
                  </div>
                )}
              </div>

              {/* Scrollable Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {loadingMessages ? (
                  <div className="text-center text-gray-600">Memuat pesan...</div>
                ) : error ? (
                  <div className="text-center text-red-600">{error}</div>
                ) : !Array.isArray(messages) || messages.length === 0 ? (
                  <div className="text-center text-gray-600">
                    Tidak ada pesan
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.is_mine ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                          message.is_mine
                            ? "bg-blue-400 text-white"
                            : "bg-gray-100 text-gray-900"
                        )}
                      >
                        <p className="text-sm">{message.message_content}</p>
                        <p
                          className={cn(
                            "text-xs mt-1",
                            message.is_mine ? "text-blue-100" : "text-gray-500"
                          )}
                        >
                          {message.message_created_at
                            ? new Date(
                                message.message_created_at
                              ).toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Fixed Message Input */}
              <div className="flex-shrink-0 border-t border-gray-200 p-4 bg-white">
                {selectedConversation ? (
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
                ) : (
                  <div className="text-center text-gray-600">
                    Pilih percakapan untuk mengirim pesan
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;