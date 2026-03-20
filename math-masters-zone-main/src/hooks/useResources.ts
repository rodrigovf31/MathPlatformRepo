import { useQuery } from "@tanstack/react-query";
import { supabase, Resource } from "@/lib/supabase";

export const useResources = (year?: number) => {
  return useQuery({
    queryKey: ["resources", year],
    queryFn: async (): Promise<Resource[]> => {
      let query = supabase.from("resources").select("*").order("created_at", { ascending: false });
      if (year) query = query.eq("year", year);
      const { data, error } = await query;
      if (error) throw error;
      return (data as Resource[]) || [];
    },
  });
};
