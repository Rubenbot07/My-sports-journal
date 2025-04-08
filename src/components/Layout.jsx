import { Nav } from './Nav'
import { Footer } from './Footer'
export const Layout = ({ children }) => {
    const isAboutPage = window.location.pathname === '/about'
    return (
        <main className={`flex flex-col bg-white h-max min-h-screen ${ isAboutPage ? 'gap-0' : 'gap-4'}`}>
            <Nav />
            <section className={`flex flex-1 flex-col text-center w-full mx-auto ${ isAboutPage ? 'p-0' : 'p-4'}`}>{children}</section>
            <Footer />
        </main>
    )
}