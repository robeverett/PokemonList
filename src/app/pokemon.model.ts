import { Stat } from './stat.model';

export interface Pokemon {
  id: string;
  name: string;
  url: string;
  stats: Stat[];
}