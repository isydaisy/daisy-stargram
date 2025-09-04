import React from "react";
import Image from 'next/image';

interface AvatarProps {
    size?: number;
    src?: string;
}

export default function Avatar({ src = "/profile2.jpg" }: AvatarProps) {
    return (
        <div
            className="rounded-full p-[2px] bg-gray-100"
            style={{ width: '100px', height: '100px' }}
        >
            <Image
                src={src}
                alt="profile"
                width={110}
                height={110}
                className="rounded-full object-cover block"
            />
        </div>




    );
}
