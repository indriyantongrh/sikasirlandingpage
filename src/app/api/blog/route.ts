import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: List all posts (published only for public, all for admin)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const admin = searchParams.get("admin") === "true";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");
  const offset = (page - 1) * limit;

  let query = supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (!admin) {
    query = query.eq("is_published", true);
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    posts: data,
    total: count,
    totalPages: Math.ceil((count || 0) / limit),
    currentPage: page,
  });
}

// POST: Create new post
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password, ...postData } = body;

  if (password !== process.env.BLOG_ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Auto-generate slug from title
  if (!postData.slug) {
    postData.slug = postData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert(postData)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
