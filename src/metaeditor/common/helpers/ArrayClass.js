import * as React from 'react';

// libs
import _ from 'lodash'

const ArrayClass = new class {

	split(arr, size = 2) {
		return _.chunk(arr, Math.round(arr.length / size))
	}

	uniqPlainArray(arr) {
		// return _.uniq(arr);
		arr = arr.filter(i => i)
		const list = new Map(arr.map(s => [s.toLowerCase(), s]));
		const res = [...list.values()]
		// console.warn('res',res);
		return res;
		// return [];
	}

}

export default ArrayClass
