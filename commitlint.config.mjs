const type = ['feat', 'fix', 'hotfix', 'docs', 'refactor', 'test', 'chore'];

export default {
  rules: {
    'type-enum': [2, 'always', type],
    'type-empty': [2, 'never'],
    'header-case': [2, 'always', 'start-with-ticket-and-type'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[(.+)]\s*([\w-]+)(\([\w-]+\))?:\s*(.+)$/,
      headerCorrespondence: ['ticket', 'type', 'scope', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        'start-with-ticket-and-type': (parsed) =>
          parsed.header.match(/^\[.+]/)
            ? [true]
            : [false, '커밋 메시지는 반드시 [티켓번호] 형식으로 시작해야 합니다.'],
      },
    },
  ],
};
