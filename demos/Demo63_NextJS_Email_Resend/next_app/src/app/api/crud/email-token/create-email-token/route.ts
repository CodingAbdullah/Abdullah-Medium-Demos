import getSupabaseClient from "@/utils/supabase/supabaseClient";
import { EmailTemplate } from "@/components/EmailTemplate";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { Resend } from "resend";
import jwt from "jsonwebtoken";

// Create the Email Token and send an email containing the verificiation ID using Resend
export async function POST(request: Request) {
    const body = await request.json();

    const { email } = body;
    const verificationID = uuidv4();

    // Setting the email client
    const resend = new Resend(process.env.RESEND_EMAIL_KEY);

    // Check to see if email address exists inside the User table
    const { data, error } = await getSupabaseClient()
    .from('User')
    .select('*')
    .eq('email', email);

    if (error) {
        return Response.json({ error }, { status: 500 }); // If error occurs, return a Response
    }
    else {
        if (data.length === 0){
            return Response.json({ message: "No email address exists! Cannot reset password" }, { status: 500 });
        }
        // All else, continue
    }

    try {
        // Hash the UUID with bcrypt (optional - for additional security)
        const salt = await bcrypt.genSalt(10)
        const hashedTokenId = await bcrypt.hash(verificationID, salt);

        // Create JWT payload with the UUID
        const payload = {
            tokenId: hashedTokenId,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 5) // 5 minutes expiry
        };

        // Generate JWT token using the payload
        const jwtSecret = process.env.TOKEN_SECRET;
        const jwtToken = jwt.sign(payload, jwtSecret!);
        
        // Store in database or use as needed
        // Retrieve Email Tokens (if any) that belong to user
        const { data, error } = await getSupabaseClient()
            .from('EmailToken')
            .select('*')
            .eq('email', email);

        if (error) {
            return Response.json({ error: error.message }, { status: 500 });
        }

        // If no email token associated with the account, create the email and send verification ID
        if (data.length === 0) {
            const { data, error } = await getSupabaseClient()
            .from('EmailToken')
            .insert([{ email, token: jwtToken }]);

            if (error) {
                return Response.json({ error: error.message }, { status: 500 });  
            }
            else {
                // Once all that is complete, send email containing verification ID information
                const { data, error } = await resend.emails.send({
                    from: "onboarding@resend.dev",
                    to: [email],
                    subject: 'Password Reset Request',
                    react: EmailTemplate({ emailAddress: email, tokenID: verificationID })
                });

                // If error, send error, if not, send success message
                if (error) {
                    return Response.json({ error: 'Could not complete request' }, { status: 500 });
                }
                else {
                    return Response.json({ message: 'Successfully created Email Token' }, { status: 200 });
                }
            }
        }
        else {
            // If email tokens exist, remove all of them from the database before proceeding
            const { data, error } = await getSupabaseClient()
            .from('EmailToken')
            .delete()
            .eq('email', email);

            if (error) {
                return Response.json({ error: error.message }, { status: 500 });
            }
            else {
                // Once that is complete, insert the newly created Email Token into the Supabase database
                const { data, error } = await getSupabaseClient()
                .from('EmailToken')
                .insert([{ email, token: jwtToken }]);

                if (error) {
                    return Response.json({ error: error.message }, { status: 500 });
                }
                else {
                    // Once all that is complete, send email containing verification ID information
                    const { data, error } = await resend.emails.send({
                        from: "onboarding@resend.dev",
                        to: [email],
                        subject: 'Password Reset Request',
                        react: EmailTemplate({ emailAddress: email, tokenID: verificationID })
                    });

                    // If error, send error, if not, send success message
                    if (error) {
                        return Response.json({ error: 'Could not complete request' }, { status: 500 });
                    }
                    else {
                        return Response.json({ message: 'Successfully created Email Token' }, { status: 200 });
                    }
                }
            }
        }
    }
    catch {
        return Response.json({ error: "Could not complete request" }, { status: 500 });
    }
}