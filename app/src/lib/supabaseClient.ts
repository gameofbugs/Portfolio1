// @ts-nocheck
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Surfaces a clear error in the console/build instead of a silent
  // failure if someone forgets to set the env vars in Vercel.
  console.error(
    "Missing Supabase environment variables. Set VITE_SUPABASE_URL and " +
    "VITE_SUPABASE_ANON_KEY in your .env file (local) or in Vercel " +
    "Project Settings → Environment Variables (deployed)."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Name of the public Supabase Storage bucket used for uploaded game images.
export const GAME_IMAGES_BUCKET = "game-images";
