export class GetAllResponse<T> {
  total: number;
  data: T[];

  constructor(total: number, data: T[]) {
    this.total = total;
    this.data = data;
  }
}

export class Competition {
  id: number;
  areaName: string;
  name: string;
  plan: string;
  currentSeason: Season;
  teams: {
    total: number;
    totalObtained: number;
    data: Team;
  };
  // eslint-disable-next-line
  constructor(input: any) {
    this.id = input.id;
    this.areaName = input.area.name;
    this.name = input.name;
    this.plan = input.plan;
    this.currentSeason = new Season(input.currentSeason);
    this.teams = input.teams;
  }
}

export class Season {
  startDate: string;
  endDate: string;
  // eslint-disable-next-line
  constructor(input: any) {
    this.startDate = input.startDate;
    this.endDate = input.endDate;
  }
}

export class Team {
  id: number;
  name: string;
  members: Player[];
  // eslint-disable-next-line
  constructor(input: any) {
    this.id = input.id;
    this.name = input.name;
    this.members = input.members;
  }
}

export class Player {
  id: number;
  name: string;
  position: string;
  shirtNumber: number;
  // eslint-disable-next-line
  constructor(input: any) {
    this.id = input.id;
    this.name = input.name;
    this.position = input.position;
    this.shirtNumber = input.shirtNumber;
  }
}
