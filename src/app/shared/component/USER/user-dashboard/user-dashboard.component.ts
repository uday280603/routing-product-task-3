import { Component, OnInit } from '@angular/core';
import { Iuser } from 'src/app/shared/module/Iuser';
import { UserService } from 'src/app/shared/service/userService';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  getAllUsers!: Iuser[];

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._userService.fetchAllUser().subscribe({
      next: (data) => {
        this.getAllUsers = data;
      },
    });
  }
}
