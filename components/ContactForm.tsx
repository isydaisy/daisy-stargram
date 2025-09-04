"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import Close from "@/assets/icon/close-fill.svg";

interface ContactFormProps {
    onClose: () => void; // 전송 완료 후 팝업 닫기
}

export default function ContactForm({ onClose }: ContactFormProps) {
    const [form, setForm] = useState({title:"",  email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [emailError, setEmailError] = useState("");

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const isFormValid = () =>
        form.title.trim() !== "" &&
        form.message.trim() !== "" &&
        form.email.trim() !== "" &&
        validateEmail(form.email);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(form.email)) {
            setEmailError("유효한 이메일 주소를 입력해주세요.");
            return;
        }

        setEmailError("");
        setStatus("loading");


        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
                form,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
            );
            setStatus("success");
            setForm({ title:"", email: "", message: "" });

            // 전송 완료 후 팝업 닫기
            setTimeout(() => onClose(), 2000);
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // 이메일 실시간 체크
        if (name === "email") {
            setEmailError(validateEmail(value) ? "" : "유효한 이메일을 입력해주세요.");
        }
    };


    return (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white py-3 px-4 rounded-2xl shadow-lg w-full max-w-md relative"
            >
                <h2 className="text-xl font-bold mb-3">Contact Me</h2>

                <input
                    type="text"
                    name={"title"}
                    placeholder="제목"
                    value={form.title}
                    onChange={handleChange}
                    className="border-none py-2 px-3 rounded-sm w-full mb-2 bg-gray-100 text-sm"
                />
                <textarea
                    name={"message"}
                    placeholder="메시지"
                    value={form.message}
                    onChange={handleChange}
                    className="border-none py-2 px-3 rounded-sm w-full h-32 mb-2 bg-gray-100 resize-none block text-sm"
                />
                <input
                    name={"email"}
                    type="email"
                    placeholder="회신 이메일"
                    value={form.email}
                    onChange={handleChange}
                    className="border-none py-2 px-3 rounded-sm w-full mb-5 bg-gray-100 text-sm"
                />
                {emailError && <p className="text-red-400 text-sm mb-3">{emailError}</p>}
                <button
                    type="submit"
                    className={`bg-blue-400 text-white font-semibold py-2 px-3 rounded-sm w-full transition disabled:opacity-50  hover:cursor-pointer`}
                    disabled={!isFormValid() || status === "loading"}
                >
                    {status === "loading" ? "전송 중..." : "전송"}
                </button>

                {status === "success" && <p className="mt-2 text-xs">메일이 전송되었습니다</p>}
                {status === "error" && <p className="text-red-400 mt-2 text-xs">전송 실패 다시 시도해주세요</p>}


                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 hover:cursor-pointer"
                >
                    <Close width="20" height="20"/>
                </button>
            </form>
        </div>
    );
}
