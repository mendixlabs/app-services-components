import { ReactNode, createElement, Fragment, useEffect, useState } from "react";
import { CountdowntimerwidgetContainerProps } from "../typings/CountdowntimerwidgetProps";
import TimerDisplay from "./components/TimerDisplay";
import "./ui/Countdowntimerwidget.css";

const Countdowntimerwidget = ({
    content,
    showDays,
    whenDone,
    showHours,
    showSeconds,
    showLegends,
    showMinutes,
    incomingDate,
    displayDoneContent,
    showMilliseconds
}: CountdowntimerwidgetContainerProps): ReactNode => {
    const [incomingTime, setIncomingTime] = useState<Date | null>(null);

    useEffect(() => {
        if (incomingDate.value) {
            setIncomingTime(incomingDate.value);
        }
    }, [incomingDate]);

    // No Incoming Date
    if (!incomingTime) {
        return <Fragment></Fragment>;
    }
    if (incomingTime) {
        return (
            <Fragment>
                <TimerDisplay
                    whenDone={whenDone}
                    showDays={showDays}
                    content={content}
                    showHours={showHours}
                    showSeconds={showSeconds}
                    showMinutes={showMinutes}
                    showLegends={showLegends}
                    incomingTime={incomingTime}
                    showMilliseconds={showMilliseconds}
                    displayDoneContent={displayDoneContent}
                />
            </Fragment>
        );
    }
};

export default Countdowntimerwidget;
