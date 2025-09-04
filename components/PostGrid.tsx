"use client";

import { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";

type Post = {
    id: number;
    image: string;
    description: string;
};

const posts: Post[] = [
    { id: 1, image: "/company/artifriends.jpg", description: "ArtiFriends" },
    { id: 2, image: "/company/wello.jpg", description: "Wello" },
    { id: 3, image: "/company/testvelly.jpg", description: "Testvalley" },
    { id: 4, image: "/company/planby.jpg", description: "Planby" },
    { id: 5, image: "/game/eevee_game.jpg", description: "EEVEE RUN! (미니게임 시작하기)" },
];

export default function PostGrid() {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    return (
        <div>
            <div className="grid grid-cols-3 gap-2 max-w-full">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="aspect-square cursor-pointer"
                        onClick={() => setSelectedPost(post)}
                    >
                        <Image
                            src={post.image}
                            alt={post.description}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover pointer-events-none rounded"
                            priority={true}
                        />
                    </div>
                ))}
            </div>



            {selectedPost && (
                <Modal onClose={() => setSelectedPost(null)}>
                    <div className="w-fit bg-gray-100 p-4 rounded">
                        <Image
                            width={500}
                            height={500}
                            src={selectedPost.image}
                            alt={selectedPost.description}
                            className="object-contain rounded"
                        />
                        {selectedPost.id === 5 ? (
                            <p
                                className="text-center font-semibold text-xl my-3 cursor-pointer text-blue-400 underline"
                                onClick={() => window.open("https://eevee-run.vercel.app/", "_blank")}
                            >
                                {selectedPost.description}
                            </p>
                        ) : (
                            <p className="text-center font-semibold text-xl my-3">
                                {selectedPost.description}
                            </p>
                        )}
                    </div>
                </Modal>
            )}

        </div>
    );
}
