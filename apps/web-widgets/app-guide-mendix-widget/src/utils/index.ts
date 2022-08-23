import { ListOfStepsType } from "../../typings/ReactAppGuideProps";
const _formatTarget = (target: string): string => {
    if (target.indexOf(".")) {
        // Add a Dot To the Start
        const newTarget = `.${target}`;
        return newTarget;
    } else {
        return `${target}`;
    }
};

export const reFormattedList = (listOfSteps: ListOfStepsType[]): [] => {
    const _reFormattedList = listOfSteps.reduce((a: any, c: ListOfStepsType) => {
        if (a.length === 0) {
            return [
                ...a,
                {
                    ...c,
                    disableBeacon: true,
                    title: c.title.value,
                    content: c.content.value,
                    target: _formatTarget(c.target.value as string)
                }
            ];
        } else {
            return [
                ...a,
                {
                    ...c,
                    disableBeacon: false,
                    title: c.title.value,
                    content: c.content.value,
                    target: _formatTarget(c.target.value as string)
                }
            ];
        }
    }, []);
    return _reFormattedList;
};

export const findAndTriggerScroll = (target: string): any => {
    const sanitizedTarget = target.replace(/\./g, "");
    const element = document.getElementsByClassName(sanitizedTarget);
    return element && element[0].scrollIntoView({ block: "center" });
};
