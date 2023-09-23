export const levels = [
  {
    id: 'A1',
    name: 'Principiante'
  },
  {
    id: 'A2',
    name: 'Elemental'
  },
  {
    id: 'B1',
    name: 'Intermedio'
  },
  {
    id: 'B2',
    name: 'Intermedio Alto'
  },
  {
    id: 'C1',
    name: 'Avanzado'
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
    levels_groups.push({level_id: level.id, group_letter: group.letter})
  })
})
