import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { HttpEvent } from '@angular/common/http';

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
      (response: HttpEvent<Object>) => { console.log(response); },
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
