import supabase from "@/app/_utils/supabase";

export const signInUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
