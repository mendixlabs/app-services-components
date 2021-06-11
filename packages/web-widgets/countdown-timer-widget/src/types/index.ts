import { ActionValue } from "mendix";
export interface DisplayHelperInterface {
    timeDifference: Date;
    countDownDone?: boolean;
}

export interface TimerDisplayInterface {
    displayHelper?: DisplayHelperInterface;
    showDays: boolean;
    whenDone: ActionValue | undefined;
    content: any;
    incomingTime: Date | null;
    showHours: boolean;
    showSeconds: boolean;
    displayDoneContent: boolean;
    showLegends: boolean;
    showMinutes: boolean;
    showMilliseconds: boolean;
}
