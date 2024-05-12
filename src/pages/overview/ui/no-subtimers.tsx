import { AddSubtimer } from "@/features/add-subtimer";

export const NoSubtimers = () => {
    return (
        <div className="flex-col flex items-center">
            <p className="text-xl mt-4 mb-1 text-center">
                No subtimers yet.
                <span className="block text-gray-500 text-sm">
                    Add at least 1 subtimer to start
                </span>
            </p>
            <AddSubtimer
                className="block text-center gap-1 text-lg text-blue-500 hover:text-blue-600 [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:rotate-0 [&:hover>svg]:rotate-90 mb-3"
                iconClassName="w-7 h-7 [&>path]:min-w-full [&>path]:min-h-full"
                iconProps={{
                    fontSize: "large",
                }}
            />
        </div>
    );
};
