import * as React from 'react';

const FormatClass = new class {

	makeUuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	nl2br(text) {
		if (!text) return '';
		return text.replace(/(?:\r\n|\r|\n)/g, '<br>');;
	}

	// nl2p(text) { // bad function
	// 	if(!text || typeof text !== 'string') {
	// 		return text;
	// 	}
	//
	// 	function filterEmpty(arr) {
	// 		var new_arr = [];
	//
	// 		for(var i = arr.length - 1; i >= 0; i--) {
	// 			if(arr[i] != "")
	// 				new_arr.push(arr.pop());
	// 			else
	// 				arr.pop();
	// 		}
	//
	// 		return new_arr.reverse();
	// 	};
	//
	// 	text = filterEmpty(text.split('\n')).join('</p><p>');
	// 	return '<p>' + text + '</p>';
	// }

	formatNumber(value, {
		decimal = 2,
		addon = '',
		separator = ',',
	} = {}) {
		// return value.toString();
		if (typeof value === 'undefined' || value.toString().length == 0) return '...';
		if (!value && value != 0) return '...';
		try {
			const str = parseFloat(value.toString()).toFixed(decimal).split('.')

			const prefix = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
			const res = decimal > 0 ? `${prefix}.${str[1]}` : prefix
			return addon ? `${addon} ${res}` : res
		} catch (err) {
			return 'Error'
		}
	}

	formatMoney(value, addon) {
		return this.formatNumber(value, {
			decimal: 0,
			addon: addon,
			separator: ' ',
		})
	}

	formatNumberShortener(value) {
		if (value >= 1000000) {
			const v = value / 1000000
			const round = v.toFixed(Number.isInteger(v) ? 0 : 1)
			return `${round} M`;
		} else if (value >= 1000) {
			return `${(value / 1000).toFixed(0)} K`;
		}
		return value;
	}

	formatSeconds({
		seconds,
		variant = false
	} = {}) {
		const sec_num = parseInt(seconds, 10); // don't forget the second param

		let _hours = Math.floor(sec_num / 3600);
		let _minutes = Math.floor((sec_num - (_hours * 3600)) / 60);
		let _seconds = sec_num - (_hours * 3600) - (_minutes * 60);

		if (_hours < 10) {
			_hours = "0" + _hours;
		}
		if (_minutes < 10) {
			_minutes = "0" + _minutes;
		}
		if (_seconds < 10) {
			_seconds = "0" + _seconds;
		}

		// Response...

		if (variant == 'small') {
			_hours = Math.round(_hours)
			_minutes = Math.round(_minutes)
			_seconds = Math.round(_seconds)

			if (seconds > 3600) {
				return `${_hours} h. ${_minutes} m.`;
			}

			return `${_minutes} min.`;
		}

		if (variant == 'seconds') {
			_hours = Math.round(_hours)
			_minutes = Math.round(_minutes)
			_seconds = Math.round(_seconds)
			if (_minutes) {
				return `${_minutes} m ${_seconds} s.`
			}

			return `${_seconds} s.`

		}

		return `${_hours}:${_minutes}:${_seconds}`
	}

	formatMegabytes(megabytes, decimals = 2) {
		return this.formatBytes(megabytes * 1024 * 1024, decimals);
	}

	formatBytes(bytes, decimals = 2) {
		if (bytes === 0) return '0 Bytes';

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	plainTextToLinks(inputText) {
		if (!inputText) return '';

		var replacedText, replacePattern1, replacePattern2, replacePattern3;

		//URLs starting with http://, https://, or ftp://
		replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
		replacedText = inputText.replace(replacePattern1, '<a data-link rel="nofollow" href="$1" target="_blank">$1</a>');

		//URLs starting with "www." (without // before it, or it'd re-link the ones done above).
		replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
		replacedText = replacedText.replace(replacePattern2, '$1<a data-link rel="nofollow" href="http://$2" target="_blank">$2</a>');

		//Change email addresses to mailto:: links.
		replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
		replacedText = replacedText.replace(replacePattern3, '<a data-link rel="nofollow" href="mailto:$1">$1</a>');

		return replacedText;
	}

	plainTextShortener(text, maxLength) {
		if (typeof text !== 'string') return '';
		if (text.length > maxLength) {
			text = text.substr(0, maxLength) + '...'
		}
		return text;
	}


	/**
	 * Get a random floating point number between `min` and `max`.
	 *
	 * @param {number} min - min number
	 * @param {number} max - max number
	 * @return {number} a random floating point number
	 */
	getRandomFloat(min, max) {
		return Math.random() * (max - min) + min;
	}

	/**
	 * Get a random integer between `min` and `max`.
	 *
	 * @param {number} min - min number
	 * @param {number} max - max number
	 * @return {number} a random integer
	 */
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	/**
	 * Get a random boolean value.
	 *
	 * @return {boolean} a random true/false
	 */
	getRandomBool() {
		return Math.random() >= 0.5;
	}
}

export default FormatClass
