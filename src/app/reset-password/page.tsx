"use client";

import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { createHash } from "crypto";

// ----------------------------
// FIREBASE CONFIG
// ----------------------------
const firebaseConfig = {
  apiKey: "AIzaSyD9sgDL4BXnCqK1CLb53ENCOSD8FjpsTXU",
  authDomain: "kasirlaundryapps.firebaseapp.com",
  projectId: "kasirlaundryapps",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ----------------------------
// HASH PASSWORD (SHA256)
// ----------------------------
function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

// ----------------------------
// CARI UID BERDASARKAN EMAIL
// ----------------------------
async function getUidByEmail(email: string): Promise<string | null> {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email.toLowerCase()));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return snapshot.docs[0].id; // UID dokumen user
}

// ----------------------------
// PAGE COMPONENT
// ----------------------------
export default function ResetPasswordPage() {
  const [oobCode, setOobCode] = useState<string | null>(null);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // show/hide password
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOobCode(params.get("oobCode"));
  }, []);

  // ----------------------------
  // HANDLE RESET PASSWORD
  // ----------------------------
  const handleReset = async () => {
    setStatus("");

    if (!oobCode) {
      setStatus("Kode reset tidak ditemukan.");
      return;
    }

    if (newPass !== confirmPass) {
      setStatus("Password tidak sesuai.");
      return;
    }

    setLoading(true);

    try {
      // 1. Validasi oobCode & ambil email target
      const email = await verifyPasswordResetCode(auth, oobCode);

      // 2. Reset password Firebase Auth
      await confirmPasswordReset(auth, oobCode, newPass);

      // 3. Hash password dengan SHA256 (cocok Flutter)
      const hashed = hashPassword(newPass);

      // 4. Cari UID berdasarkan email
      const uid = await getUidByEmail(email);

      if (!uid) {
        setStatus("Akun tidak ditemukan di Firestore.");
        setLoading(false);
        return;
      }

      // 5. Update passwordHash di users/{uid}
      await setDoc(
        doc(db, "users", uid),
        { password: hashed },
        { merge: true }
      );

      setStatus("Password berhasil direset! Silakan login.");
    } catch (err) {
      if (err instanceof Error) {
        setStatus("Terjadi kesalahan: " + err.message);
      } else {
        setStatus("Terjadi kesalahan yang tidak diketahui.");
      }
    }

    setLoading(false);
  };

  // ----------------------------
  // UI COMPONENT
  // ----------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">

        <h2 className="text-xl font-semibold text-gray-900 text-center">
          Atur Password Baru
        </h2>
        <p className="text-gray-500 text-center mt-1 mb-6 text-sm">
          Buat password baru untuk akun Anda.
        </p>

        {/* PASSWORD */}
        <label className="block text-sm mb-1">Password Baru</label>
        <div className="relative mb-4">
          <input
            type={showPass ? "text" : "password"}
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        </div>

        {/* CONFIRM PASSWORD */}
        <label className="block text-sm mb-1">Konfirmasi Password</label>
        <div className="relative mb-6">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none"
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showConfirm ? "🙈" : "👁️"}
          </button>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
        >
          {loading ? "Memproses..." : "Konfirmasi"}
        </button>

        {/* STATUS */}
        {status && (
          <p className="text-center mt-4 text-sm text-blue-700">{status}</p>
        )}

        <div className="mt-8 text-center">
          <a href="/login" className="text-blue-700 text-sm hover:underline">
            Kembali ke halaman login
          </a>
        </div>
      </div>
    </div>
  );
}
