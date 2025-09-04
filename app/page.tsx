"use client";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import PostGrid from "@/components/PostGrid";
import React, {useState} from "react";
import SendButton from "@/components/SendButton";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [showForm, setShowForm] = useState(false);


  return (
      <div className="px-4 sm:px-6 lg:px-8"> {/* 좌우 padding */}
        <div className="max-w-xl mx-auto">
          <div className="flex items-center space-x-3 w-fit mt-5">
            <Avatar />
            <div className="ml-3 sm:ml-5"> {/* 모바일에선 좀 좁게, sm 이상부터 넉넉하게 */}
              <h2 className="text-lg sm:text-xl font-semibold">강원경</h2>
              <div className="flex space-x-6 sm:space-x-8 text-center font-semibold text-xs sm:text-sm mt-1">
                <div className="flex flex-col items-start">
                  <span>5</span>
                  <span className="font-normal">Project</span>
                </div>
                <div className="flex flex-col items-start">
                  <span>2025</span>
                  <span className="font-normal">Version</span>
                </div>
                <div className="flex flex-col items-start">
                  <span>000301</span>
                  <span className="font-normal">Commit</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs sm:text-sm text-gray-700">
            Frontend Engineer (2021.10 - )
          </div>

          <div className="mt-4 flex gap-2 sm:gap-4">
            <Link
                href="/mypage/follow"
                className="flex-1 px-6 py-2 bg-blue-500 text-white rounded text-xs sm:text-sm text-center"
            >
              Follow
            </Link>
            <SendButton onClick={() => setShowForm(true)} />

            {showForm && <ContactForm onClose={() => setShowForm(false)} />}

          </div>
          <div className="mt-8">
            <PostGrid />
          </div>
        </div>
      </div>
  );
}
