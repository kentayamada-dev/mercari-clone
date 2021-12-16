import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { Animated, ImageURISource, StyleSheet, View } from "react-native";

type Props = {
  children: React.ReactNode;
  image: ImageURISource;
  prepare: () => Promise<void>;
};

export const AnimatedAppLoader: React.VFC<Props> = ({
  image,
  prepare,
  children,
}) => {
  const [isSplashReady, setSplashReady] = React.useState(false);
  const startAsync = React.useMemo(
    () => () => Asset.fromModule(image as any).downloadAsync(),
    [image]
  );
  const onFinish = React.useMemo(() => setSplashReady(true), []);

  if (!isSplashReady) {
    return (
      <AppLoading
        autoHideSplash={false}
        startAsync={startAsync as any}
        onError={console.error}
        onFinish={onFinish as any}
      />
    );
  }

  return (
    <AnimatedSplashScreen image={image} prepare={prepare} children={children} />
  );
};

export const AnimatedSplashScreen: React.VFC<Props> = ({
  children,
  image,
  prepare,
}) => {
  const animation = React.useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setIsAppReady] = React.useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] =
    React.useState(false);
  const onImageLoaded = React.useMemo(
    () => async () => {
      await SplashScreen.preventAutoHideAsync();
      await prepare();
      setIsAppReady(true);
    },
    []
  );

  React.useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest?.splash?.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest?.splash?.resizeMode,
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
};