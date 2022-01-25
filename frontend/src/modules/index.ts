import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { IToastService } from "native-base/lib/typescript/components/composites/Toast";
import React from "react";

export const wait = (sec: number) => {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
};

export const uploadImageHandler = async (
  uploadImage: (formData: FormData) => void
) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
  });
  if (!result.cancelled) {
    const fileInfo = await FileSystem.getInfoAsync(result.uri);
    if (fileInfo) {
      const formData = new FormData();
      const filename = result.uri.split("/")[result.uri.split("/").length - 1];
      const type = `${result.type}/${
        result.uri.split(".")[result.uri.split(".").length - 1]
      }`;

      formData.append("file", {
        // @ts-ignore
        uri: result.uri,
        name: filename,
        type: type,
      });
      uploadImage(formData);
    }
  }
};

const TOAST_ID = "toast";

export const getAlert = (
  toast: IToastService,
  AlertComponent: React.ReactNode
) => {
  if (!toast.isActive(TOAST_ID)) {
    toast.show({
      id: TOAST_ID,
      duration: 10000,
      render: () => AlertComponent,
    });
  }
};

export const getRandomString = () => Math.random().toString(36).substring(2, 7);

export const useThrottle = <T>(value: T, interval = 2000): T => {
  const [throttledValue, setThrottledValue] = React.useState<T>(value);
  const lastExecuted = React.useRef<number>(Date.now());

  React.useEffect(() => {
    if (Date.now() >= lastExecuted.current + interval) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval);

      return () => clearTimeout(timerId);
    }
  }, [value, interval]);

  return throttledValue;
};
