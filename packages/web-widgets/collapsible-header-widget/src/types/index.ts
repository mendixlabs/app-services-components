export enum ScrollDirectionEnum {
    Up,
    Down
}
export enum HeaderStatusEnum {
    Expanded,
    Collapsed
}
export type PageLayoutScrollTypes = {
    threshold: number;
    headerClassName: string;
    reactOnClassName: string;
    smartCompensator: boolean;
    scrollBodyClassName: string;
    expandOnLessThreshold: boolean;
    reactOnClassNameToAdd: string;
    collapseHeaderClassName: string;
    animationSpeed: number | undefined;
};
