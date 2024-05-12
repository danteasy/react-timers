declare global {
    interface CSSStyleDeclaration {
        removeProperties(
            element: HTMLElement,
            propertiesToRemove: string[]
        ): void;
    }
}

export {};
