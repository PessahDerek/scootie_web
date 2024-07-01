import {Directive, ElementRef, EventEmitter, HostListener, Output} from "@angular/core";

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter();

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  public onClick(event: Event) {
    const clickedInside = this.elementRef.nativeElement?.contains(event.target as Node);
    if (!clickedInside) {
      this.clickOutside.emit(null);
    }
  }
}
