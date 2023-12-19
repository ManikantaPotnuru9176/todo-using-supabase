import supabase from "@/app/_utils/_todo/supabase";

export const getData = async (tableName: string) => {
  try {
    const { data, error, status } = await supabase.from(tableName).select();

    if (error && status !== 406) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
