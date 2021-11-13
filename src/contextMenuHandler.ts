const longPressDuration = 610;

export default class ContextMenuHandler {
  private callback: (() => void) | undefined;
  private longPressCountdown: NodeJS.Timeout | null;

  constructor() {
    this.longPressCountdown = null;
  }

  onTouchStart = (
    e: React.TouchEvent<HTMLButtonElement>,
    callback: () => void
  ) => {
    this.callback = callback;

    this.longPressCountdown = setTimeout(() => {
      this.callback && this.callback();
    }, longPressDuration);
  };

  onTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    this.longPressCountdown && clearTimeout(this.longPressCountdown);
  };

  onTouchCancel = (e: React.TouchEvent<HTMLButtonElement>) => {
    this.longPressCountdown && clearTimeout(this.longPressCountdown);
  };

  onTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    this.longPressCountdown && clearTimeout(this.longPressCountdown);
  };

  onContextMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    callback: () => void
  ) => {
    if (this.callback === undefined) {
      this.callback = callback;
    }
    this.longPressCountdown && clearTimeout(this.longPressCountdown);

    this.callback();
    e.preventDefault();
  };
}
