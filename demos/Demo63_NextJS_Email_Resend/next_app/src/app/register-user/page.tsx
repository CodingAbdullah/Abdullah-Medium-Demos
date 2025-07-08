"use client";

import { useRef, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import emailValidator from '../../utils/functions/emailValidator';

// Register User Form custom component
export default function RegisterUserForm() {
    const emailAddressRef = useRef<HTMLInputElement>(null); 
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [alert, setShowAlert] = useState(false);

    const registrationFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        // Handle form submission logic here
        // Set the token address to what the form value is for evaluation
        if (!emailValidator(emailAddressRef.current!.value.trim())){
            setShowAlert(true);
        }
        else {
            setShowAlert(false);
            
            const res = await fetch('/api/user/create-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    firstName: firstNameRef.current!.value.trim(),
                    lastName: lastNameRef.current!.value.trim(),
                    email: emailAddressRef.current!.value.trim(),
                    password: passwordRef.current!.value.trim()
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

    // Render the Registration Form Component
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
                        <CardTitle className="text-3xl font-bold text-gray-100">Registration Form</CardTitle>
                        <CardDescription className="text-gray-400 text-lg font-light">
                            Enter in details for registration
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <form onSubmit={registrationFormHandler} className="space-y-4">
                            <Input
                                placeholder="Enter First Name"
                                ref={firstNameRef}
                                className="w-full bg-gray-800 text-gray-100 border-gray-700 focus:ring-gray-400 placeholder-gray-500"
                                type="text"
                                required
                            />
                            <Input
                                placeholder="Enter Last Name"
                                ref={lastNameRef}
                                className="w-full bg-gray-800 text-gray-100 border-gray-700 focus:ring-gray-400 placeholder-gray-500"
                                type="text"
                                required
                            />
                            <Input
                                placeholder="Enter Email Address"
                                ref={emailAddressRef}
                                className="w-full bg-gray-800 text-gray-100 border-gray-700 focus:ring-gray-400 placeholder-gray-500"
                                type="text"
                                required
                            />
                            <Input
                                placeholder="Enter Password"
                                ref={passwordRef}
                                className="w-full bg-gray-800 text-gray-100 border-gray-700 focus:ring-gray-400 placeholder-gray-500"
                                type="password"
                                required
                            />
                            <div className="flex justify-center space-x-4 pt-4">
                                <Button 
                                    type="submit"
                                    className="bg-gradient-to-r from-gray-600 to-gray-400 text-white py-2 px-6 rounded-md hover:from-gray-500 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 font-medium"
                                >
                                    Register User
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}