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
    StatusBar,
    NativeModules,
    findNodeHandle
} from "react-native";
import { CollapsibleHeaderStyle } from "../ui/styles";
import Svg, { Path } from "react-native-svg";
import { deepForEach } from "react-children-utilities";

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
}

const Parallax: React.FC<PropsWithChildren<CollapsibleHeaderProps>> = ({
    maxHeight,
    minHeight,
    children,
    style,
    headerActionArea,
    navigation,
    uiPaddingSides,
    headerArea
}: PropsWithChildren<CollapsibleHeaderProps>) => {
    const [statusBarHeight, setStatusBarHeight] = useState<number | undefined>(0);
    const [showBackButton, setShowBackButton] = useState<boolean>(false);
    const scrollPositionY = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<Animated.AnimatedComponent<ScrollView>>(null);
    const testREf = useRef(null);
    console.log(`statusBarHeight`, statusBarHeight);
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
                }, 1);
            }
        }
    }, []);

    const ScalePageTitle = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.7],
        extrapolate: "clamp"
    });

    const TranslateX = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [
            showBackButton ? -HEADER_PADDING_SIDES * 1.5 : 0,
            showBackButton ? -HEADER_PADDING_SIDES * 1.5 : -HEADER_PADDING_SIDES - 20
        ],
        extrapolate: "clamp"
    });
    const TranslateY = scrollPositionY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_PADDING_SIDES * 2, 2],
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
                            width,
                            bottom: 0,
                            marginBottom: 10,
                            position: "absolute",
                            flexDirection: "row",
                            alignItems: "center",
                            height: headerTranslate,
                            paddingTop: statusBarHeight,
                            justifyContent: "space-between",
                            paddingLeft: HEADER_PADDING_SIDES / 2,
                            paddingRight: HEADER_PADDING_SIDES / 2
                        }
                    ]}
                >
                    <View
                        style={[
                            {
                                height: "100%",
                                flexDirection: "row",
                                alignItems: "center"
                            }
                        ]}
                    >
                        {showBackButton && (
                            <TouchableHighlight onPress={(): void => navigation.goBack()}>
                                <Svg height="24" width="24" fill={"white"} viewBox="0 0 512 512">
                                    {Platform.select({
                                        ios: (
                                            <Path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
                                        ),
                                        android: (
                                            <Path d="M427 234.625H167.296l119.702-119.702L256 85 85 256l171 171 29.922-29.924-118.626-119.701H427v-42.75z" />
                                        )
                                    })}
                                </Svg>
                            </TouchableHighlight>
                        )}

                        {headerArea && (
                            <Animated.View
                                // @ts-ignore
                                ref={testREf}
                                style={[
                                    {
                                        width: width / 1.6,
                                        alignSelf: "center",
                                        transform: [
                                            { translateX: TranslateX },
                                            { translateY: TranslateY },
                                            { scale: ScalePageTitle }
                                        ]
                                    }
                                ]}
                            >
                                {headerArea}
                            </Animated.View>
                        )}
                    </View>
                    <View
                        style={[
                            {
                                flexDirection: "row"
                            }
                        ]}
                    >
                        {headerActionArea}
                    </View>
                </Animated.View>
            </Animated.View>

            <Animated.View
                style={{
                    marginTop: Platform.OS === "ios" ? scrollTranslateIos : scrollTranslateAndroid
                    // height: "100%"
                }}
            >
                <ScrollView
                    style={
                        {
                            // height: "100%"
                        }
                    }
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
