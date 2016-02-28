var Bus = require('./Bus');

describe('Bus Class', () => {
  describe('constructor props', () => {
    it('publishes consumers via a mapping object', () => {
      let bus = new Bus();
      expect(typeof bus.consumers).toBe('object');
    });
  });

  describe('listener management', () => {
    let bus;

    beforeEach(() => {
      bus = new Bus();
    });

    it('ensures a non-nested namespace has the correct namespace object structure', () => {
      var cb = () => {};
      bus.consume(cb, {key: 'test'});

      expect(Array.isArray(bus.consumers['test'].listeners)).toBe(true);
      expect(typeof bus.consumers['test'].children).toBe('object');
    });

    it('ensures singly nested namespace has correct structure', () => {
      var cb = () => {};
      bus.consume(cb, {key: 'test.nested'});
      let nestedNamespace = bus.consumers['test'].children;

      expect(Array.isArray(nestedNamespace['nested'].listeners)).toBe(true);
      expect(typeof nestedNamespace['nested'].children).toBe('object');
    });
  });

  describe('consumption', () => {
    let bus;

    beforeEach(() => {
      bus = new Bus();
    });

    it('adds a registered consumer nested with a single namespace', () => {
      var cb = () => {};
      bus.consume(cb, {key: 'test'});

      expect(bus.consumers['test'].listeners[0]).toBe(cb);
    });

    it('adds a registered consumer to a twice nested namespace', () => {
      var cb = () => {};
      bus.consume(cb, {key: 'test.level2'});
      let level2 = bus.consumers['test'].children['level2'];

      expect(level2.listeners[0]).toBe(cb);
    });

    it('adds a registered consumer to a triple nested namespace', () => {
      var cb = () => {};
      bus.consume(cb, {key: 'apple.orange.banana'});
      let level2 = bus.consumers['apple'].children['orange'];
      let level3 = level2.children['banana'];

      expect(level3.listeners[0]).toBe(cb);
    });
  });

  describe('pushing', () => {
    let bus;

    beforeEach(() => {
      bus = new Bus();
    });

    it('allows pushing to a non-nested consumer namespace', () => {
      let spyObj = {cb: () => {}};
      spyOn(spyObj, 'cb');
      bus.consume(spyObj.cb, {key: 'colors'});
      bus.push('wow', {key: 'colors'});

      expect(spyObj.cb).toHaveBeenCalled();
    });

    it('passes data transparently', () => {
      let spyObj = {cb: () => {}};
      spyOn(spyObj, 'cb');
      bus.consume(spyObj.cb, {key: 'colors'});
      bus.push('test', {key: 'colors'});

      expect(spyObj.cb).toHaveBeenCalledWith('test');
    });

    it('pushing to a non-existent namespace does nothing', () => {
      let spyObj = {cb: () => {}};
      spyOn(spyObj, 'cb');
      bus.consume(spyObj.cb, {key: 'colors'});
      bus.push({does: 'nothing'}, {key: 'makes'});

      expect(spyObj.cb).not.toHaveBeenCalled();
    });
  });
});
