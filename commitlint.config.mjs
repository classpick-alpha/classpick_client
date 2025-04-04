const type = ['feat', 'fix', 'hotfix', 'docs', 'refactor', 'test', 'chore'];

export default {
  rules: {
    'type-enum': [2, 'always', type],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(?:\[(.+)])?\s*([\w-]+)(?:\(([\w-]+)\))?:\s*(.+)$/,
      headerCorrespondence: ['ticket', 'type', 'scope', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        'header-case': (parsed, _when, _value) => {
          if (parsed.ticket) {
            return parsed.header.match(/^\[.+]\s+[\w-]+/)
              ? [true]
              : [false, '[티켓번호] type: subject 형식을 지켜주세요.'];
          }
          return [true];
        },
      },
    },
  ],
};
