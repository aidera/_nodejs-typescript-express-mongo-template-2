import path from 'path';

export default {
  rootDir: path.dirname(require.main.filename),
  public: path.join(path.dirname(require.main.filename), 'public'),
  storage: path.join(path.dirname(require.main.filename), 'storage'),
};
