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
    TouchableHighlight,
    StyleSheet,
    View,
    Button,
    ScrollView,
    Dimensions,
    Platform,
    Text,
    StatusBar,
    NativeModules,
    findNodeHandle
} from "react-native";
import { CollapsibleHeaderStyle } from "../ui/styles";
import Svg, { Path } from "react-native-svg";
import { deepForEach } from "react-children-utilities";
import { withAnchorPoint } from "react-native-anchor-point";

const { width } = Dimensions.get("screen");
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
    headerActionArea: any;
    navigation: any;
    uiPaddingSides: any;
    headerArea: any;
    headerFontSize: any;
}

const Parallax: React.FC<PropsWithChildren<CollapsibleHeaderProps>> = ({
    maxHeight,
    minHeight,
    children,
    style,
    navigation,
    headerArea,
    uiPaddingSides,
    headerFontSize,
    headerActionArea
}: PropsWithChildren<CollapsibleHeaderProps>) => {
    const SET_FONT_SIZE = headerFontSize || 30;
    const [statusBarHeight, setStatusBarHeight] = useState<number | undefined>(0);
    const [showBackButton, setShowBackButton] = useState<boolean>(false);
    const scrollPositionY = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<Animated.AnimatedComponent<ScrollView>>(null);
    const HEADER_MAX_HEIGHT = useMemo(
        () => (maxHeight ? maxHeight : style?.header.maxHeight ? style.header.maxHeight : 400),
        [maxHeight, style]
    );
    const HEADER_MIN_HEIGHT = useMemo(
        () => (minHeight ? minHeight : style?.header.minHeight ? style.header.minHeight : 300),
        [minHeight, style]
    );
    const BG_COLOR = useMemo(() => style?.header.backgroundColor || "rgba(255,255,255,1)", [style]);

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
                }, 10);
            }
        }
    }, []);

    const TranslateHeaderXWithBackButton = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, SET_FONT_SIZE * 0.6],
        extrapolate: "clamp"
    });
    const TranslateHeaderXNoBackButton = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -SET_FONT_SIZE / 2],
        extrapolate: "clamp"
    });

    const TranslateBackbuttonY = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [-SET_FONT_SIZE, 8],
        extrapolate: "clamp"
    });

    const ScalePageTitle = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.9],
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
            <Animated.View
                style={[
                    {
                        top: 0,
                        width,
                        position: "absolute",
                        height: headerTranslate
                    },
                    { backgroundColor: BG_COLOR }
                ]}
            >
                <Animated.View
                    style={[
                        {
                            marginBottom: 10,
                            flexDirection: "row",
                            height: "100%",
                            alignItems: "flex-end",
                            paddingTop: statusBarHeight,
                            paddingLeft: HEADER_PADDING_SIDES,
                            paddingRight: HEADER_PADDING_SIDES
                        }
                    ]}
                >
                    <View
                        style={[
                            {
                                flexDirection: "column",
                                width: "100%"
                            }
                        ]}
                    >
                        <View
                            style={[
                                {
                                    flexDirection: "row"
                                }
                            ]}
                        >
                            <Animated.View
                                // @ts-ignore
                                style={[{ transform: [{ translateY: TranslateBackbuttonY }] }]}
                            >
                                {showBackButton && (
                                    <TouchableHighlight onPress={(): void => navigation.goBack()}>
                                        <Svg
                                            height={SET_FONT_SIZE}
                                            width={SET_FONT_SIZE}
                                            fill={"white"}
                                            viewBox="0 0 512 512"
                                        >
                                            <Path d="M427 234.625H167.296l119.702-119.702L256 85 85 256l171 171 29.922-29.924-118.626-119.701H427v-42.75z" />
                                        </Svg>
                                    </TouchableHighlight>
                                )}
                            </Animated.View>

                            {headerArea && (
                                <Animated.View
                                    // @ts-ignore
                                    style={[
                                        {
                                            width: showBackButton ? "74%" : "80%",
                                            marginLeft: showBackButton ? -SET_FONT_SIZE + 2 : 0,
                                            transform: [
                                                {
                                                    translateX: showBackButton
                                                        ? TranslateHeaderXWithBackButton
                                                        : TranslateHeaderXNoBackButton
                                                },

                                                { scale: ScalePageTitle }
                                            ]
                                        }
                                    ]}
                                >
                                    {headerArea}
                                </Animated.View>
                            )}
                            <View
                                style={[
                                    {
                                        width: "20%",
                                        alignSelf: "center",
                                        flexDirection: "row",
                                        justifyContent: "flex-end"
                                    }
                                ]}
                            >
                                {headerActionArea}
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </Animated.View>

            <Animated.View
                style={{
                    marginTop: Platform.OS === "ios" ? scrollTranslateIos : scrollTranslateAndroid,
                    height: "100%"
                }}
            >
                <ScrollView
                    style={{
                        height: "100%"
                    }}
                    // @ts-ignore
                    ref={scrollViewRef}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
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
