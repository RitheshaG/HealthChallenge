import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, of, flatMap, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalkathonService {

  private url: string = "assets/json/walkathon.json";
  teamName: any;

  constructor(private httpClient: HttpClient) {
  }

  getInfo() {
    return this.httpClient.get(this.url)
  }

  getTopPlayer() {
    return this.httpClient.get(this.url).pipe(
      flatMap((s: any) => s),
      mergeMap((player: any) => {
        // return this.httpClient.get(``)
        return this.httpClient.get(`assets/json/${player.id}-7.json`)
          .pipe(map((individual: any) => {
            if (player.name.toUpperCase().includes('WHITENIGHT') || player.name.toUpperCase().includes('WALTER REISFELD') || player.name.toUpperCase().includes('VALERY ORLOV')) {
              return {};
            }
            player['currentDayCount'] = +(individual?.days?.find((s: any) => s.dayNumber === individual.currentDay)?.value?.toFixed(1) ?? 0);
            player['totalKMSAsOfNow'] = individual?.days?.filter((s: any) => s.dayNumber <= individual.currentDay);
            player['asOfDateCount'] = +(player['totalKMSAsOfNow']?.reduce((a: any, b: any) => a += (b?.value ?? 0), 0)?.toFixed(1) ?? 0);
            player['teamName'] = this.getTeamName(player.id);
            this.weekLevelCount(player);
            return player;
          }))
      }), toArray());
  }

  weekLevelCount(player: any) {
    for (const week of [1, 2, 3, 4]) {
      const start = ((week - 1) * 7) + 1;
      const end = start + 6;
      player[`w${week}`] = +(player.totalKMSAsOfNow.filter((s: any) => s.dayNumber >= start && s.dayNumber <= end).reduce((a: any, b: any) => a += b.value, 0)).toFixed(1);
    }
  }

  getTeamName = (data: any): string => {
    return this.getTeams().find((team: any) => {
      const playerIds = [team.Player1id, team.Player2id, team.Player3id, team.Player4id];
      return playerIds.includes(data);
    })?.TeamName ?? '';
  }

  getTeams = () => {
    return [
      {
        "TeamName": "Kantara",
        "Player1": "Dhiran Shinde",
        "Player1id": 155914,
        "Player2": "Chetan R Kuderakar",
        "Player2id": 155951,
        "Player3": "Upasana Nonia",
        "Player3id": 155659,
        "Player4": "Nikhil K S",
        "Player4id": 155803
      },
      {
        "TeamName": "Spark Plugs",
        "Player1": "Sandeep Marru",
        "Player1id": 79530,
        "Player2": "Kuriakose, John",
        "Player2id": 155970,
        "Player3": "Madhaiyan, Manisaran",
        "Player3id": 155976,
        "Player4": "Patil, Vishwajeet",
        "Player4id": 156076
      },
      {
        "TeamName": "Off To Mars",
        "Player1": "Astha Pal",
        "Player1id": 155917,
        "Player2": "Sravya Ramana kudupudi",
        "Player2id": 155307,
        "Player3": "Simpy Roy",
        "Player3id": 155504,
        "Player4": "Srinath Reddy",
        "Player4id": 155594

      },
      {
        "TeamName": "4 Steppers",
        "Player1": "Guntaka Gowtham Reddy",
        "Player1id": 155306,
        "Player2": "RITHESHA G",
        "Player2id": 155829,
        "Player3": "Milind Y K",
        "Player3id": 155893,
        "Player4": "AMRUTA BOKARE",
        "Player4id": 155904
      },
      {
        "TeamName": "Walking Talkies",
        "Player1": "Navya Likhitha",
        "Player1id": 155908,
        "Player2": "SUCHARITHA PILLALA",
        "Player2id": 155909,
        "Player3": "karthik kankuntla",
        "Player3id": 155897,
        "Player4": "Rai rohit",
        "Player4id": 155911
      },
      {
        "TeamName": "Fast and Furious",
        "Player1": "Raju Maharaju",
        "Player1id": 155903,
        "Player2": "Abdulla Shaik",
        "Player2id": 155962,
        "Player3": "Mudaliyar Anand Krishnan",
        "Player3id": 155968,
        "Player4": "P Enoch Israel",
        "Player4id": 155959
      },
      {
        "TeamName": "Pushpa-TheFire",
        "Player1": "Anjan Chinni",
        "Player1id": 79533,
        "Player2": "sheel Chandra",
        "Player2id": 155841,
        "Player3": "Muniappan",
        "Player3id": 155567,
        "Player4": "sharan S G",
        "Player4id": 155898
      },
      {
        "TeamName": "Thunder",
        "Player1": "Kevalsing Rajput",
        "Player1id": 155842,
        "Player2": "Jyothi Adusumilli",
        "Player2id": 155858,
        "Player3": "Yadugani Sridivya",
        "Player3id": 155889,
        "Player4": "venkatesh sriramdas",
        "Player4id": 155913
      },
      {
        "TeamName": "Gryffindors",
        "Player1": "BALAKRISHNAN B R",
        "Player1id": 155509,
        "Player2": "Harikrishna Kotaru",
        "Player2id": 155867,
        "Player3": "Parikshit B",
        "Player3id": 155861,
        "Player4": "Suman Kumar Behera",
        "Player4id": 0
      },
      {
        "TeamName": "Unstoppables",
        "Player1": "Hariom Panchal",
        "Player1id": 155906,
        "Player2": "Honey Tiwari",
        "Player2id": 15591,
        "Player3": "Anjum Makandar",
        "Player3id": 155851,
        "Player4": "Nagendra Pawar",
        "Player4id": 155942
      },
      {
        "TeamName": "Go Paadham",
        "Player1": "Manchikatla Shiva Kumar",
        "Player1id": 155864,
        "Player2": "Solipuram Raghava Reddy",
        "Player2id": 155831,
        "Player3": "Farzana Alam",
        "Player3id": 155827,
        "Player4": "Sivasankar V",
        "Player4id": 155550
      },
      {
        "TeamName": "Joywalkers",
        "Player1": "Shaik Nazma",
        "Player1id": 155907,
        "Player2": "Padmini",
        "Player2id": 155910,
        "Player3": "sahithi K",
        "Player3id": 155920,
        "Player4": "suresh Thandalay",
        "Player4id": 155895
      },
      {
        "TeamName": "The Fantastic Four",
        "Player1": "Santosh kumar",
        "Player1id": 155562,
        "Player2": "sri prahasith",
        "Player2id": 0,
        "Player3": "sudheer kumar",
        "Player3id": 0,
        "Player4": "Resmy sreejith",
        "Player4id": 155931
      },
      {
        "TeamName": "Dandi March",
        "Player1": "ISMRITI GUPTA",
        "Player1id": 155892,
        "Player2": "Naina Singh",
        "Player2id": 155925,
        "Player3": "Kalpana Sharma",
        "Player3id": 155930,
        "Player4": "Soujanya Gummadi",
        "Player4id": 155564
      },
      {
        "TeamName": "Trotter Clan",
        "Player1": "Anisha Swain",
        "Player1id": 155847,
        "Player2": "Shimona",
        "Player2id": 155973,
        "Player3": "Priyansha Subhadarshini",
        "Player3id": 0,
        "Player4": "Shikha Rajoriya",
        "Player4id": 155974
      }
    ]
  }
}
