import supabase from "@/utils/supabase";

export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    console.log("SignOut Error: ", error);
  } catch (error) {
    console.error(error);
  }
};
