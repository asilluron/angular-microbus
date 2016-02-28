describe('App Bootstrap', () => {
  let scope, ctrl;
  describe('Basic Bootstrap', () => {
    it('publishes ngMicrobus', () => {
      let microbusModule = require('./microbus');
      expect(microbusModule.name).toBe('microbus');
    });
  });
});
