import { createElement, Fragment, ReactNode } from "react";
import Separator from "./Separator";

import Countdown from "react-countdown";

import { TimerDisplayInterface } from "../types";

const TimerDisplay = ({
    content,
    whenDone,
    showDays,
    showHours,
    showSeconds,
    showLegends,
    showMinutes,
    incomingTime,
    displayDoneContent
}: TimerDisplayInterface) => {
    const formatValues = (value: number, name: string): ReactNode => {
        const digits = ("" + value).split("");
        if (digits.length === 1) {
            return (
                <Fragment>
                    <span className={`widget_countDownTimer__digit widget_countDownTimer__${name}__0`}>0</span>
                    <span className={`widget_countDownTimer__digit widget_countDownTimer__${name}__1`}>
                        {digits[0]}
                    </span>
                </Fragment>
            );
        }
        if (digits.length >= 2) {
            return digits.map((digit: string, index: number) => {
                return (
                    <Fragment>
                        <span className={`widget_countDownTimer__digit widget_countDownTimer__${name}__${index}`}>
                            {digit}
                        </span>
                    </Fragment>
                );
            });
        }
    };
    const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
        if (completed && displayDoneContent) {
            return content;
        } else {
            return (
                <Fragment>
                    <div className="widget_countDownTimer__container">
                        {showDays && (
                            <Fragment>
                                <div className="widget_countDownTimer__value">
                                    <span className="widget_countDownTimer__days">{formatValues(days, "days")}</span>
                                    {showLegends && <span className="widget_countDownTimer__legend">Days</span>}
                                </div>
                            </Fragment>
                        )}
                        {showHours && (
                            <Fragment>
                                {showDays && <Separator />}
                                <div className="widget_countDownTimer__value">
                                    <span className="widget_countDownTimer__hours">{formatValues(hours, "hours")}</span>
                                    {showLegends && <span className="widget_countDownTimer__legend">Hours</span>}
                                </div>
                            </Fragment>
                        )}
                        {showMinutes && (
                            <Fragment>
                                {showHours && <Separator />}
                                <div className="widget_countDownTimer__value">
                                    <span className="widget_countDownTimer__minutes">
                                        {formatValues(minutes, "minutes")}
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
                                        {formatValues(seconds, "seconds")}
                                    </span>
                                    {showLegends && <span className="widget_countDownTimer__legend">Seconds</span>}
                                </div>
                            </Fragment>
                        )}
                    </div>
                </Fragment>
            );
        }
    };
    console.log(`whenDone`, whenDone);
    return (
        <Fragment>
            <Countdown
                renderer={renderer}
                date={incomingTime as Date}
                onComplete={() => whenDone && whenDone.canExecute && whenDone.execute()}
            />
        </Fragment>
    );
};

export default TimerDisplay;
