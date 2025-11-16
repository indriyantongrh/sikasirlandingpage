"use client";

import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";

import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createHash } from "crypto";

// --- CONFIG FIREBASE ---
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};
// -----------------------------------

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export default function ResetPasswordPage() {
  const [oobCode, setOobCode] = useState<string | null>(null);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [status, setStatus] = useState("");

  // 👁️ state show/hide
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOobCode(params.get("oobCode"));
  }, []);

  const handleReset = async () => {
    setStatus("");

    if (!oobCode) {
      setStatus("Kode reset tidak ditemukan.");
      return;
    }

    if (newPass !== confirmPass) {
      setStatus("Password tidak sama.");
      return;
    }

    try {
      // validasi link
      const email = await verifyPasswordResetCode(auth, oobCode);

      // reset password firebase
      await confirmPasswordReset(auth, oobCode, newPass);

      // hash password
      const hashed = hashPassword(newPass);

      // simpan ke Firestore
      await setDoc(doc(db, "users", email), { passwordHash: hashed }, { merge: true });

      setStatus("Password berhasil direset! Silakan login pada aplikasi mobile.");
    } catch (err: unknown) {
        if (err instanceof Error) {
            setStatus("Terjadi kesalahan: " + err.message);
        } else {
            setStatus("Terjadi kesalahan yang tidak diketahui");
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center">

        {/* Judul */}
        <h2 className="text-xl font-semibold text-gray-800">
          Atur Password Baru
        </h2>
        <p className="text-gray-500 text-sm mt-1 mb-6">
          Password baru harus berbeda dari password sebelumnya.
        </p>

        {/* Form */}
        <div className="text-left">

          {/* Password Baru */}
          <label className="text-sm font-medium text-gray-700">
            Password Baru
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full mt-1 mb-4 px-4 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2"
            />

            {/* tombol mata */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                // eye-off
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.86
                    11.86 0 013.041-4.606M9.88 4.21A9.99 9.99 0 0112 4c5 0 9.27 
                    3.11 11 7.5a11.958 11.958 0 01-4.043 5.246M15 12a3 
                    3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 3l18 18" />
                </svg>
              ) : (
                // eye
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 
                    5c4.477 0 8.268 2.943 9.542 7-1.274 
                    4.057-5.065 7-9.542 7-4.477 
                    0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Konfirmasi Password */}
          <label className="text-sm font-medium text-gray-700">
            Konfirmasi Password Baru
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full mt-1 mb-6 px-4 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2"
            />

            {/* tombol mata */}
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showConfirm ? (
                // eye-off
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.86
                    11.86 0 013.041-4.606M9.88 4.21A9.99 9.99 0 0112 4c5 0 9.27 
                    3.11 11 7.5a11.958 11.958 0 01-4.043 5.246M15 12a3 
                    3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 3l18 18" />
                </svg>
              ) : (
                // eye
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 
                    5c4.477 0 8.268 2.943 9.542 7-1.274 
                    4.057-5.065 7-9.542 7-4.477 
                    0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full py-3 rounded-lg text-white font-medium transition"
          style={{ backgroundColor: "#0B58A2" }}
        >
          Konfirmasi
        </button>

        {status && (
          <p className="mt-4 text-sm" style={{ color: "#0B58A2" }}>
            {status}
          </p>
        )}

        <div className="mt-8">
          <a
            href="/login"
            className="text-sm flex items-center justify-center gap-1 hover:underline"
            style={{ color: "#0B58A2" }}
          >
            Kembali ke halaman login
          </a>
        </div>
      </div>
    </div>
  );
}
