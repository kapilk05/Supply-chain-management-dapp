import { image } from "qr-image";
import {Fot1, Fot2} from "../SVG";
export default () => {
    const footerNavs = [
    {
            herf:"javascript:void()",
            name:"Terms",
    },
    {
        herf:"javascript:void()",
        name:"License",
    },
    {
        herf:"javascript:void()",
        name:"Privacy",
    },
    {
        herf:"javascript:void()",
        name:"About Us",
    },
    ];
    return(
        <footer className="pt-10">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="justify-between sm:flex">
                    <div className="space-y-6">
                        <img src="https://www.floatui.com/logo.svg" alt="" className="w-32" />
                        <p className="max-w-md">
                            abv;awv rofgovaho wrahouvhO wrahosVH woHRAVOSHO WROAHGOHV uhOUwhah
                            rwagbvsz eahgohv.
                        </p>
                        <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
                            {footerNavs.map((item,idx) => (
                            <li className="text-gray-800 hover:text-gray-500 duration-150">
                                <a key={idx} href={item.href}>
                                    {item.name}
                                </a>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-700 font-semibold">Get The App</p>
                        <div className="flex items-center gap-3 mt-3 sm:block">
                            <a href="javascript:void()">
                                <Fot1/>
                            </a>
                            <a href="javascript:void()">
                                <Fot2/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-10 py-10 border-t md:text-center">
                    <p>all rights reserved</p>
                </div>
            </div>
        </footer>
    );
};