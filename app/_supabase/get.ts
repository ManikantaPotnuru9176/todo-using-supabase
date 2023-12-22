import supabase from "@/app/_utils/supabase";

export const getData = async (tableName: string, columnNames: string) => {
  try {
    const { data, error, status } = await supabase
      .from(tableName)
      .select(columnNames)
      .order("id");

    if (error && status !== 406) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
