(function() {

function _inherit(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}

/**
 * @param {string} subtype event subtype name.
 * @param {number} deltaTime delta time.
 * @param {number} time time.
 * @constructor
 */
Midi.Event = function(subtype, deltaTime, time) {
  /** @type {string} */
  this.subtype = subtype;
  /** @type {number} */
  this.deltaTime = deltaTime;
  /** @type {number} */
  this.time = time;
};

/**
 * @param {string} subtype
 * @param {number} deltaTime delta time.
 * @param {number} time time.
 * @param {number} channel
 * @param {number=} opt_parameter1
 * @param {number=} opt_parameter2
 * @constructor
 * @extends {Midi.Event}
 */
Midi.ChannelEvent =
function(subtype, deltaTime, time, channel, opt_parameter1, opt_parameter2) {
  Midi.Event.call(this, subtype, deltaTime, time);

  /** @type {number} */
  this.channel = channel;
  /** @type {(number|undefined)} */
  this.parameter1 = opt_parameter1;
  /** @type {(number|undefined)} */
  this.parameter2 = opt_parameter2;
};
_inherit(Midi.ChannelEvent, Midi.Event);

/**
 * @param {string} subtype
 * @param {number} deltaTime delta time.
 * @param {number} time time.
 * @param {ByteArray} data
 * @constructor
 * @extends {Midi.Event}
 */
Midi.SystemExclusiveEvent = function(subtype, deltaTime, time, data) {
  Midi.Event.call(this, subtype, deltaTime, time);

  /** @type {ByteArray} */
  this.data = data;
};
_inherit(Midi.SystemExclusiveEvent, Midi.Event);

/**
 * @param {string} subtype
 * @param {number} deltaTime delta time.
 * @param {number} time time.
 * @param {Array.<*>} data meta data.
 * @constructor
 * @extends {Midi.Event}
 */
Midi.MetaEvent = function(subtype, deltaTime, time, data) {
  Midi.Event(this, subtype, deltaTime, time);

  /** @type {Array.<*>} */
  this.data = data;
};
_inherit(Midi.MetaEvent, Midi.Event);

}());
