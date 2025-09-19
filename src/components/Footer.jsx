import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
export const Footer = () => {
    return (
        <footer className="bg-black text-white p-6">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Logo Section */}
                <div className="flex flex-col items-center md:items-start">
                    <img src='https://pqbzzgeczhqphepwilwv.supabase.co/storage/v1/object/public/company%20images/sportsJournalLogo.png' alt="Logo" className="w-20 h-20 md:w-24 md:h-24" />
                    <p className="text-sm mt-2 text-gray-400 text-center md:text-left">
                        Your trusted source for sports news and updates.
                    </p>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col md:flex-row gap-2 md:gap-4 text-sm text-center md:text-left">
                    <a className="hover:underline">About Us</a>
                    <a className="hover:underline">Contact</a>
                    <a className="hover:underline">Privacy Policy</a>
                    <a className="hover:underline">Terms of Service</a>
                </nav>

                {/* Social Media Links */}
                <div className="flex gap-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-500">
                        <Facebook className="w-6 h-6" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400">
                        <Twitter className="w-6 h-6" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500">
                        <Instagram className="w-6 h-6" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-red-500">
                        <Youtube className="w-6 h-6" />
                    </a>
                </div>
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-700 mt-6"></hr>

            {/* Copyright Section */}
            <div className="text-center text-sm mt-4 text-gray-400">
                © {new Date().getFullYear()} My Sports Journal. All rights reserved.
            </div>
        </footer>
    );
};