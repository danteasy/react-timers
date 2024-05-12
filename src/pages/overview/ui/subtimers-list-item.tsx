import { subTimer } from "@/enitites/timer";
import { DeleteSubtimer } from "@/features/delete-subtimer";
import { EditSubtimer } from "@/features/edit-subtimer";
import secondsToHMS from "@/shared/lib/seconds-to-HMS";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

type Props = {
    subtimer: subTimer;
    index: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const SubtimersListItem: React.FC<Props> = ({
    subtimer,
    index,
    className = "",
}) => {
    return (
        <div
            className={`flex flex-col gap-1 [&:first-child]:rounded-t-lg [&:last-child]:rounded-b-lg duration-100 ${className}`}
        >
            <div className="flex items-center sm:flex-wrap">
                <div className="flex items-center space-x-4 flex-grow pr-2 sm:pr-0">
                    <span className="font-medium text-gray-700">
                        {index + 1}.
                    </span>
                    <p className="text-gray-800">{subtimer.name}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <AccessTimeIcon
                        fontSize="small"
                        className="text-gray-600"
                    />
                    <div className="text-gray-600">
                        {secondsToHMS(subtimer.duration)}
                    </div>
                </div>
            </div>
            <div className="flex self-end items-center transition-opacity duration-300 ">
                <DeleteSubtimer subtimerId={subtimer.id} />
                <EditSubtimer subtimerId={subtimer.id} />
            </div>
        </div>
    );
};
