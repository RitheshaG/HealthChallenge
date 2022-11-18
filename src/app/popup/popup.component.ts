import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  teamData;
  totalDays: any = [];
  teamName: string;
  Math = Math;
  rank: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponent>,
  ) {
    this.teamData = data.team
    this.rank = data.rank;
    this.teamName = this.teamData.find((s: any) => s)?.teamName ?? '';
    const maxday = Math.max(...data.team.map((s: any) => s.totalKMSAsOfNow.length));
    this.totalDays = Array(maxday).fill(0);
  }

  ngOnInit(): void {
  }

  onClickOk(): void {
    this.dialogRef.close();
  }
  totalPoints(week: any): number {

    if (this.teamData.length != 4) {
      return 0;
    }

    const total = Math.min(...this.teamData.map((a: any) => a[week]));

    let rank = 0;
    for (const km of [14, 21, 28, 35, 42, 49, 56]) {
      if (total >= km) {
        rank += 1;
      }
    }
    return rank;
  }
}
