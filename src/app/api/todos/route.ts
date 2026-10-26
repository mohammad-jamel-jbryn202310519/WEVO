import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("todos").select("*").order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message, code: error.code }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = body?.name;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ success: false, error: "اسم العنصر مطلوب" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("todos")
      .insert([{ name: name.trim() }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message, code: error.code }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
