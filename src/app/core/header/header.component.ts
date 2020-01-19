import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isOpen = false;
  constructor(private dataStorageService: DataStorageService,
              public authService: AuthService) {}

  ngOnInit() {}

  onShowDropdown() {
    this.isOpen = !this.isOpen;
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: Response) => { console.log(response); },
      (error: Response) => { console.log(error); }
    );
  }

  onGetRecipes() {
    this.dataStorageService.getRecipes();
  }

  onLogout(){
    this.authService.logout();
  }
}
