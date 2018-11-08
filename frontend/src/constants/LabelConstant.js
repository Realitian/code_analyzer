export const project = {
  0: 'New Project',
  1: 'Existing project',
  2: 'Neither',
}

export const remote = {
  0: 'Yes',
  1: 'No',
}

export const how_soon = {
  0: 'Immediately',
  1: 'Less 2 Weeks',
  2: 'Less 4 Weeks',
  3: 'More 4 Weeks',
}

export const skill_level = {
  0: 'Don\'t Know',
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Expert',
}

export const team_members = {
  0: '0',
  1: '1-3',
  2: '4-10',
  3: '11-30',
  4: '31-100',
  5: '101-300',
  6: '301-1000',
  7: '1001-',
}

export const company_stage = {
  0: 'Self-funded',
  1: 'Pre-seed funding',
  2: 'Seed funded',
  3: 'Series A',
  4: 'Series B',
  5: 'Series C or later stage private company',
  6: 'Large Enterprise'
}

const developer_type = {
  0: 'Full-Stack Developer',
  1: 'Back-End Developer',
  2: 'Front-End Developer',
  3: 'Software Engineer',
  4: 'DevOps / Systems Engineer',
  5: 'Data Engineer',
  6: 'iOS Developer',
  7: 'Site Reliability Engineer',
  8: 'Android Developer',
  9: 'Automation QA ( SDET)',
  10: 'Platform Engineer',
  11: 'NLP Engineer',
  12: 'ML and AI Engineering'
}

export function numberToStr(num) {
  if (num === null) {
    return ''
  }

  let num_array = num.split(',')
  let result = ''
  for (let value of num_array) {
    if (value !== '') {
      result += developer_type[value] + ', '
    }
  }

  return result.substring(0, result.length - 2)
}