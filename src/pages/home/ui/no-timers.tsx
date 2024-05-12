import { AddTimer } from "@/features/add-timer";

const NoTimers = () => {
    return (
        <div className="text-center">
            <p className="text-3xl"> You haven't created any timers yet.</p>
            <AddTimer
                className="mx-auto block text-lg text-blue-500 hover:text-blue-600 [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:rotate-0 [&:hover>svg]:rotate-90 mt-10"
                iconClassName="w-7 h-7 [&>path]:min-w-full [&>path]:min-h-full"
                iconProps={{
                    fontSize: "large",
                }}
            />
        </div>
    );
};

export default NoTimers;
