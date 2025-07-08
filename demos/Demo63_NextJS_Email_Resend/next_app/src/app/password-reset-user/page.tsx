"use client";

import { useRef, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import emailValidator from '../../utils/functions/emailValidator';

// Password Reset Form custom component
export default function PasswordResetForm() {
    const emailAddressRef = useRef<HTMLInputElement>(null); 
    const validationCodeRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const [alert, setShowAlert] = useState(false);

    const passwordResetFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        // Handle form submission logic here
        // Set the token address to what the form value is for evaluation
        if (!emailValidator(emailAddressRef.current!.value.trim())){
            setShowAlert(true);
        }
        else {
            setShowAlert(false);
            
            const res = await fetch('/api/crud/email-token/delete-email-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    verificationID: validationCodeRef.current!.value.trim(),
                    email: emailAddressRef.current!.value.trim(),
                    newPassword: newPasswordRef.current!.value.trim()
                })
            });

            // Check condition of FETCH request
            if (res.ok) {
                const data = await res.json();
            }
            else {
                throw new Error();
            }
        }
    }

    // Render the Password Reset Form Component
    return (
        <>
            <div style={{ marginTop: '2rem' }} className="container mx-auto px-4 w-full max-w-3xl">
                {alert && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertDescription>
                            There was an error processing your request. Please ensure you are entering a valid email address.
                        </AlertDescription>
                    </Alert>
                )}
                <Card className="bg-gray-900 border-gray-800 shadow-xl w-full">
                    <CardHeader className="border-b border-gray-800 pb-6">
                        <CardTitle className="text-3xl font-bold text-gray-100">Password Reset Form</CardTitle>
                        <CardDescription className="text-gray-400 text-lg font-light">
                            Enter in details for password reset
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <form onSubmit={passwordResetFormHandler} className="space-y-4">
                            <Input
                                placeholder="Enter Email Address"
                                ref={emailAddressRef}
                                className="w-full bg-gray-800 text-gray-100 border-gray-700 focus:ring-gray-400 placeholder-gray-500"
                                type="text"
                                required
                            />
                            <Input
                                placeholder="Enter Validation Code"
                                ref={validationCodeRef}
                                className="w-full bg-gray-800 text-gray-100 border-gray-700 focus:ring-gray-400 placeholder-gray-500"
                                type="text"
                                required
                            />
                            <Input
                                placeholder="Enter New Password"
                                ref={newPasswordRef}
                                className="w-full bg-gray-800 text-gray-100 border-gray-700 focus:ring-gray-400 placeholder-gray-500"
                                type="text"
                                required
                            />
                            <div className="flex justify-center space-x-4 pt-4">
                                <Button 
                                    type="submit"
                                    className="bg-gradient-to-r from-gray-600 to-gray-400 text-white py-2 px-6 rounded-md hover:from-gray-500 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 font-medium"
                                >
                                    Reset Password
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}