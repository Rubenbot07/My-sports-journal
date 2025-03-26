import { Nav } from './Nav'
import { Footer } from './Footer'
export const Layout = ({ children }) => {
    return (
        <main className="flex flex-col gap-4 bg-amber-100 h-max min-h-screen">
            <Nav />
            <section className="flex flex-1 flex-col text-center w-5/6 mx-auto p-4">{children}</section>
            <Footer />
        </main>
    )
}