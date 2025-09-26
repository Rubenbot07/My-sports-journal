import { Nav } from './Nav';
import { Footer } from './Footer';
import { useLocation } from 'react-router-dom';

export const Layout = ({ children }) => {
    const { pathname } = useLocation();
    const isAboutPage = pathname === '/about';

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Navigation */}
            <Nav />

            {/* Main content */}
            <main
                className={`flex flex-1 flex-col text-center w-full mx-auto ${isAboutPage ? 'p-0 gap-0' : 'p-4 gap-4'}`}
                role="main"
            >
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};