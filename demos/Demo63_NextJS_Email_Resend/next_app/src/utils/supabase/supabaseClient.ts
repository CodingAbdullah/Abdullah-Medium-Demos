import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Connecting to the Supabase database using a custom object
// Exporting an object for connecting and working with Supabase
const getSupabaseClient = (): SupabaseClient => {
    const supabase: SupabaseClient = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
    );

    return supabase;
};

export default getSupabaseClient;