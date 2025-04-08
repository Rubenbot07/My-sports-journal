import LogoRed from "../../assets/sportsJournalLogoRojo.png";
export const About = () => {
    return (
        <section className="flex flex-col">
            <section className="flex justify-center items-center md:items-stretch flex-col md:flex-row">
                <i className="p-8 md:bg-red-500 text-xl md:text-2xl flex items-center md:text-white text-center md:p-10 w-full md:w-2/4 ">
                    Welcome to Sports Journal, your dedicated partner in embracing and celebrating your journey through sports and fitness. This journal isn’t just a tool—it’s your space to set intentions, track progress, reflect on achievements, and discover the motivation that keeps you moving forward.
                </i>
                <div className="w-full md:w-2/4">
                    <img className="h-full object-cover" src="https://i.postimg.cc/zGZmNhZG/journalis-Team.webp" alt='Group of Sports Journal founders' />
                </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-4 text-white bg-black md:bg-white">
                <div className="text-3xl font-bold flex justify-center items-center md:text-5xl">
                    <h1 className="md:rotate-[-90deg] py-6 text-white md:text-red-500">About Us</h1>
                </div>
                <p className="md:col-span-2 md:bg-black text-white font-medium p-6 lg:p-20 lg:text-lg">
                    Sports Journal was founded in 2018 by a group of passionate athletes and fitness enthusiasts who recognized the need for a platform that goes beyond simple tracking. Frustrated by the lack of tools that combined goal-setting, performance analysis, and community support, they set out to create something unique. 
                    <br />
                    What started as a small project in a shared workspace has grown into a global community of like-minded individuals who believe in the power of sports to transform lives. From humble beginnings, Sports Journal has become a trusted companion for thousands of users worldwide, helping them achieve their fitness goals and celebrate their victories.
                </p>
                <div className="flex justify-center items-center">
                    <img className="w-full max-w-52 md:max-w-96 mx-auto" src={LogoRed} alt="Sports Journal" />
                </div>
            </section>
            <section className=" text-white">
                <div className=" bg-red-500 px-6 py-4 md:p-10 lg:p-20 flex flex-col gap-6">
                    <h2 className="text-3xl  font-bold md:text-5xl">Join the Movement</h2>
                    <p className="font-medium md:text-lg max-w-[800px] mx-auto">
                        When you start using Sports Journal, you’re not just tracking numbers—you’re joining a community of individuals who believe in the power of determination and resilience. Together, we celebrate every milestone, no matter how small, and push forward to achieve our personal bests.
                        <br /><br />
                        Your journey starts now. Let’s make it extraordinary.
                    </p>
                    <button className="bg-white text-red-500 p-2 text-2xl font-medium rounded-lg w-40 mx-auto">Join Now</button>
                </div>
            </section>
        </section>
    )
}