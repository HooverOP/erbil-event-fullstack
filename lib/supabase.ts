import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gbogewgbjzmednprtpun.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdib2dld2dianptZWRucHJ0cHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1ODQ0ODgsImV4cCI6MjA2ODE2MDQ4OH0.DajDBQ6U_c--azNM6ovjhuI_QE8HxNbjY2VChXXQL3s";

export const supabase = createClient(supabaseUrl, supabaseKey);
