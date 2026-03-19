import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";



export default function CustomPrivyModal({ isOpen, onClose }) {
  const { connect, currentUser } = usePrivy();
  const [walletConnector, setWalletConnector] = useState(null);

  useEffect(() => {
    if (currentUser && isOpen) {
      onClose(); // close modal if user is logged in
    }
  }, [currentUser, isOpen, onClose]);

  if (!isOpen) return null;

  const handleMetaMaskLogin = async () => {
    try {
      await connect({ provider: "injected" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleWalletConnectLogin = async () => {
    try {
      const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: QRCodeModal,
      });

      if (!connector.connected) {
        await connector.createSession();
      }

      connector.on("connect", (error, payload) => {
        if (error) throw error;
        console.log("Connected:", payload.params[0]);
      });

      setWalletConnector(connector);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await connect({ provider: "google" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCoinbaseLogin = async () => {
    try {
      await connect({ provider: "coinbase_wallet" });
    } catch (err) {
      console.error(err);
    }
  };

  const handlePhantomLogin = async () => {
    try {
      await connect({ provider: "phantom" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleTwitterLogin = async () => {
    try {
      await connect({ provider: "twitter" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <button
          onClick={handleMetaMaskLogin}
          className="w-full py-3 mb-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          MetaMask
        </button>

        <button
          onClick={handleCoinbaseLogin}
          className="w-full py-3 mb-3 rounded-lg border border-gray-300 bg-[#0052FF] text-white hover:bg-[#0047E0] transition"
        >
          Coinbase Wallet
        </button>

        <button
          onClick={handlePhantomLogin}
          className="w-full py-3 mb-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          Phantom
        </button>

        <button
          onClick={handleWalletConnectLogin}
          className="w-full py-3 mb-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          Other Wallets (Desktop/Mobile)
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 mb-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          Google
        </button>

        <button
          onClick={handleTwitterLogin}
          className="w-full py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          Twitter
        </button>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
}