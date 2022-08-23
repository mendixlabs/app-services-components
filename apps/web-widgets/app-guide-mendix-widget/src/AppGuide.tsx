import { ReactNode, createElement, Fragment } from "react";
import JoyrideInit from "./components/JoyrideInit";
import { ValueStatus } from "mendix";
import { ReactAppGuideContainerProps } from "../typings/ReactAppGuideProps";

import "./ui/ReactAppGuide.css";

export const AppGuide = (props: ReactAppGuideContainerProps): ReactNode => {
    if (props.userWelcome.status !== ValueStatus.Available) {
        return <Fragment></Fragment>;
    }
    if (props.userWelcome.value) {
        return <Fragment></Fragment>;
    }
    return (
        <Fragment>
            <JoyrideInit
                showSkipButton={props.showSkipButton}
                listOfSteps={props.listOfSteps}
                tabIndex={props.tabIndex}
                arrowColor={props.arrowColor}
                backgroundColor={props.backgroundColor}
                onUserWelcomeChange={props.onUserWelcomeChange}
                primaryColor={props.primaryColor}
                overlayColor={props.overlayColor}
                textColor={props.textColor}
                showProgress={props.showProgress}
                userWelcome={props.userWelcome}
                isPageCall={props.isPageCall}
            />
        </Fragment>
    );
};
