import { Component, OnInit } from '@angular/core';
import { WalkathonService } from '../walkathon.service';
import { ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';

interface Challenge {
  id: Number;
  name: String;
  email: String;
  gender: String;
}

interface Player {
  memberId: number;
}
@Component({
  selector: 'app-walkathon',
  templateUrl: './walkathon.component.html',
  styleUrls: ['./walkathon.component.css']
})
export class WalkathonComponent {
  players: any;
  top5IndividualPlayers: any;
  top5OverallPlayers: any;
  teamLevel: any;

  constructor(private walkathonService: WalkathonService) {
    walkathonService.getTopPlayer().subscribe(res => {
      this.players = res.filter((s: any) => s.name);

      this.top5IndividualPlayers = this.players
        .sort((a: any, b: any) => b.currentDayCount - a.currentDayCount)
        .slice(0, 5);

      this.top5OverallPlayers = this.players
        .sort((a: any, b: any) => b.asOfDateCount - a.asOfDateCount)
        .slice(0, 5);

      this.getTeamData(this.players);

    });
  }
  getTeamData = (data: any) => {
    this.teamLevel = this.walkathonService.getTeams();
    this.teamLevel.forEach((team: any) => {
      const playerIds = [team.Player1id, team.Player2id, team.Player3id, team.Player4id];
      const Players = data.filter((player: any) => playerIds.includes(player.id));
      team['totalKM'] = +(Players?.reduce((a: any, b: any) => a += (+b.asOfDateCount), 0)?.toFixed(1) ?? 0);
      team['rank'] = Players?.length === 4 ? this.giveMeRank(Players) : 0;
      team['teamName'] = Players.teamName;
    });
    this.teamLevel.sort((a: any, b: any) =>( (b.rank - a.rank || b.totalKM-a.totalKM )));
  }

  giveMeRank = (players: any[]): number => {
    let rank = 0;
    console.log(players)
    for (const week of [1, 2, 3, 4]) {
      const start = ((week - 1) * 7) + 1;
      const end = start + 6;
      for (const km of [14, 21, 28, 35, 42, 49, 56]) {
        if (players.every(s => this.checkPoints(s, start, end, km))) {
          rank += 1;
        }
      }
    }
    return rank;
  }

  checkPoints = (kmsList: any, start: number, end: number, kms: number): boolean => {
    return kmsList.totalKMSAsOfNow.filter((s: any) => s.dayNumber >= start && s.dayNumber <= end).reduce((a: any, b: any) => a += b.value, 0) >= kms;
  }

}

