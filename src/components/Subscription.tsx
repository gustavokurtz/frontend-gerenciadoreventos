import { useState } from "react";
import axios from "axios";

interface SubscriptionData {
  name: string;
  email: string;
}

const Subscription = () => {
  const [formData, setFormData] = useState<SubscriptionData>({
    name: "",
    email: "",
  });
  const [prettyName, setPrettyName] = useState("");
  // const [userId, setUserId] = useState<number | undefined>();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prettyName) {
      setMessage("❌ Você precisa inserir o nome do evento.");
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const url = `https://revinfinity.pro/subscription/${prettyName}`;
      const response = await axios.post(url, formData);
      if (response.status === 200) {
        const userIdFromApi = response.data?.subscriptionNumber;
        if (userIdFromApi) {
          // setUserId(userIdFromApi);
          setMessage(
            `✅ Inscrição realizada com sucesso! Seu ID: ${userIdFromApi}`
          );
        } else {
          setMessage(
            "❌ Inscrição realizada, mas não foi possível encontrar o ID do usuário."
          );
        }
      } else {
        setMessage("❌ Erro ao realizar a inscrição.");
      }
    } catch (error) {
      console.error("Erro ao realizar inscrição:", error);
      setMessage("❌ Erro ao realizar a inscrição. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📝 Inscrição no Evento</h2>
      {message && (
        <p className="text-center mb-4 text-green-600">{message}</p>
      )}
      <form
        onSubmit={handleSubscription}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4"
      >
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            🔍 PrettyName do Evento:
          </label>
          <input
            type="text"
            value={prettyName}
            onChange={(e) => setPrettyName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            👤 Nome:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            📧 E-mail:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#8234E9] hover:bg-[#8234E9] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? "Cadastrando..." : "Criar Inscrição"}
        </button>
      </form>
      {/* {userId && (
        // <p className="text-center text-gray-700">
        //   🏆 Seu link de afiliado:{" "}
        //   <strong>{`https://revinfinity.pro/subscription/${prettyName}/${userId}`}</strong>
        // </p>
      )} */}
    </div>
  );
};

export default Subscription;
