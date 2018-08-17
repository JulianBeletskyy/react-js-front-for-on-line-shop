class Validator {
	static formFields = {}

	static isValid = () => {
		return Object.keys(this.a.formFields).every(item => this.a.formFields[item].valid === true)
	}

	static setValue = (val, rules, name) => {
		let valid = true
		let message = ''
		rules.forEach(item => {
			switch (true) {
				case /required/.test(item):
					if (!val || !val.toString().length) {
						valid = false
						message = `é necessário`
					}
					break
				case /min-\d/.test(item):
					const [,min] = item.split('-')
					if (min*1 > val.length) {
						valid = false
						message = `está incorreto`
					}
					break
				case /\d{4}.\d{4}.\d{4}.\d{4}/.test(item):
					if (!/\d{4}.\d{4}.\d{4}.\d{4}/.test(val)) {
						valid = false
						message = `está incorreto`
					}
					break
				case /\d{2}\/\d{2}/.test(item):
					if (!/^(0[1-9]|1[012])\/\d{2}/.test(val)) {
						valid = false
						message = `está incorreto`
					}
					break
				case /\d{5}-\d{3}/.test(item):
					if (!/\d{5}-\d{3}/.test(val)) {
						valid = false
						message = `está incorreto`
					}
					break
				default: return
			}
		})

		this.a.formFields[name] = {valid, message}
		return {valid, message}
	}
}

export default Validator