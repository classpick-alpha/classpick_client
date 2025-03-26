const type = ['feat', 'fix', 'hotfix', ' docs', ' refactor', 'test', 'chore'];

export default {
  rules: {
    'type-enum': [2, 'always', type],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
  },
};
