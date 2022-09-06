import EvenEmitter from 'events';

const _emitter = new EvenEmitter()
_emitter.setMaxListeners(0)  //unlimited listener

export const emitter =_emitter