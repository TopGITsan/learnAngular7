import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  isOpen = false;

  constructor() {}

  ngOnInit() {}

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onShowDropdown() {
    this.isOpen = !this.isOpen;
  }
}
