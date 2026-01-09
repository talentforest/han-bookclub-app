export const isLoadingStatus = {
  status: 'isLoading',
  data: null as null,
} as const;

export const loadedStatus = { status: 'loaded' } as const;

export const developmentMode = process.env.NODE_ENV === 'development';

export const testerUid = 'iFvsDP6KI9PjsvKSNw3qvmwTcxk2';
