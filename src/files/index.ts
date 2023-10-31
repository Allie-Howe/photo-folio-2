import { birds } from './birds';

export interface FileResolutions {
  low: string;
  high: string;
}

export const selections = {
  birds,
  birds1: birds,
  birds2: birds,
} as const
