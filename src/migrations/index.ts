import * as migration_20260921_050727_initial from './20260921_050727_initial';

export const migrations = [
  {
    up: migration_20260921_050727_initial.up,
    down: migration_20260921_050727_initial.down,
    name: '20260921_050727_initial'
  },
];
