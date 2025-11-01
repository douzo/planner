// iOS-style color palette for household members

export const IOS_COLORS = [
  { name: 'Blue', hex: '#007AFF', light: '#E5F1FF' },
  { name: 'Green', hex: '#34C759', light: '#E8F8EC' },
  { name: 'Orange', hex: '#FF9500', light: '#FFF3E5' },
  { name: 'Red', hex: '#FF3B30', light: '#FFE9E8' },
  { name: 'Purple', hex: '#AF52DE', light: '#F5EDFC' },
  { name: 'Cyan', hex: '#5AC8FA', light: '#EDF8FC' },
  { name: 'Yellow', hex: '#FFCC00', light: '#FFF9E5' },
  { name: 'Pink', hex: '#FF2D92', light: '#FFE8F4' }
];

/**
 * Get a color by index (cycles through the palette)
 */
export const getColorByIndex = (index) => {
  return IOS_COLORS[index % IOS_COLORS.length];
};

/**
 * Get a random color from the palette
 */
export const getRandomColor = () => {
  return IOS_COLORS[Math.floor(Math.random() * IOS_COLORS.length)];
};

/**
 * Get color for a household member
 * Uses consistent index-based assignment
 */
export const getMemberColor = (memberIndex) => {
  return getColorByIndex(memberIndex);
};

/**
 * Find color by hex value
 */
export const getColorByHex = (hex) => {
  return IOS_COLORS.find(color => color.hex === hex) || IOS_COLORS[0];
};

/**
 * Get completion status color
 */
export const getCompletionColor = (percentage) => {
  if (percentage === 100) return '#34C759'; // Green
  if (percentage >= 50) return '#FF9500'; // Orange
  return '#FF3B30'; // Red
};

export default {
  IOS_COLORS,
  getColorByIndex,
  getRandomColor,
  getMemberColor,
  getColorByHex,
  getCompletionColor
};
