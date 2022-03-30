import * as React from 'react';

import format from './FormatClass'


const CustomClass = new class {

	toSqFt(val) {
		switch (typeof val) {
			case 'object':
				return val.join('-') + ' Sq Ft';
				break;
			case 'number':
			default:
				return parseInt(val, 0) + ' Sq Ft'
		}
	}

	toFt(val) {
		switch (typeof val) {
			// case 'object':
			// 	return val.join('-') + ' Ft';
			// 	break;
			case 'number':
			default:
				return parseInt(val, 0) + ' Ft'
		}
	}

	toUsd(value) {
		return format.formatNumber(value, {
			decimal: 0,
			addon: '$',
			separator: ' ',
		})
	}

}

export default CustomClass
