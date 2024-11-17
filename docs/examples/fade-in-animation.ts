export class FadeInAnimation {
  private duration: number;
  private startTime: number | null;
  private frameId: number | null;

  constructor(private readonly node: HTMLHeadingElement) {}

  start(duration: number) {
    this.duration = duration;
    this.onProgress(0);
    this.startTime = performance.now();
    this.frameId = requestAnimationFrame(() => this.onFrame());
  }
  onFrame() {
    const timePassed = performance.now() - this.startTime;
    const progress = Math.min(timePassed / this.duration, 1);

    this.onProgress(progress);

    // Do we still have more frames to paint?
    if (progress === 1) {
      this.stop();
      return;
    }

    this.frameId = requestAnimationFrame(() => this.onFrame());
  }
  onProgress(progress) {
    this.node.style.opacity = progress;
  }
  stop() {
    cancelAnimationFrame(this.frameId);
    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
  }
}
