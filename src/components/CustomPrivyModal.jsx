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
      await connect({ provider: "metamask" });
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

  const handleRainbowLogin = async () => {
    try {
      await connect({ provider: "rainbow" });
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[200]">
      <div className="bg-[#F3F4F6] rounded-[2rem] shadow-2xl p-8 w-[400px] relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/50 border border-gray-200 rounded-full hover:bg-white text-gray-500 hover:text-gray-800 transition-all shadow-sm"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <h2 className="text-xl font-black text-gray-800 mb-8 text-center mt-2 tracking-tight">Log in or sign up</h2>

        <div className="flex flex-col gap-3">
          {/* Wallet Options */}
          <button
            onClick={handleCoinbaseLogin}
            className="w-full py-4 px-6 bg-white border border-gray-100 rounded-2xl flex items-center justify-between hover:border-[#0052FF] hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-700">Coinbase Wallet</span>
            </div>
          </button>

          <button
            onClick={handleMetaMaskLogin}
            className="w-full py-4 px-6 bg-white border border-gray-100 rounded-2xl flex items-center justify-between hover:border-[#00AFAA] hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-700">MetaMask</span>
            </div>
          </button>

          <button
            onClick={handleRainbowLogin}
            className="w-full py-4 px-6 bg-white border border-gray-100 rounded-2xl flex items-center justify-between hover:border-[#E84393] hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-700">Rainbow</span>
            </div>
          </button>

          <button
            onClick={handlePhantomLogin}
            className="w-full py-4 px-6 bg-white border border-gray-100 rounded-2xl flex items-center justify-between hover:border-[#AB9FF2] hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-700">Phantom</span>
            </div>
          </button>

          <button
            onClick={handleWalletConnectLogin}
            className="w-full py-4 px-6 bg-white border border-gray-100 rounded-2xl flex items-center justify-between hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-700">Other wallets</span>
            </div>
          </button>

          <div className="h-px bg-gray-200 my-4"></div>

          {/* Social Options */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleGoogleLogin}
              className="py-3 px-4 bg-white border border-gray-100 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all font-bold text-sm text-gray-600"
            >
              Google
            </button>
            <button
              onClick={handleTwitterLogin}
              className="py-3 px-4 bg-white border border-gray-100 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all font-bold text-sm text-gray-600"
            >
              Twitter
            </button>
          </div>
        </div >

        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            Protected by <span className="text-[#00AFAA]">Privy</span>
          </p>
        </div>
      </div >
    </div >
  );
}
