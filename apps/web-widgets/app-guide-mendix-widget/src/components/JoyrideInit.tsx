import { createElement, useState, ReactElement, useEffect, Fragment } from "react";
import Joyride, { STATUS } from "react-joyride";
import { ReactAppGuideContainerProps } from "../../typings/ReactAppGuideProps";
import { reFormattedList, findAndTriggerScroll } from "../utils";

type ExcludedReactAppGuideContainerProps = Omit<ReactAppGuideContainerProps, "class" | "name">;
const JoyrideInit = ({
    listOfSteps,
    showSkipButton,
    showProgress,
    onUserWelcomeChange,
    isPageCall,
    arrowColor,
    overlayColor,
    textColor,
    primaryColor,
    backgroundColor
}: ExcludedReactAppGuideContainerProps): ReactElement => {
    const [isLoading, setIsLoading] = useState(true); // DOM
    const formattedList = reFormattedList(listOfSteps);
    const [stepCounter, setStepCounter] = useState<number>(0);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
    }, []);

    const _areYouDone = (data: any): void => {
        const { status, action, index, lifecycle } = data;

        if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
            if (onUserWelcomeChange?.canExecute) {
                onUserWelcomeChange.execute();
            }
        }

        if (action === "next" && index === stepCounter && lifecycle === "complete") {
            const updateIndex = index + 1;
            const foundObject = formattedList[updateIndex];
            if (foundObject) {
                findAndTriggerScroll((foundObject as any).target);
            }
            setStepCounter(updateIndex);
        }

        if (action === "prev" && index === stepCounter && lifecycle === "complete") {
            const updateIndex = index - 1;
            const foundObject = formattedList[updateIndex];
            setStepCounter(updateIndex);
            if (foundObject) {
                findAndTriggerScroll((foundObject as any).target);
            }
        }
    };
    if (isLoading) {
        return <Fragment></Fragment>;
    }
    return (
        <div>
            <Joyride
                run
                steps={formattedList}
                scrollOffset={250}
                stepIndex={stepCounter}
                callback={_areYouDone}
                continuous
                disableScrollParentFix
                disableScrolling={false}
                scrollToFirstStep // Decided Not To make User Changeable
                disableOverlayClose // Decided Not To make User Changeable
                showProgress={showProgress}
                showSkipButton={showSkipButton}
                locale={{ last: isPageCall ? "Next" : "Complete" }}
                styles={{
                    buttonClose: {
                        display: "none"
                    },
                    options: {
                        arrowColor: arrowColor ? arrowColor : "#fff",
                        overlayColor: overlayColor ? overlayColor : "rgb(0 0 0 / 50%)",
                        backgroundColor: backgroundColor ? backgroundColor : "#fff",
                        primaryColor: primaryColor ? primaryColor : "#000",
                        textColor,
                        zIndex: 1000
                    }
                }}
            />
        </div>
    );
};

export default JoyrideInit;
