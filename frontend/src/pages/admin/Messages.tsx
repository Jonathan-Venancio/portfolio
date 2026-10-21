import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "https://back.jonathanvenancio.site";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const MessagesAdmin: React.FC = () => {
  const { token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          setMessages(await response.json());
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [token]);

  if (loading) return <p>Carregando mensagens...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Mensagens do formulário</h2>
      {messages.length === 0 ? (
        <p className="text-gray-600">Nenhuma mensagem recebida.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((item) => (
            <li key={item.id} className="bg-white rounded-md shadow p-4">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.email}</p>
              <p className="text-xs text-gray-400 mb-2">{new Date(item.created_at).toLocaleString("pt-BR")}</p>
              <p className="whitespace-pre-wrap">{item.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessagesAdmin;
