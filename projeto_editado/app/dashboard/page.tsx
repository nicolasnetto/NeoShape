import BodyCard from "@/components/dashboard/body-card"
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/auth/login");
  }

  const today = new Date().toISOString().split("T")[0];

  // Fetch today's logs
  const [waterRes, sleepRes, trainingRes, dietRes, weightRes] =
    await Promise.all([
      supabase
        .from("water_logs")
        .select("amount_ml")
        .eq("user_id", user.id)
        .eq("logged_at", today),
      supabase
        .from("sleep_logs")
        .select("quality")
        .eq("user_id", user.id)
        .eq("logged_at", today)
        .single(),
      supabase
        .from("training_logs")
        .select("trained")
        .eq("user_id", user.id)
        .eq("logged_at", today)
        .single(),
      supabase
        .from("diet_logs")
        .select("rating")
        .eq("user_id", user.id)
        .eq("logged_at", today)
        .single(),
      supabase
        .from("weight_logs")
        .select("weight, logged_at")
        .eq("user_id", user.id)
        .order("logged_at", { ascending: true }),
    ]);

  const totalWater =
    waterRes.data?.reduce(
      (sum: number, log: { amount_ml: number }) => sum + log.amount_ml,
      0
    ) ?? 0;

  return (
    <DashboardClient
      userId={user.id}
      profile={profile}
      todayWater={totalWater}
      todaySleep={sleepRes.data?.quality ?? null}
      todayTraining={trainingRes.data?.trained ?? null}
      todayDiet={dietRes.data?.rating ?? null}
      weightLogs={weightRes.data ?? []}
    />
  );
}
