interface SendButtonProps {
    onClick: () => void;
    status?: "idle" | "loading";
}

export default function SendButton({ onClick, status = "idle" }: SendButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex-1 px-6 py-2 bg-gray-200 rounded text-xs sm:text-sm text-center hover:cursor-pointer"
            disabled={status === "loading"}
        >
            Message
        </button>
    );
}
