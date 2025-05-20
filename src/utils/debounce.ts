class Debounce {
  private timeout: NodeJS.Timeout | undefined = undefined;

  debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
    this.cancel();

    return (...args: Parameters<T>) => {
      // if (this.timeout) {
      //   clearTimeout(this.timeout);
      // }
      this.timeout = setTimeout(() => func(...args), wait);
    };
  }

  cancel() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }
}

export default Debounce;
