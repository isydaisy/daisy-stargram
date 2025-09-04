import Image from 'next/image';

interface PostCardProps {
    image: string;
    onClick?: () => void;
}

export default function PostCard({ image, onClick }: PostCardProps) {
    return (
        <div
            className="w-full aspect-square bg-gray-200 overflow-hidden rounded-md cursor-pointer"
            onClick={onClick}
        >
            <Image src={image} alt="post" width={100} height={100} className="w-full h-full object-cover " />
        </div>
    );
}
