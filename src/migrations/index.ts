import * as migration_20260921_050727_initial from './20260921_050727_initial';
import * as migration_20261002_020000_phase1_content_updates from './20261002_020000_phase1_content_updates';
import * as migration_20261008_064618_add_terminal_facilities_connectivity_expansion from './20261008_064618_add_terminal_facilities_connectivity_expansion';

export const migrations = [
  {
    up: migration_20260921_050727_initial.up,
    down: migration_20260921_050727_initial.down,
    name: '20260921_050727_initial',
  },
  {
    up: migration_20261002_020000_phase1_content_updates.up,
    down: migration_20261002_020000_phase1_content_updates.down,
    name: '20261002_020000_phase1_content_updates',
  },
  {
    up: migration_20261008_064618_add_terminal_facilities_connectivity_expansion.up,
    down: migration_20261008_064618_add_terminal_facilities_connectivity_expansion.down,
    name: '20261008_064618_add_terminal_facilities_connectivity_expansion'
  },
];
