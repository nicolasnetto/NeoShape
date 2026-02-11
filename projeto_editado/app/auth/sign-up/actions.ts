"use server";

import { createAdminClient } from "@/lib/supabase/admin";

interface SignUpData {
  email: string;
  password: string;
  name: string;
  height: number;
  current_weight: number;
  goal: string;
  training_level: string;
}

export async function signUpUser(data: SignUpData) {
  const supabase = createAdminClient();

  // Create user with admin client - auto-confirms email
  const { data: userData, error } = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      name: data.name,
      height: data.height,
      current_weight: data.current_weight,
      goal: data.goal,
      training_level: data.training_level,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null, userId: userData.user.id };
}
