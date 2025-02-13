'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import addressValidator from '../utils/functions/addressValidator';
import { Input } from './ui/input';
import { Button } from './ui/button';

// Custom Component for working with the Home Page Wallet Form
export default function HomePageWalletForm() {
    const walletAddressRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string>('');
    const router = useRouter();

    // Function for handling form submissions
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (addressValidator(walletAddressRef.current!.value.trim())) {
            router.push(`/wallet-activity/${walletAddressRef.current!.value.trim()}`);
        } 
        else {
            setError('Invalid wallet address. Please check and try again.');
        }
    };

    // Return JSX code for working with the Home Page Wallet Form Component
    return (
        <form className="mt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4">
                <Input
                    placeholder="Enter Wallet Address"
                    ref={walletAddressRef}
                    className="flex-grow bg-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    required
                    max={42}
                    min={42}
                />
                <Button 
                    type="submit"
                    className="bg-gradient-to-r from-gray-600 to-gray-400 text-white py-2 px-6 rounded-md hover:from-gray-500 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                    Search! &raquo;
                </Button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
}