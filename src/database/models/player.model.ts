import connection from '../index';

export const model = connection.get('player');

export interface schema {
  id: number;
  name: string;
  position: string;
  shirtNumber: number;
}
