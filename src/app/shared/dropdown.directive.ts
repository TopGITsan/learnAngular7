import { Directive, HostBinding, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;
  @HostListener('mouseenter') onToggle() {
    this.isOpen = !this.isOpen;
    console.log('Element was hovers', this.isOpen);
  }
  @HostListener('mouseleave') ontoggle() {
    this.isOpen = !this.isOpen;
    console.log('Mouse left element', this.isOpen);
  }
}
