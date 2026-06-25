import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-confrim',
  templateUrl: './get-confrim.component.html',
  styleUrls: ['./get-confrim.component.scss'],
})
export class GetConfrimComponent implements OnInit {
  msg!: string;

  constructor(
    private _matRef: MatDialogRef<GetConfrimComponent>,
    @Inject(MAT_DIALOG_DATA) data: string,
  ) {
    this.msg = data;
  }

  ngOnInit(): void {}

  onClose(flag : boolean){
    this._matRef.close(flag)
  }
}
