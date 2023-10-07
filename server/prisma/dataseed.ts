export const levels = [
  {
    code: 'A1',
    name: 'beginner'
  },
  {
    code: 'A2',
    name: 'elementary'
  },
  {
    code: 'B1',
    name: 'intermediate'
  },
  {
    code: 'B2',
    name: 'upper_intermediate'
  },
  {
    code: 'C1',
    name: 'advanced'
  }
];

export const groups = [
  {
    letter: 'A',
    topic: 'Writting'
  },
  {
    letter: 'B',
    topic: 'Reading'
  },
  {
    letter: 'C',
    topic: 'Listening'
  },
  {
    letter: 'D',
    topic: 'Speaking'
  }
];

export const levels_groups: {level_id: string, group_letter: string}[] = []

levels.forEach(level => {
  groups.forEach(group => {
    levels_groups.push({level_id: level.code, group_letter: group.letter})
  })
})
