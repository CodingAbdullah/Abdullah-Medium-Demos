import getSupabaseClient from "@/utils/supabase/supabaseClient";

export async function POST(request: Request) {
    const body = await request.json();

    // Gather form data for user information
    const { firstName, lastName, email, password } = body;

    try {
        // Fetch any users with the associated email address
        const { data, error } = await getSupabaseClient()
        .from('user')
        .select('*')
        .eq('email', email);

        if (error) {
            return Response.json({ error: 'Could not complete request' }, { status: 500 });
        }
        
        if (data.length === 0) {
            // No user exists with that email address, insert a new one with it
            const { data, error } = await getSupabaseClient()
            .from('user')
            .insert({ firstName, lastName, email, password });

            if (error) {
                return Response.json({ error: 'Could not complete request' }, { status: 500 });
            }
            else {
                return Response.json({ message: "Successfully registered User" }, { status: 201 });
            }
        }
        else {      
            // No user exists with that email address, insert a new one with it
            return Response.json({ error: 'Could not complete request' }, { status: 500 });
        }
    }
    catch (error) {
        return Response.json({ error: 'Could not complete request' }, { status: 500 });
    }
}