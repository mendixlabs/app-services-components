export interface DisplayHelperInterface {
    timeDifference: number;
    countDownDone?: boolean;
}

export interface TimerDisplayInterface {
    displayHelper?: DisplayHelperInterface;
    showDays: boolean;
    showHours: boolean;
    showSeconds: boolean;
    showLegends: boolean;
    showMinutes: boolean;
    showMilliseconds: boolean;
}
