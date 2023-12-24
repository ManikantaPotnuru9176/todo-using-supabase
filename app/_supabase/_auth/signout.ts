import supabase from "@/app/_utils/supabase";

export const signInUser = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signOut();

    console.log("SignOut Error: ", error);
  } catch (error) {
    console.error(error);
  }
};
