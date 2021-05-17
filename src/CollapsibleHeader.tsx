import { Component, createElement, cloneElement, Fragment, ReactElement } from "react";
import { View, ViewStyle, SafeAreaView, StatusBar } from "react-native";

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

    renderHeader = this._renderHeader.bind(this);

    componentDidMount() {
        // setBar To Light On Time Out as It get missed/overridden somewhere in the render process
        setTimeout(() => {
            StatusBar.setBarStyle("light-content", true);
        }, 0);
    }
    _renderHeader(): ReactElement {
        return (
            <Fragment>
                <View>{this.props.headerArea}</View>
            </Fragment>
        );
    }

    render(): ReactElement {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Parallax
                    headerActionArea={this.props.headerActionArea}
                    headerArea={this.props.headerArea}
                    uiPaddingSides={this.props.uiPaddingSides}
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
