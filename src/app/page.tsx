import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import WevoApp from "@/components/WevoApp";

export const dynamic = "force-dynamic";

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  let initialTodos: Array<{ id: number | string; name: string; is_complete?: boolean }> = [];
  let tableFound = true;
  let connectionMessage = "Connected successfully";

  try {
    const { data: todos, error } = await supabase.from("todos").select("*").order("created_at", { ascending: false });

    if (error) {
      if (error.code === "PGRST205") {
        tableFound = false;
        connectionMessage = "جدول todos غير موجود في Schema بعد. يمكن إنشاؤه عبر كود SQL الموضح.";
      } else {
        connectionMessage = error.message;
      }
      // Demo initial items if table is not yet migrated in Supabase
      initialTodos = [
        { id: 1, name: "تهيئة بيئة Next.js و Node.js", is_complete: true },
        { id: 2, name: "ربط Supabase مع GitHub", is_complete: true },
        { id: 3, name: "تجهيز تطبيق Android و iOS عبر Capacitor", is_complete: true },
        { id: 4, name: "نشر المشروع على سيرفر Hostinger", is_complete: false },
      ];
    } else if (todos && todos.length > 0) {
      initialTodos = todos;
    } else {
      initialTodos = [
        { id: 1, name: "مرحباً بك في WEVO - تم الربط مع Supabase بنجاح", is_complete: true },
      ];
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error connecting to Supabase";
    connectionMessage = msg;
  }

  return (
    <WevoApp
      initialTodos={initialTodos}
      supabaseStatus={{
        connected: true,
        tableFound,
        message: connectionMessage,
      }}
    />
  );
}
