import { Component, createElement, ReactElement } from "react";
import { ViewStyle, SafeAreaView, StatusBar } from "react-native";
import { NativeModules } from "react-native";

import Parallax from "./components/Parallax";

import { Style, mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { CollapsibleHeaderProps } from "../typings/CollapsibleHeaderProps";
import { defaultCollapsibleHeaderStyle } from "./ui/styles";
import { withNavigation, withNavigationFocus } from "react-navigation";

export interface CustomStyle extends Style {
    container: ViewStyle;
    header: {
        backgroundColor?: string;
        minHeight?: number;
        maxHeight?: number;
    };
}

export interface WithNavigationProps extends CollapsibleHeaderProps<CustomStyle> {
    navigation: any;
}

class CollapsibleHeaders extends Component<WithNavigationProps> {
    private readonly styles = mergeNativeStyles(defaultCollapsibleHeaderStyle, this.props.style);

    componentDidMount() {
        // setBar To Light On Time Out as It gets missed/overridden somewhere in the render process
        setTimeout(() => {
            StatusBar.setBarStyle("light-content", true);
        }, 0);
    }

    render(): ReactElement {
        // console.log(`this.props.navigation`, this.props.navigation, NativeModules);
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Parallax
                    headerBackgroundColor={this.props.headerBackgroundColor}
                    bottomFooterHeight={this.props.bottomFooterHeight}
                    collapsedFontSize={this.props.collapsedFontSize}
                    headerActionArea={this.props.headerActionArea as any[]}
                    headerTextColor={this.props.headerTextColor}
                    uiPaddingSides={this.props.uiPaddingSides}
                    backButtonSize={this.props.backButtonSize}
                    headerFontSize={this.props.headerFontSize}
                    minHeight={this.props.uiMinHeight}
                    maxHeight={this.props.uiMaxHeight}
                    navigation={this.props.navigation}
                    style={this.styles}
                >
                    {this.props.contentArea}
                </Parallax>
            </SafeAreaView>
        );
    }
}
// @ts-ignore
const CollapsibleHeader = withNavigation(withNavigationFocus(CollapsibleHeaders));
export { CollapsibleHeader };
