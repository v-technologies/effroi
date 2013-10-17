var Pointers=(function () {

	// Neeed mouse to perform click
	var mouse = require('./mouse.js');
	var utils = require('../utils.js');

	// Pointer interactions
	function isConnected() {
		return window.navigator.msPointerEnabled ? true : false;
	}

	// Trigger pointer events
	function pointer(element,options) {
		options=options||{};
		var event = document.createEvent('MSPointerEvent');
	  utils.setEventCoords(event, element);
		event.initPointerEvent(options.type,
			'false' === options.canBubble ? false : true,
			'false' === options.cancelable ? false : true,
			options.view||window,
			options.detail||1,
			options.screenX||0, options.screenY||0,
			options.clientX||0, options.clientY||0,
			!!options.ctrlKey, !!options.altKey,
			!!options.shiftKey, !!options.metaKey,
			options.button|1, options.relatedTarget||element,
			options.offsetX||0, options.offsetY||0,
			options.width||1, options.height||1,
			options.pressure||255, options.rotation||0,
			options.tiltX||0, options.tiltY||0,
			options.pointerId||1, options.pointerType||'mouse',
			options.hwTimestamp||Date.now(), options.isPrimary||true);
		return element.dispatchEvent(event);
	}

	// Point an element and release
	function point(element,options) {
		options=options||{};
		options.type='MSPointerDown';
		dispatched=pointer(element,options);
		// IE10 trigger the click event even if the pointer event is cancelled
		// should detect IE10 here and impeach dispatched to cancel click
		// IE11+ fixed the issue.
		options.type='MSPointerUp';
		if(!(pointer(element,options)&&dispatched)) {
			return false;
		}
		return mouse._click(element);
	}

	return {
		isConnected : isConnected,
		pointer : pointer,
		point : point
	};

})();

module.exports = Pointers;
