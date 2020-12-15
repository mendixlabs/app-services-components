// @ts-ignore
const hasNative = document && (document.elementsFromPoint || (document.msElementsFromPoint as any));

function getDropTargetElementsAtPoint(x: number, y: number, dropTargets: any[]) {
    // @ts-ignore
    return dropTargets.filter(t => {
        const rect = t.getBoundingClientRect();
        return x >= rect.left && x <= rect.right && y <= rect.bottom && y >= rect.top;
    });
}

export const backendOptions = {
    getDropTargetElementsAtPoint: !hasNative && getDropTargetElementsAtPoint
};
// Found Code From https://gist.github.com/roydejong/fb021a973160fa3d04d7aaca675a46cf
export function is_touch_device() {
    try {
        let prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

        // @ts-ignore
        let mq = function(query) {
            return window.matchMedia(query).matches;
        };

        if (
            "ontouchstart" in window ||
            // @ts-ignore
            (typeof window.DocumentTouch !== "undefined" && document instanceof window.DocumentTouch)
        ) {
            return true;
        }

        return mq(["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(""));
    } catch (e) {
        console.error("(Touch detect failed)", e);
        return false;
    }
}
