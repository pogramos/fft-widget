window.addEventListener('load', () => {
	let selectors = ['su', 'st', 'fw']
	let animationInterval = 5
	var bars = {
		su: document.querySelector('.status.su .fill'),
		st: document.querySelector('.status.st .fill'),
		fw: document.querySelector('.status.fw .fill')
	}

	var stats = {
		su: {
			current: parseQuerriedElementBySelector('.status.su .current-stat', false, true),
			goal: parseQuerriedElementBySelector('.status.su .goal-stat', true, true)
		},
		st: {
			current: parseQuerriedElementBySelector('.status.st .current-stat', false, true),
			goal: parseQuerriedElementBySelector('.status.st .goal-stat', true, true)
		},
		fw: {
			current: parseQuerriedElementBySelector('.status.fw .current-stat', false, true),
			goal: parseQuerriedElementBySelector('.status.fw .goal-stat', true, true)
		}
	}

	function parseQuerriedElementBySelector(selector, shouldReplace, shouldParse) {
		var value = document.querySelector(selector).textContent

		if (shouldReplace) {
			value = value.replace('/', '')
		}
		if (shouldParse) {
			return parseInt(value)
		}
		return value
	}

	function updateProgressForSelector(selector) {
		var bar = bars[selector]
		var value = stats[selector]
		if (valid(bar) && valid(value)) {
			console.log(bar, value)
			// check fill with percentages
			let progress = (value.current / value.goal) * 100
			let id = null
			let width = parseInt(bar.style.width) || 1
			clearInterval(id)
			// animation
			id = setInterval(() => {
				console.log('check: ', width)
				if (width >= progress) {
					clearInterval(id)
				} else {
					width++
					bar.style.width =+ width + '%'
				}
			}, animationInterval)
		}
	}

	function valid(value) {
		return value !== null && value !== undefined
	}
	// startup updated
	selectors.forEach(selector => updateProgressForSelector(selector))
})