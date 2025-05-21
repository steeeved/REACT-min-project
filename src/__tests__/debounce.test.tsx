// Unit tests for the Debounce utility class to ensure correct delayed execution,
// prevention of multiple rapid executions, and proper cancellation behavior.
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Debounce from "../utils/debounce";

describe("Debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // mocks timers e.g. setTimeout, setInterval, clearTimeout, clearInterval, setImmediate
  });

  afterEach(() => {
    vi.restoreAllMocks(); // This clears mock history, restore all original mock implementations & restore original descriptors of spied-on objects
  });

  // Test to confirm that repeated calls to the debounced function only result in a single execution after the delay period.
  it("it only executes once for multiple calls", () => {
    const debouncer = new Debounce();
    const mockFn = vi.fn();
    const debouncedFn = debouncer.debounce(mockFn, 500);

    debouncedFn();
    debouncedFn();
    debouncedFn();
    debouncedFn();
    debouncedFn();
    debouncedFn();

    vi.advanceTimersByTime(500); // advanceTimersByTime invokes every initiated timer until the specified number of milliseconds is passed or the queue is empty - whatever comes first. // simply moves time forward
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  // Test to ensure that calling cancel prevents the function from executing even if the delay period has elapsed.
  it("it cancels pending execution", () => {
    const debouncer = new Debounce();
    const mockFn = vi.fn();
    const debouncedFn = debouncer.debounce(mockFn, 500);

    debouncedFn();
    debouncer.cancel();

    vi.advanceTimersByTime(500);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('it should clear previous timeouts on new debounce call', () => {
    const debounce = new Debounce();
    const mockFn1 = vi.fn();
    const mockFn2 = vi.fn();

    const debouncedFn1 = debounce.debounce(mockFn1, 100);
    debouncedFn1();
    vi.advanceTimersByTime(50);

    const debouncedFn2 = debounce.debounce(mockFn2, 100);
    debouncedFn2();

    vi.advanceTimersByTime(50);
    expect(mockFn1).not.toHaveBeenCalled(); // we expect that mockFn1 will never have been called because it was cleared when debouncedFn2 was created
    
    vi.advanceTimersByTime(50);
    expect(mockFn2).toHaveBeenCalledTimes(1);
  });
});
