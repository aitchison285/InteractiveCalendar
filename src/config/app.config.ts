export const FAMILY_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#FFE66D', // Yellow
  '#95E1D3', // Mint
  '#A8E6CF', // Sage
  '#C7CEEA', // Lavender
  '#FFDAC1', // Peach
  '#B4A7D6', // Purple
];

export const FONTS = {
  heading: { fontSize: 32, fontWeight: 'bold' as const },
  subheading: { fontSize: 24, fontWeight: '600' as const },
  body: { fontSize: 18, fontWeight: 'normal' as const },
  caption: { fontSize: 14, fontWeight: 'normal' as const },
};

export const APP_CONFIG = {
  maxFamilyMembers: 8,
  syncIntervalMinutes: 15,
  calendarMonthsToSync: 3,
  targetAndroidVersion: 33,
  minAndroidVersion: 28,
};
