import { closeAgent } from './00-setup.test';

after(() => {
  closeAgent();
});
