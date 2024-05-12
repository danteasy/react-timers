import { useState } from "react";

export const useItemsSelect = <T extends { id: string }>(items: Array<T>) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSelect = (itemId: string) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const isDeselectAll =
        selectedItems.length === items.length || selectedItems.length !== 0;

    const handleSelectAll = () => {
        isDeselectAll
            ? setSelectedItems([])
            : setSelectedItems(items.map(item => item.id));
    };

    const SelectButton = () =>
        items.length > 0 && (
            <button
                className="text-mui-blue font-semibold hover:text-blue-700"
                onClick={handleSelectAll}
            >
                {isDeselectAll ? "Deselect " : "Select "}
                all
            </button>
        );

    return {
        selectedItems,
        handleSelectAll,
        isDeselectAll,
        handleSelect,
        SelectButton,
        setSelectedItems,
    };
};
