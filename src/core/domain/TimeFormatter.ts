export class TimeFormatter {
  public static formatMilliseconds(ms: number): string {
    if (ms < 0) return '00:00:00';
    
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private static pad(value: number): string {
    return value.toString().padStart(2, '0');
  }
}