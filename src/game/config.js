// Core game configuration
export const GAME_CONFIG = {
  ROWS: 8,              // Number of roads to cross
  CARS_PER_ROW: 1,      // Number of cars hidden per row
  BASE_MULTIPLIER: 1.0,
  MULTIPLIER_STEP: 0.5, // Multiplier increase per row crossed
  MIN_BET: 1,
  MAX_BET: 1000,
  CURRENCY: '€',
};

// Game states
export const GAME_STATE = {
  IDLE: 'idle',         // Waiting for bet
  PLAYING: 'playing',   // Chicken is crossing
  WIN: 'win',           // Player cashed out
  DEAD: 'dead',         // Hit by a car
};
