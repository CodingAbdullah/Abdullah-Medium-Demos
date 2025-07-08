import getSupabaseClient from "@/utils/supabase/supabaseClient";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    const body = await request.json();

    // Gather form data for user information
    const { firstName, lastName, email, password } = body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Fetch any users with the associated email address
        const { data, error } = await getSupabaseClient()
        .from('User')
        .select('*')
        .eq('email', email);

        if (error) {
            return Response.json({ error: 'Could not complete request' }, { status: 500 });
        }
        
        if (data.length === 0) {
            // No user exists with that email address, insert a new one with it using a hashed password
            const { data, error } = await getSupabaseClient()
            .from('User')
            .insert([{ firstName, lastName, email, password: hashedPassword }]);

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