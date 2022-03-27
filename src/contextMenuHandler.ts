// https://github.com/facebook/react/issues/17596
import React from "react";

const longPressDuration = 610;

export default class ContextMenuHandler {
  private callback: (() => void) | undefined;

  private longPressCountdown: NodeJS.Timeout | null;

  constructor() {
    this.longPressCountdown = null;
  }

  public onTouchStart = (callback: () => void) => {
    this.callback = callback;

    this.longPressCountdown = setTimeout(() => {
      if (this.callback) {
        this.callback();
      }
    }, longPressDuration);
  };

  public onTouchMove = () => {
    this.checkAndClearTimeout();
  };

  public onTouchCancel = () => {
    this.checkAndClearTimeout();
  };

  public onTouchEnd = () => {
    this.checkAndClearTimeout();
  };

  public onContextMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    callback: () => void
  ) => {
    if (this.callback === undefined) {
      this.callback = callback;
    }
    this.checkAndClearTimeout();

    this.callback();
    e.preventDefault();
  };

  private checkAndClearTimeout() {
    if (this.longPressCountdown) {
      clearTimeout(this.longPressCountdown);
    }
  }
}
