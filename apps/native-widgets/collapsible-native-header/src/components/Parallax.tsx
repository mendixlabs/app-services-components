import React, {
    ReactElement,
    createElement,
    Fragment,
    PropsWithChildren,
    useMemo,
    useState,
    useRef,
    useEffect
} from "react";
import {
    Animated,
    Text,
    TouchableWithoutFeedback,
    View,
    ScrollView,
    Dimensions,
    Platform,
    StatusBar,
    NativeModules
} from "react-native";

import { CollapsibleHeaderStyle } from "../ui/styles";
import Svg, { Path } from "react-native-svg";
const { width, height } = Dimensions.get("screen");
const { StatusBarManager } = NativeModules;

export interface RenderOverlayParameters {
    scrollPositionY?: Animated.Value;
    scrollDistance?: number;
    maxHeight?: number;
}

export interface CollapsibleHeaderProps {
    maxHeight?: number;
    minHeight?: number;
    style?: CollapsibleHeaderStyle;
    renderOverlay?: ({ scrollPositionY, scrollDistance, maxHeight }: RenderOverlayParameters) => ReactElement;
    headerActionArea: any[];
    navigation: any;
    uiPaddingSides: any;
    headerFontSize: any;
    collapsedFontSize: any;
    headerTextColor: any;
    backButtonSize: number;
    bottomFooterHeight: number;
    headerBackgroundColor: string;
}

const Parallax: React.FC<PropsWithChildren<CollapsibleHeaderProps>> = ({
    maxHeight,
    minHeight,
    children,
    style,
    navigation,
    headerBackgroundColor,
    headerTextColor,
    uiPaddingSides,
    collapsedFontSize,
    bottomFooterHeight,
    backButtonSize,
    headerFontSize,
    headerActionArea
}: PropsWithChildren<CollapsibleHeaderProps>) => {
    console.log(`headerActionArea`, headerActionArea);
    /**
     * Set Up Starting Values
     */
    const SET_FONT_SIZE = headerFontSize || 28;
    const COLLAPSED_FONT_SIZE = collapsedFontSize || SET_FONT_SIZE - 10;
    const BACK_BUTTON_SIZE = backButtonSize || SET_FONT_SIZE - 2;
    const HEADER_COLOR = headerTextColor || "white";

    const [statusBarHeight, setStatusBarHeight] = useState<number | undefined>(0);
    const [showBackButton, setShowBackButton] = useState<boolean>(false);
    const [showContentArea, setShowContentArea] = useState<boolean>(false);
    const [canViewScroll, setCanViewScroll] = useState<boolean>(true);
    const scrollPositionY = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<Animated.AnimatedComponent<ScrollView>>(null);
    const HEADER_MAX_HEIGHT = useMemo(() => (maxHeight ? maxHeight : 400), [maxHeight]);
    const HEADER_MIN_HEIGHT = useMemo(() => (minHeight ? minHeight : 300), [minHeight]);
    const BG_COLOR = useMemo(() => headerBackgroundColor || "rgba(255,255,255,1)", [headerBackgroundColor]);

    const HEADER_SCROLL_DISTANCE = useMemo(() => HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, [
        HEADER_MAX_HEIGHT,
        HEADER_MIN_HEIGHT
    ]);
    const HEADER_PADDING_SIDES = uiPaddingSides;

    useEffect(() => {
        if (StatusBarManager.getHeight) {
            StatusBarManager.getHeight(({ height }: any) => {
                setStatusBarHeight(height);
            });
        } else {
            setStatusBarHeight(StatusBar.currentHeight);
        }
    }, [StatusBarManager]);
    useEffect(() => {
        seeIfThereIsContentInHeaderActionArea();

        if (navigation.isFirstRouteInParent()) {
            setShowBackButton(false);
        } else {
            setShowBackButton(true);
        }
    }, [navigation]);
    // We're applying this dirty trick, because we can't use scrollOffSet in Android before RN 0.64 (MX uses 0.61 currently)
    useEffect(() => {
        if (scrollViewRef.current && scrollViewRef.current.getNode) {
            const node = scrollViewRef.current.getNode();
            if (node) {
                setTimeout(() => {
                    node.scrollTo({ x: 0, y: HEADER_SCROLL_DISTANCE, animated: false });
                }, 0);
            }
        }
    }, []);
    const seeIfThereIsContentInHeaderActionArea = () => {
        if (headerActionArea && headerActionArea.length) {
            for (const key in headerActionArea) {
                const element = headerActionArea[key];
                if (element && element.props.content && element.props.content.length) {
                    setShowContentArea(true);
                    break;
                }
            }
        }
    };
    const onContentSizeChange = (contentWidth: any, contentHeight: any) => {
        // Device Height - HeaderHeight - FooterHeight = Available Space
        const availableSpace = height - HEADER_MAX_HEIGHT - bottomFooterHeight;

        if (availableSpace > contentHeight) {
            if (canViewScroll) {
                setCanViewScroll(false);
            }
        }
        if (contentHeight > availableSpace) {
            if (!canViewScroll) {
                setCanViewScroll(true);
            }
        }
    };
    const HeaderFontSize = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [SET_FONT_SIZE, COLLAPSED_FONT_SIZE],
        extrapolate: "clamp"
    });

    const TranslateBackButtonYIos = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, BACK_BUTTON_SIZE * 0.9],
        extrapolate: "clamp"
    });
    const TranslateBackButtonYAndroid = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, SET_FONT_SIZE * 0.85],
        extrapolate: "clamp"
    });
    const PaddingPageHeaderLeft = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, SET_FONT_SIZE * 1.2],
        extrapolate: "clamp"
    });

    const headerTranslate = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: "clamp"
    });
    const scrollTranslateIos = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [
            statusBarHeight ? HEADER_MAX_HEIGHT - statusBarHeight : HEADER_MAX_HEIGHT,
            statusBarHeight ? HEADER_MIN_HEIGHT - statusBarHeight : HEADER_MIN_HEIGHT
        ],
        extrapolate: "clamp"
    });
    const scrollTranslateAndroid = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: "clamp"
    });
    return (
        <Fragment>
            {/* Does Collapsing */}
            <Animated.View
                style={[
                    {
                        top: 0,
                        width,
                        position: "absolute",
                        alignItems: "flex-end",
                        height: headerTranslate,
                        backgroundColor: BG_COLOR
                    }
                ]}
            >
                {/* Does Containing */}
                <Animated.View
                    style={[
                        {
                            height: "100%",
                            marginBottom: 10,
                            paddingBottom: 12,
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            paddingTop: statusBarHeight,
                            paddingLeft: HEADER_PADDING_SIDES,
                            paddingRight: HEADER_PADDING_SIDES
                        }
                    ]}
                >
                    {/* If Page Can Go Back Show Back Button */}
                    {showBackButton && (
                        <TouchableWithoutFeedback onPress={(): void => navigation.goBack()}>
                            <Animated.View
                                // @ts-ignore
                                style={[
                                    {
                                        zIndex: 9,
                                        width: BACK_BUTTON_SIZE,
                                        transform: [
                                            {
                                                translateY: showBackButton
                                                    ? Platform.OS === "ios"
                                                        ? TranslateBackButtonYIos
                                                        : TranslateBackButtonYAndroid
                                                    : 0
                                            }
                                        ]
                                    }
                                ]}
                            >
                                <Svg
                                    height={BACK_BUTTON_SIZE}
                                    width={BACK_BUTTON_SIZE}
                                    fill={HEADER_COLOR}
                                    viewBox="0 0 512 512"
                                >
                                    <Path d="M427 234.625H167.296l119.702-119.702L256 85 85 256l171 171 29.922-29.924-118.626-119.701H427v-42.75z" />
                                </Svg>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    )}
                    <View
                        style={[
                            {
                                flexDirection: "row",
                                width: "100%"
                            }
                        ]}
                    >
                        <View style={{ flexGrow: 3, maxWidth: showContentArea ? "80%" : "100%" }}>
                            <Animated.Text
                                ellipsizeMode="tail"
                                numberOfLines={showBackButton ? 1 : 2}
                                style={{
                                    color: HEADER_COLOR,
                                    fontSize: HeaderFontSize,
                                    marginLeft: showBackButton ? PaddingPageHeaderLeft : 0
                                }}
                            >
                                {navigation.state.params.title}
                            </Animated.Text>
                        </View>
                        {showContentArea && (
                            <View
                                style={[
                                    {
                                        flexGrow: 1,
                                        width: "20%",
                                        alignSelf: "center",
                                        flexDirection: "row",
                                        justifyContent: "flex-end"
                                    }
                                ]}
                            >
                                {headerActionArea}
                            </View>
                        )}
                    </View>
                </Animated.View>
            </Animated.View>

            <Animated.View
                style={{
                    flex: 1,
                    marginTop: Platform.OS === "ios" ? scrollTranslateIos : scrollTranslateAndroid
                }}
            >
                <ScrollView
                    style={{
                        flex: 1,
                        height: "100%"
                        // backgroundColor: "orange"
                        //    marginTop: Platform.OS === "ios" ? scrollTranslateIos : scrollTranslateAndroid
                        // marginBottom: HEADER_MAX_HEIGHT,
                    }}
                    // @ts-ignore
                    ref={scrollViewRef}
                    scrollEventThrottle={16}
                    scrollEnabled={canViewScroll}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={onContentSizeChange}
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: canViewScroll ? HEADER_MIN_HEIGHT : 0
                    }} // Try and Compensate for half Scrolling
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollPositionY } } }], {
                        useNativeDriver: false
                    })}
                >
                    {children}
                </ScrollView>
            </Animated.View>
        </Fragment>
    );
};

export default Parallax;
