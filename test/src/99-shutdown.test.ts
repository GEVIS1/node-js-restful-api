import { closeAgent } from './00-setup.test';
after(() => {
  // It is unsure if this does anything
  closeAgent();
});
