import { act, renderHook } from "@testing-library/react-hooks";
import { describe, expect, test } from "vitest";
import { resultToArrays } from "./testUtils";
import { UseStreamWithProbabilitiesOptions } from "./types";
import { useStreamWithProbabilities } from "./useStreamWithProbabilities";

const options: UseStreamWithProbabilitiesOptions = {
  autoStart: true,
  loop: false,
  delayMsProbabilities: [{ delayMs: 0, prob: 1 }],
  delayMultiplier: 0,
  loopDelayMs: 0,
  autoStartDelayMs: 0,
  tokenCharsProbabilities: [
    {
      tokenChars: 100,
      prob: 1,
    },
  ],
};

describe("useStreamWithProbabilities", () => {
  test("all at once", async () => {
    const { result, waitFor } = renderHook(() =>
      useStreamWithProbabilities("Hello", options),
    );
    await waitFor(() => {
      expect(result.current.output).toEqual("Hello");
      expect(result.current.isStarted).toBe(true);
      expect(result.current.isFinished).toBe(true);
    });
  });

  test("2 chars at a time", async () => {
    const { result, waitFor } = renderHook(() =>
      useStreamWithProbabilities("Hello", {
        ...options,
        tokenCharsProbabilities: [
          {
            tokenChars: 2,
            prob: 1,
          },
        ],
      }),
    );
    await waitFor(() => {
      const { output, isStarted, isFinished } = resultToArrays(result);

      expect(output).toEqual(["", "He", "Hell", "Hello"]);
      expect(isStarted).toEqual([false, true, true, true]);
      expect(isFinished).toEqual([false, false, false, true]);
    });
  });

  test("autoStart: false", () => {
    const { result } = renderHook(() =>
      useStreamWithProbabilities("Hello", { ...options, autoStart: false }),
    );

    expect(result.current.output).toBe("");
    expect(result.current.isStarted).toBe(false);
    expect(result.current.isFinished).toBe(false);
  });

  test("start()", () => {
    const { result } = renderHook(() =>
      useStreamWithProbabilities("Hello", { ...options, autoStart: false }),
    );
    act(() => result.current.start());
    expect(result.current.output).toBe("Hello");
    expect(result.current.isStarted).toBe(true);
    expect(result.current.isFinished).toBe(true);
  });

  test("reset()", () => {
    const { result } = renderHook(() =>
      useStreamWithProbabilities("Hello", options),
    );
    act(() => result.current.reset());
    expect(result.current.output).toBe("");
    expect(result.current.isStarted).toBe(false);
    expect(result.current.isFinished).toBe(false);
  });

  test("loop: true", async () => {
    const { result, waitFor } = renderHook(() =>
      useStreamWithProbabilities("Hello", { ...options, loop: true }),
    );
    await waitFor(() => {
      const { output, isStarted, isFinished } = resultToArrays(result);
      expect(output.slice(0, 4)).toEqual(["", "Hello", "", "Hello"]);
      expect(isStarted).toEqual([false, true, false, true]);
      expect(isFinished).toEqual([false, true, false, true]);
    });
  });
});