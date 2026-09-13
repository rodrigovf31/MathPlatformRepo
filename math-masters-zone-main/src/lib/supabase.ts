import { supabase } from "@/integrations/supabase/client";

export { supabase };

export interface Resource {
  id: string;
  title: string;
  year: number;
  topic: string;
  type: "ficha" | "guia";
  file_url: string;
  file_name: string;
  created_at: string;
}
