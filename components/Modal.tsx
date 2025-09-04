
import Close from '@/assets/icon/close-fill.svg';
import React from "react";

type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl  flex overflow-hidden">
                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black cursor-pointer"
                >
                    <Close width="30" height="30"/>
                </button>

                {/* 모달 안의 내용 */}
                {children}
            </div>
        </div>
    );
}
