import * as migration_20260921_050727_initial from './20260921_050727_initial';
import * as migration_20261002_020000_phase1_content_updates from './20261002_020000_phase1_content_updates';

export const migrations = [
  {
    up: migration_20260921_050727_initial.up,
    down: migration_20260921_050727_initial.down,
    name: '20260921_050727_initial'
  },
  {
    up: migration_20261002_020000_phase1_content_updates.up,
    down: migration_20261002_020000_phase1_content_updates.down,
    name: '20261002_020000_phase1_content_updates'
  },
];
