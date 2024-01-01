import supabase from "@/app/_utils/supabase";

export const updateData = async (
  tableName: string,
  updatedData: object,
  column: string,
  value: number | string
) => {
  try {
    const { data, error, status } = await supabase
      .from(tableName)
      .update(updatedData)
      .eq(column, value);

    if (error && status !== 406) throw error;

    return data;
  } catch (error) {
    console.error("Error updating data:", error);
  }
};
