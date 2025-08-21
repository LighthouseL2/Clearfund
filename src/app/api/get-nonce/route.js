import { db } from "@/lib/firebaseAdmin";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req) {
  const { wallet } = await req.json();
  if (!wallet) {
    return new Response(JSON.stringify({ error: "Wallet required" }), { status: 400 });
  }

  const nonce = Math.floor(Math.random() * 1000000).toString();
  const ref = doc(db, "walletNonces", wallet);

  await setDoc(ref, {
    nonce,
    createdAt: serverTimestamp(),
  });

  return new Response(JSON.stringify({ nonce }), { status: 200 });
}