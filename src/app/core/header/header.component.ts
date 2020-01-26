import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { HttpEvent, HttpProgressEvent } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isOpenUserMenu = false;
  isOpenFormMenu = false;

  constructor(private dataStorageService: DataStorageService,
              public authService: AuthService) {}

  ngOnInit() {}

  onShowDropdown(type: string) {
    type === 'user' ? (this.isOpenUserMenu = !this.isOpenUserMenu)
      : (type === 'form') ? (this.isOpenFormMenu = !this.isOpenFormMenu) : null;
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: HttpProgressEvent) => { console.log('response: ', response, ' type: ', response.type, ' loaded: ', response.loaded); },
      (error: HttpEvent<Object>) => { console.log(error); }
    );
  }

  onGetRecipes() {
    this.dataStorageService.getRecipes();
  }

  onLogout(){
    this.authService.logout();
  }
}
