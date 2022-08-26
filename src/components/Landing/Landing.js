import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faCommentsDollar, faEdit, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";


export default function Landing () {

    return (
        <div>
            <div className="landing__banner">
                {/* <Image src="/images/landing/banner-2.jpg" layout="fill" objectFit="cover"></Image> */}
                <div className="landing__heading">
                    <div className="heading__text">
                        <div className="heading__large">
                            Find Your Dream Room, Rent Easily
                        </div>
                        <div className="heading__small">
                            HomeTwo offers flexible type of properties with awesome and affordable rooms in the best locations in Seattle. 
                        </div>
                    </div>
                </div>
            </div>            
            <div className="landing__content">
                <div className="benefits">
                    <div className="benefits__title">
                        Looking for a room?
                    </div>
                    <div className="benefits__subtitle">
                        Find your room here. Tell us your preference and we will manage the rest for you. Check out the benefits that we offer
                    </div>
                    <div className="benefits__boxes">
                        <div className="benefits__box first">
                            <div className="benefits__icon">
                                <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon>
                            </div>
                            <div className="benefits__description">
                                <div className="benefits__heading">
                                    Flexible Search
                                </div>
                                <div className="benefits__subheading">
                                    Find a room based on your preferred budget, type, location, and facilities with just one click
                                </div>
                            </div>
                        </div>
                        <div className="benefits__box second">
                            <div className="benefits__icon">
                                <FontAwesomeIcon icon={faCommentsDollar}></FontAwesomeIcon>
                            </div>
                            <div className="benefits__description">
                                <div className="benefits__heading">
                                    Easy Rent
                                </div>
                                <div className="benefits__subheading">
                                    Just give your preference type and we will take care of everything else for you
                                </div>
                            </div>
                        </div>
                        <div className="benefits__box third">
                            <div className="benefits__icon">
                                <FontAwesomeIcon icon={faUserGroup}></FontAwesomeIcon>
                            </div>
                            <div className="benefits__description">
                                <div className="benefits__heading">
                                    Community Support
                                </div>
                                <div className="benefits__subheading">
                                    Join our community of international students and find your possible new roommate
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opt-in">
                    <div className="opt-in__layer">
                        <div className="p-20">
                            <div className="text-white text-3xl text-center font-sans font-bold">
                                Join now and be one of our first customer
                            </div>
                            <div className="mt-10 flex items-center p-4 bg-white bg-opacity-30 rounded-xl">
                                <input className="rounded-lg h-10 w-[90%] border-none outline-none p-3" placeholder="Enter your email"></input>
                                <button className="primary-button ml-3 rounded-lg">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="join-discord">
                    <div className="flex items-center justify-center px-10 pt-2 text-2xl">
                        <div className="font-sans font-bold text-center">
                            Join us on Discord 
                        </div>
                        <img src="https://img.icons8.com/color/48/000000/discord-logo.png" className="ml-4"/>
                    </div>
                    <div className="px-[15%] py-3 w-[100%] text-center">
                        We are here to connect international students to talk about studying abroad and to get
                        tips and tricks on daily life. Whether you have questions about renting a property at HomeTwo or just want
                        to find connection, we welcome you! Join <a href="https://discord.gg/8HBbPcQuus" target="blank">here</a>
                    </div>
                </div>
            </div>
        </div>
    )
}