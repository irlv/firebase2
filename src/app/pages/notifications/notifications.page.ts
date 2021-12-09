import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private dataService:DataService,private router:Router) { }

  ngOnInit() {
  }
  signOut() {
    this.dataService.Logout().then(() => {
      this.router.navigateByUrl('/', {replaceUrl: true});
    });
  }
  

}
