'use client';

import { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import addressValidator from '../utils/functions/addressValidator';
import WalletStatsInfoTable from './WalletStatsInfoTable';

// Wallet Analytics Form Custom Component
export default function WalletAnalyticsForm() {
    const walletAddressRef = useRef<HTMLInputElement>(null)
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [tableStatus, updateTableStatus] = useState<boolean>(false);

    // Validate wallet address and proceed to presenting information
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (addressValidator(walletAddressRef.current!.value.trim())) {
            setShowAlert(false);
            updateTableStatus(true);
        }
        else {
            setShowAlert(true);
            updateTableStatus(false);
        }
    }

    // Render the Wallet Analytics Form
    return (
        <>
            <div className="container mx-auto px-4 w-full max-w-3xl">
                {showAlert && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertDescription>
                            There was an error processing your request. Please try again.
                        </AlertDescription>
                    </Alert>
                )}
                <Card className="bg-gray-900 border-gray-800 shadow-xl w-full">
                    <CardHeader className="border-b border-gray-800 pb-6">
                        <CardTitle className="text-3xl font-bold text-gray-100">Analyze Wallet</CardTitle>
                        <CardDescription className="text-gray-400 text-lg font-light">
                            Enter wallet address for in-depth analysis
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                placeholder="Enter Wallet Address"
                                ref={walletAddressRef}
                                className="w-full bg-gray-800 text-gray-100 border-gray-700 focus:ring-gray-400 placeholder-gray-500"
                                required
                            />
                            <div className="flex justify-center space-x-4 pt-4">
                                <Button 
                                    type="submit"
                                    className="bg-gradient-to-r from-gray-600 to-gray-400 text-white py-2 px-6 rounded-md hover:from-gray-500 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 font-medium"
                                >
                                    Analyze Wallet
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
            { tableStatus ? <WalletStatsInfoTable address={walletAddressRef.current!.value.trim()} /> : null }
        </>   
    )
}