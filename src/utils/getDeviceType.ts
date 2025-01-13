export const getDeviceType = (): string => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
    if (/android/i.test(userAgent)) {
      return "android";
    }
  
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      return "ios";
    }
  
    return "web";
  };