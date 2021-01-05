const hasNative = document && (document.elementsFromPoint || (document as any).msElementsFromPoint);

function getDropTargetElementsAtPoint(x: number, y: number, dropTargets: any[]): any {
    return dropTargets.filter(t => {
        const rect = t.getBoundingClientRect();
        return x >= rect.left && x <= rect.right && y <= rect.bottom && y >= rect.top;
    });
}

export const backendOptions = {
    getDropTargetElementsAtPoint: !hasNative && getDropTargetElementsAtPoint
};
// Found Code From https://gist.github.com/roydejong/fb021a973160fa3d04d7aaca675a46cf
export function isTouchDevice(): boolean {
    try {
        const prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

        const mq = function(query: any): boolean {
            return window.matchMedia(query).matches;
        };

        if (
            "ontouchstart" in window ||
            (typeof (window as any).DocumentTouch !== "undefined" && document instanceof (window as any).DocumentTouch)
        ) {
            return true;
        }

        return mq(["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(""));
    } catch (e) {
        console.error("(Touch detect failed)", e);
        return false;
    }
}
