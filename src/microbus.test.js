let Bus = require('./Bus');

describe('App Bootstrap', () => {
  describe('Basic Bootstrap', () => {
    it('publishes ngMicrobus', () => {
      let microbusModule = require('./microbus');
      expect(microbusModule.name).toBe('microbus');
    });
  });

  describe('Microbus Service', () => {
    let scope, microbus;

    beforeEach(() => {
      angular.mock.module('microbus');

      inject(_microbus_ => {
        microbus = _microbus_;
      });
    });

    it('publishes microbus service', () => {
      expect(microbus instanceof Bus).toBe(true);
    });
  });
});
