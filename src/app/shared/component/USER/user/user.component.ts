import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/module/Iuser';
import { UserService } from 'src/app/shared/service/userService';
import { GetConfrimComponent } from '../../get-confrim/get-confrim.component';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userId!: number;
  userObj!: Iuser;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _matDialog : MatDialog,
    private _snackbar : SnackbarService,
    private _router : Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  // getUser() {
  //   this.userId = +this._activatedRoute.snapshot.paramMap.get('id')!;
  //   this._userService.getUserById(this.userId).subscribe({
  //     next: (data) => {
  //       this.userObj = data;
  //     },
  //   });
  // }
  getUser() {
  this._activatedRoute.paramMap.subscribe(params => {
    this.userId = +params.get('id')!;

    this._userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.userObj = data;
      }
    });
  });
}

  onRemove(){
    let config = new MatDialogConfig();
    config.width = '450px';
    config.disableClose  = true;
    config.data = `Are you sure to remove the user with id ${this.userId}..?`;
    let _matRef = this._matDialog.open(GetConfrimComponent,config);
    _matRef.afterClosed().subscribe(getConfirm =>{
      if(getConfirm){
        this._userService.onRemoveUser(this.userId).subscribe({
          next  : data =>{
            this._snackbar.openSnackbar(data.msg);
            this._router.navigate(['users'])
            
          }
        })
      }
    })


  }
}
