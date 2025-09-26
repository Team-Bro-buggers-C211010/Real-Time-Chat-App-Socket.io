import { BiMessageSquareDots } from "react-icons/bi";
import { memo } from "react";

const EmptyChat = () => {
    return (
        <div className="w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-16 bg-base-100/50 hidden sm:flex">
            <div className="max-w-md text-center space-y-6">
                <div className="flex justify-center mb-4">
                    <div className="relative">
                        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
                            <BiMessageSquareDots className="size-8 text-primary" />
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-base-content">Welcome to PingMe!</h2>
                <p className="text-base-content/60 text-sm md:text-base">
                    Select a user from the sidebar to start chatting.
                </p>
            </div>
        </div>
    );
};

EmptyChat.displayName = "EmptyChat";

export default memo(EmptyChat);