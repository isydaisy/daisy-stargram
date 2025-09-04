'use client';

import React, { useRef, useState} from 'react';
import ThreeDots from '@/assets/icon/three-dots-fill.svg';

import PdfDownload from "@/components/PdfDownload";
import toast, {Toaster} from "react-hot-toast";
import Image from 'next/image';



export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    const handleClick = (e: React.MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("URL이 복사되었습니다");
        } catch (err) {
            toast.error("URL 복사 실패");
        }
    };



    return (
        <header className="bg-white px-4 py-2 shadow flex justify-between items-center" onClick={handleClick}>
            <div className={'flex items-center gap-2'}>
                <Image alt={'icon'} src={'/favicon.png'} width={50} height={50} className={'w-fit object-cover'}/>
                <h1 className="text-lg font-bold">Daisy&apos;stargram</h1>
            </div>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen((prev) => !prev);
                    }}
                    className="p-2 rounded hover:bg-gray-200 hover:cursor-pointer"
                >
                    <ThreeDots width="20" height="20" />
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-36 bg-white rounded shadow-lg z-10 cursor-pointer">
                        <div onClick={handleCopy} className="block px-4 py-2 hover:bg-gray-100">
                            Share
                        </div>
                        <PdfDownload/>
                    </div>
                )}

            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                }}
            />
        </header>
    );
}
