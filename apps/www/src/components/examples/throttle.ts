import { throttleBasic } from "@llm-ui/react/throttle";

export type ThrottleType = "buffered" | "low-lag";

export const throttleLowLag = throttleBasic({
  adjustPercentage: 0.35,
  frameLookbackMs: 500,
  readAheadChars: 10,
  targetBufferChars: 9,
});

export const getThrottle = (throttleType: ThrottleType | undefined) => {
  if (throttleType === "low-lag" || throttleType === undefined) {
    return throttleLowLag;
  }
  return throttleBasic();
};
