import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import getSupabaseClient from "@/utils/supabase/supabaseClient";

// Create the Email Token and send an email containing the verification ID using Resend
export async function POST(request: Request) {
    const body = await request.json();

    // Gather form data
    const { verificationID, email, newPassword } = body;

    // Grab the email token
    // Verify token secret, verification ID
    // Remote token
    // Update User with new password

    const { data, error } = await getSupabaseClient()
    .from('emailToken')
    .select('*')
    .eq('email', email);

    if (error) {
        return Response.json({ error: error.message} , { status: 500 });
    }
    if (data.length === 0) {
        return Response.json({ error: "No email token with the email address exists" }, { status: 500 });
    }
    else {
        const emailToken = data[0].token;
        
        try {
            const verification = await jwt.verify(emailToken, process.env.TOKEN_SECRET!) as { tokenID: string };

            // Compare the verification ID with the hashed verification ID from JWT payload
            const comparison = await bcrypt.compare(verificationID, verification.tokenID);
            
            if (comparison) {
                // Generate salt and hash the new password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                
                // Update user password in the users table
                const { error: updateError } = await getSupabaseClient()
                .from('users')
                .update({ password: hashedPassword })
                .eq('email', email);
                
                if (updateError) {
                    return Response.json({ error: "Could not update user password" }, { status: 500 });
                }
                
                // Delete the email token
                const { error: deleteError } = await getSupabaseClient()
                .from('emailToken')
                .delete()
                .eq('email', email);
                
                if (deleteError) {
                    return Response.json({ error: "Could not delete email token" }, { status: 500 });
                }
                
                return Response.json({ message: "Password successfully reset! Email Token deleted." }, { status: 200 });
            } 
            else {
                return Response.json({ error: "Invalid verification ID, password will not be reset" }, { status: 401 });
            }
        }
        catch (err) {
            // If token does not exist, or is invalid, delete it
            const { data, error } = await getSupabaseClient()
            .from('emailToken')
            .delete()
            .eq('email', email);

            if (error) {
                return Response.json({ message: 'could not delete token'}, { status: 500 });
            }
            else {
                return Response.json({ error: "Token expired, deleted from EmailToken collection!" }, { status: 401 });
            }
        }
    }
}