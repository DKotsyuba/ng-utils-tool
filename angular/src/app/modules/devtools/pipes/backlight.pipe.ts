import {ChangeDetectorRef, ElementRef, Pipe, PipeTransform} from '@angular/core';

const up = 'backlight-up'
const down = 'backlight-down'
@Pipe({
  name: 'backlight',
  pure: false
})
export class BacklightPipe implements PipeTransform {

  private lastValue: number | null = null;
  private timer: any

  private get node() {
    return this.el.nativeElement.parentElement
  }
  constructor(private el: ElementRef<HTMLElement>) {
  }
  transform(value: any, ...args: unknown[]): any {
    this.effect(value)
    return value;
  }

  private effect(value: any): void {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    let newClass: string
    if (value === this.lastValue) return;
    if (value > this.lastValue) newClass = up
    if (value < this.lastValue) newClass = down
    this.addClass(newClass)
    this.lastValue = value
    this.scheduleClean()
  }

  private scheduleClean() {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.clearAllClass()
    }, 400)
  }

  private clearAllClass() {
    this.node.classList.remove(up, down)
  }

  private addClass(className: string) {
    if (!this.node.classList.contains(className)) {
      this.node.classList.add(className)
    }
    const revertClass = this.getRevertClassName(className)
    if (this.node.classList.contains(revertClass)) {
      this.node.classList.remove(revertClass)
    }
  }

  private getRevertClassName(className: string): string {
    if (className === up) return down;
    if (className === down) return up;
    return ''
  }

}
