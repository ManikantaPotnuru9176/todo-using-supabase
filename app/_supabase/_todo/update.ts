import supabase from "@/app/_utils/_todo/supabase";

export const updateData = async (
  tableName: string,
  updates: object,
  id: number
) => {
  try {
    const { data, error, status } = await supabase
      .from(tableName)
      .update(updates)
      .eq("id", id);

    if (error && status !== 406) throw error;

    return data;
  } catch (error) {
    console.error("Error updating data:", error);
  }
};
