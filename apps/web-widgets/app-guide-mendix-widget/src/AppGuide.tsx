import { Component, ReactNode, createElement } from "react";

import JoyrideInit from "./components/JoyrideInit";

import { ReactAppGuideContainerProps } from "../typings/ReactAppGuideProps";

// import "./ui/ReactAppGuide.css";

export default class ReactAppGuide extends Component<ReactAppGuideContainerProps> {
    state = {
        display: false
    };

    componentDidUpdate(pP: ReactAppGuideContainerProps): void {
        const { userWelcome, isPageCall } = this.props;
        const { display } = this.state;
        if (userWelcome.value !== pP.userWelcome.value) {
            if (!userWelcome.value && userWelcome.value !== undefined) {
                /**
                 *  JS is Blocking the Updating Dom (JS single Thread)
                 * https://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
                 */
                setTimeout(() => {
                    this.setState({
                        display: true
                    });
                }, 0);
            }
        }
        if (userWelcome.value && display && !isPageCall) {
            this.setState({
                display: false
            });
        }
    }

    render(): ReactNode {
        const {
            textColor,
            listOfSteps,
            tabIndex,
            arrowColor,
            overlayColor,
            backgroundColor,
            userWelcome,
            primaryColor,
            showSkipButton,
            showProgress,
            isPageCall
        } = this.props;
        const { display } = this.state;

        if (!display) {
            return null;
        }
        return (
            <JoyrideInit
                showSkipButton={showSkipButton}
                listOfSteps={listOfSteps}
                tabIndex={tabIndex}
                arrowColor={arrowColor}
                backgroundColor={backgroundColor}
                primaryColor={primaryColor}
                overlayColor={overlayColor}
                textColor={textColor}
                showProgress={showProgress}
                userWelcome={userWelcome}
                isPageCall={isPageCall}
            />
        );
    }
}
