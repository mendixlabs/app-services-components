import { createElement, Fragment } from "react";
import Separator from "./Separator";
import Timer from "react-compound-timer";

import { TimerDisplayInterface } from "../types";

const TimerDisplay = ({
    displayHelper,
    showDays,
    showHours,
    showSeconds,
    showLegends,
    showMinutes,
    showMilliseconds
}: TimerDisplayInterface) => {
    return (
        <Fragment>
            <Timer
                initialTime={displayHelper?.timeDifference}
                direction="backward"
                formatValue={value => `${value < 10 ? `0${value}` : value}`}
            >
                {() => (
                    <div className="widget_countDownTimer__container">
                        {showDays && (
                            <Fragment>
                                <div className="widget_countDownTimer__value">
                                    <span className="widget_countDownTimer__days">
                                        <Timer.Days />
                                    </span>
                                    {showLegends && <span className="widget_countDownTimer__legend">Days</span>}
                                </div>
                            </Fragment>
                        )}
                        {showHours && (
                            <Fragment>
                                {showDays && <Separator />}
                                <div className="widget_countDownTimer__value">
                                    <span className="widget_countDownTimer__hours">
                                        <Timer.Hours />
                                    </span>
                                    {showLegends && <span className="widget_countDownTimer__legend">Hours</span>}
                                </div>
                            </Fragment>
                        )}
                        {showMinutes && (
                            <Fragment>
                                {showHours && <Separator />}
                                <div className="widget_countDownTimer__value">
                                    <span className="widget_countDownTimer__minutes">
                                        <Timer.Minutes />
                                    </span>
                                    {showLegends && <span className="widget_countDownTimer__legend">Minutes</span>}
                                </div>
                            </Fragment>
                        )}
                        {showSeconds && (
                            <Fragment>
                                {showMinutes && <Separator />}
                                <div className="widget_countDownTimer__value">
                                    <span className="widget_countDownTimer__seconds">
                                        <Timer.Seconds />
                                    </span>
                                    {showLegends && <span className="widget_countDownTimer__legend">Seconds</span>}
                                </div>
                            </Fragment>
                        )}
                        {showMilliseconds && (
                            <Fragment>
                                {showSeconds && <Separator />}
                                <div className="widget_countDownTimer__value">
                                    <span className="widget_countDownTimer__milliseconds">
                                        <Timer.Milliseconds />
                                    </span>
                                    {showLegends && <span className="widget_countDownTimer__legend">Milliseconds</span>}
                                </div>
                            </Fragment>
                        )}
                    </div>
                )}
            </Timer>
        </Fragment>
    );
};

export default TimerDisplay;
