import { ReactNode, createElement, Fragment, useEffect, useState } from "react";
import { CountdowntimerwidgetContainerProps } from "../typings/CountdowntimerwidgetProps";
import useInterval from "use-interval";
// import Timer from "react-compound-timer";
// import Separator from "./components/Separator";
import "./ui/Countdowntimerwidget.css";
import { DisplayHelperInterface } from "./types";
import TimerDisplay from "./components/TimerDisplay";

const Countdowntimerwidget = ({
    content,
    showDays,
    whenDone,
    showHours,
    showSeconds,
    showLegends,
    showMinutes,
    incomingDate,
    showMilliseconds
}: CountdowntimerwidgetContainerProps): ReactNode => {
    const [displayHelper, setDisplayHelper] = useState<DisplayHelperInterface>();
    const [incomingTime, setIncomingTime] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(new Date().getTime());

    useEffect(() => {
        if (incomingDate.value) {
            setIncomingTime(incomingDate.value.getTime());
        }
        if (!incomingDate.value) {
            setIncomingTime(0);
        }
    }, [incomingDate]);

    useEffect(() => {
        if (incomingTime) {
            const timeDifference = incomingTime - currentTime;
            setDisplayHelper({
                ...displayHelper,
                timeDifference,
                countDownDone: timeDifference < 0
            });
            if (timeDifference < 0) {
                whenDone && whenDone.execute();
            }
        }
    }, [incomingTime, currentTime]);

    useInterval(() => {
        if (displayHelper && displayHelper?.timeDifference > 0) {
            setCurrentTime(new Date().getTime());
        }
    }, 1000);

    // No Incoming Date
    if (incomingDate.status !== "available") {
        return <Fragment></Fragment>;
    }

    if (displayHelper?.timeDifference) {
        // Count Down Done
        if (displayHelper?.countDownDone) {
            return <Fragment>{content}</Fragment>;
        }
        // Display Count Down Timer
        if (!displayHelper?.countDownDone) {
            return (
                <Fragment>
                    <TimerDisplay
                        showDays={showDays}
                        showHours={showHours}
                        showSeconds={showSeconds}
                        showMinutes={showMinutes}
                        showLegends={showLegends}
                        displayHelper={displayHelper}
                        showMilliseconds={showMilliseconds}
                    />
                </Fragment>
            );
        }
    }
};

export default Countdowntimerwidget;
