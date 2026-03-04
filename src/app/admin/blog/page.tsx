"use client";

import { useState, useEffect, useCallback } from "react";
import Container from "@/components/Container";
import { BlogPost } from "@/lib/supabase";

export default function AdminBlogPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Tips Bisnis",
    read_time: "5 menit",
    cover_emoji: "📝",
    is_published: false,
  });

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/blog?admin=true&limit=50");
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn) fetchPosts();
  }, [isLoggedIn, fetchPosts]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) setIsLoggedIn(true);
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Tips Bisnis",
      read_time: "5 menit",
      cover_emoji: "📝",
      is_published: false,
    });
    setEditingPost(null);
    setShowForm(false);
  };

  const handleEdit = (post: BlogPost) => {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      category: post.category,
      read_time: post.read_time,
      cover_emoji: post.cover_emoji || "📝",
      is_published: post.is_published,
    });
    setEditingPost(post);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = editingPost ? `/api/blog/${editingPost.id}` : "/api/blog";
    const method = editingPost ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, password }),
    });

    if (res.ok) {
      resetForm();
      fetchPosts();
    } else {
      const err = await res.json();
      alert(err.error || "Gagal menyimpan");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus artikel ini?")) return;
    setLoading(true);
    await fetch(`/api/blog/${id}?password=${encodeURIComponent(password)}`, {
      method: "DELETE",
    });
    fetchPosts();
  };

  const handleTogglePublish = async (post: BlogPost) => {
    await fetch(`/api/blog/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        is_published: !post.is_published,
        password,
      }),
    });
    fetchPosts();
  };

  if (!isLoggedIn) {
    return (
      <div className="py-20 md:py-28">
        <Container>
          <div className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold text-center mb-8">Admin Blog</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Password admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Masuk
              </button>
            </form>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-20 md:py-28">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Admin Blog</h1>
            <button
              onClick={() => { resetForm(); setShowForm(!showForm); }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {showForm ? "Batal" : "+ Artikel Baru"}
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-6 mb-8 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Judul</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug (auto jika kosong)</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="auto-generated-dari-judul"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ringkasan</label>
                <input
                  type="text"
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Konten (gunakan ## untuk heading, - untuk list)
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={15}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Kategori</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option>Tips Bisnis</option>
                    <option>Teknologi</option>
                    <option>Marketing</option>
                    <option>Manajemen</option>
                    <option>Tutorial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Waktu Baca</label>
                  <input
                    type="text"
                    value={form.read_time}
                    onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Emoji Cover</label>
                  <input
                    type="text"
                    value={form.cover_emoji}
                    onChange={(e) => setForm({ ...form, cover_emoji: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_published}
                      onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Publish</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : editingPost ? "Update Artikel" : "Simpan Artikel"}
              </button>
            </form>
          )}

          {/* Posts List */}
          {loading && !showForm ? (
            <p className="text-center text-gray-500">Memuat...</p>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <div key={post.id} className="bg-white border rounded-xl p-4 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded ${post.is_published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {post.is_published ? "Published" : "Draft"}
                      </span>
                      <span className="text-xs text-gray-400">{post.category}</span>
                    </div>
                    <h3 className="font-semibold truncate">{post.title}</h3>
                    <p className="text-xs text-gray-400">
                      {new Date(post.created_at).toLocaleDateString("id-ID")}
                      {" · "}/{post.slug}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <button
                      onClick={() => handleTogglePublish(post)}
                      className={`text-xs px-3 py-1.5 rounded-lg transition ${
                        post.is_published
                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {post.is_published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-xs px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-xs px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
