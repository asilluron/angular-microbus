class Bus {
  constructor () {
    this.consumers = {};
  }

  consume (cb, opts) {
    // TODO: Throw errror if no key is set
    let listenerNamespace = initListenerNamespace(this.consumers, opts.key);
    listenerNamespace.push(cb);
  }

  push (data, opts) {
    let listenerNamespace = initListenerNamespace(this.consumers, opts.key);
    listenerNamespace.forEach(cb => cb.call(this, data)); // TODO: Allow a configurable context
  }
}

function initListenerNamespace (consumers, key) {
  const keyParts = key.split('.');
  if (!consumers[keyParts[0]]) {
    consumers[keyParts[0]] = {listeners: [], children: {}};
  }
  if (keyParts.length === 1) {
    return consumers[key].listeners;
  } else {
    const nsIndex = key.indexOf('.');
    return initListenerNamespace(consumers[keyParts[0]].children, key.substr(nsIndex + 1));
  }
}

module.exports = Bus;
