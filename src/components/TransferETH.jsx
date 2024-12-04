import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useState } from "react";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

export default function TransferETH() {
  const { data: hash, sendTransaction } = useSendTransaction();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const to = formData.get("address");
    const value = formData.get("value");

    try {
      setLoading(true);
      setError(null);
      const client = createPublicClient({
        chain: sepolia,
        transport: http(
          "https://eth-sepolia.g.alchemy.com/v2/FQLza3Pw812rsFJyGWZvPsJXGzRvnWNv"
        ),
      });
      const tx = await sendTransaction({
        to,
        value: parseEther(value),
      });
      console.log("Transaction sent, tx:", tx);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3>Transfer ETH</h3>
      <form onSubmit={submit}>
        <input
          name="address"
          placeholder="Recipient Address (0x...)"
          required
        />
        <input name="value" placeholder="Amount (ETH)" required />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
