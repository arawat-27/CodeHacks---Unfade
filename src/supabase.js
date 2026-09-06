import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabasePublishableKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;
export { supabaseUrl, supabasePublishableKey };
export const supabaseConfigurationError =
  !supabaseUrl || !supabasePublishableKey
    ? "Supabase is not configured yet. Add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_PUBLISHABLE_KEY to your .env file, then restart the app."
    : "";
// Never put a Supabase secret/service_role key in a React app.
export const supabase = supabaseConfigurationError
  ? null
  : createClient(supabaseUrl, supabasePublishableKey);
