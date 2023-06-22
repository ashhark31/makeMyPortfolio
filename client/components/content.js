import Link from "next/link";
import { Box } from "./box";

const Intro = () => {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="relative isolate overflow-hidden px-6 pt-16 sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                            Build your Portfolio.
                        <br />
                            Start using our app today.
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-400">
                            Welcome to <b>makeMyPortfolio</b>. This webapp is used to make a portfolio quikly. We have multiple themes for portfolio, you can use any of these. 
                            Click on the <b>Learn more</b> if you wanna know more about this app else you can go with 
                            <b> Get Started</b>.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <Link
                                href={"/user/registration"}
                                className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Get started
                            </Link>
                            <a href="#" className="text-sm font-semibold leading-6 text-black">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                    <div className="relative mt-16 h-80 lg:mt-8">
                        <img
                        className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                        src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                        alt="App screenshot"
                        width={1824}
                        height={1080}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const Content = () => {
    return (
        <Box>
            <Intro />
        </Box>
    );
}

export default Content