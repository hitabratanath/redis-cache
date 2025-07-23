export default class Store {
  private map = new Map<string, string>();

  constructor(init?: Map<string, string>) {
    // TODO: Init the map from stroage
  }

  get(key: string): string | null {
    const val = this.map.get(key);
    if (val) {
      return val;
    }
    return null;
  }

  set(key: string, value: string): void {
    this.map.set(key, value);
  }

  del(key: string): number {
    if (this.map.has(key)) {
      this.map.delete(key);
      return 1;
    }
    return 0;
  }

  expire(key: string, seconds: number): boolean {
    if (this.map.has(key)) {
      setTimeout(() => {
        this.del(key);
      }, seconds * 1000);
      // Indicates the expiration was successfully set
      return true;
    }
    // Indicates the key does not exist, so expiration was not set
    return false;
  }
}
