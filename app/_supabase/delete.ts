import supabase from "@/utils/supabase";

export const deleteData = async (tableName: string, id: number) => {
  try {
    const { data, error, status } = await supabase
      .from(tableName)
      .delete()
      .eq("id", id);

    if (error && status !== 406) {
      console.error("Supabase delete error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};
