import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  teamData;
  constructor( @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<PopupComponent>,
             ) {
              this.teamData = data.team
              }

  ngOnInit(): void {
  }

  onClickOk():void{
    this.dialogRef.close();
  }

}