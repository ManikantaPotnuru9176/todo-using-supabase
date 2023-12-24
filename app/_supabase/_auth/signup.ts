import supabase from "@/app/_utils/supabase";

export const signUpUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
