import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { debounce } from "../utils/debounce";

describe("debounce function", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("only executes once for multiple calls", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn();
    debouncedFn();
    debouncedFn();
    debouncedFn();
    debouncedFn();

    vi.advanceTimersByTime(500);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("can be canceled by clearing timeout externally", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn();
    vi.clearAllTimers();

    vi.advanceTimersByTime(500);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it("clears previous timeouts on new calls", () => {
    const mockFn1 = vi.fn();
    const mockFn2 = vi.fn();

    const debouncedFn1 = debounce(mockFn1, 100);
    debouncedFn1();
    vi.advanceTimersByTime(50);

    const debouncedFn2 = debounce(mockFn2, 100);
    debouncedFn2();

    vi.advanceTimersByTime(50);
    expect(mockFn1).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(mockFn2).toHaveBeenCalledTimes(1);
  });
});
