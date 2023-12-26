import supabase from "@/app/_utils/supabase";

export const signUpUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_REDIRECTION_URL,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
