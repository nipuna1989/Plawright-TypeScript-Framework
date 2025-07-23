// Test configuration constants
export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 30000,
} as const;

export const TEST_DATA = {
  WAIT_STATES: {
    VISIBLE: 'visible',
    HIDDEN: 'hidden',
    ATTACHED: 'attached',
    DETACHED: 'detached',
  }
} as const;
