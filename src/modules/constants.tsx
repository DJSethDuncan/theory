export const guitarStrings = ["E", "B", "G", "D", "A", "E"];

export const intervals = {
  allIntervals: [
    "b2",
    "2",
    "#2",
    "b3",
    "3",
    "#3",
    "4",
    "b5",
    "5",
    "#5",
    "6",
    "m7",
    "M7",
  ],
  intervalsByHalfSteps: {
    "1": ["b2"],
    "2": ["2"],
    "3": ["#2", "b3"],
    "4": ["3"],
    "5": ["#3", "4"],
    "6": ["b5"],
    "7": ["5"],
    "8": ["#5", "b6"],
    "9": ["6"],
    "10": ["#6", "m7"],
    "11": ["M7"],
  },
};

export const modesEasy = {
  Ionian: {
    intervals: ["2", "3", "4", "5", "6", "M7"],
  },
  Dorian: {
    intervals: ["2", "b3", "4", "5", "6", "m7"],
  },
  Phrygian: {
    intervals: ["b2", "b3", "4", "5", "b6", "m7"],
  },
  Lydian: {
    intervals: ["2", "3", "#4", "5", "6", "M7"],
  },
  Mixolydian: {
    intervals: ["2", "3", "4", "5", "6", "m7"],
  },
  Aeolian: {
    intervals: ["2", "b3", "4", "5", "b6", "m7"],
  },
  Locrian: {
    intervals: ["b2", "b3", "4", "b5", "b6", "m7"],
  },
};

export const modesHard = {
  ...modesEasy,
  "Harmonic Minor": {
    intervals: ["2", "b3", "4", "5", "b6", "M7"],
  },
  "Melodic Minor": {
    intervals: ["2", "b3", "4", "5", "6", "M7"],
  },
  "Dorian b2": {
    intervals: ["b2", "b3", "4", "5", "6", "m7"],
  },
  "Lydian Augmented": {
    intervals: ["2", "3", "#4", "#5", "6", "M7"],
  },
  "Lydian Dominant": {
    intervals: ["2", "3", "#4", "5", "6", "m7"],
  },
  "Mixolydian b6": {
    intervals: ["2", "3", "4", "5", "b6", "m7"],
  },
  "Locrian #2": {
    intervals: ["2", "b3", "4", "b5", "b6", "m7"],
  },
  "Super Locrian": {
    intervals: ["b2", "b3", "b4", "b5", "b6", "m7"],
  },
};
