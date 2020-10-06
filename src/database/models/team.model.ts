import connection from '../index';

export const model = connection.get('team');

export interface schema {
  id: number;
  name: string;
  members: {
    id: number;
    name: string;
    position: string;
    shirtNumber: number;
  }[];
}
