import Image from 'next/image'
import Link from 'next/link';
import React from 'react';
import SearchBar from '../ui/SearchBar';

export default function Header() {
    return (
        <div className="header">
            <Link href="/">
                <a className="flex items-center">
                    <div className="header__logo">
                        <Image src="/images/logo-transparent.png" layout='fill' objectFit='contain' ></Image>
                    </div>
                    <h1 className="header__title">
                        HomeTwo
                    </h1>
                </a>
            </Link>
            <SearchBar/>
            <div className="header__nav">
                <a href="/help" className="header__nav__list">Help Center</a>
                <a href="/contact" className="header__nav__list">Contact Us</a>
            </div>
        </div>
    )
}