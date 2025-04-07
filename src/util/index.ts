export const now = () => new Date();

export const nowExcludeTime = () => new Date(now().setHours(0, 0, 0, 0));
