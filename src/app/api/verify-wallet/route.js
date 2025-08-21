import { db } from "@/lib/firebaseAdmin";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { verifyMessage } from "ethers";

export async function POST(req) {
  const { wallet, signature } = await req.json();

  const ref = doc(db, "walletNonces", wallet);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    return new Response(JSON.stringify({ error: "Nonce not found" }), { status: 400 });
  }

  const { nonce, createdAt } = snap.data();

  const now = Date.now();
  if (createdAt && now - createdAt.toMillis() > 5 * 60 * 1000) {
    await deleteDoc(ref);
    return new Response(JSON.stringify({ error: "Nonce expired" }), { status: 400 });
  }

  const recovered = verifyMessage(`Login nonce: ${nonce}`, signature);
  if (recovered.toLowerCase() !== wallet.toLowerCase()) {
    return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 400 });
  }

  await deleteDoc(ref);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}