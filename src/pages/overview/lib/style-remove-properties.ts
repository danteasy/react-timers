export const removePropertiesFromElement = function (
    element: HTMLElement,
    propertiesToRemove: string[]
) {
    propertiesToRemove.forEach(property => {
        element.style.hasOwnProperty(property) &&
            element.style.removeProperty(property);
    });
};
