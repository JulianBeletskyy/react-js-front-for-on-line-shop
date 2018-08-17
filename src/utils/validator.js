class Validator {
	static formFields = {
		address: {},
		card: {}
	}

	static isValid = formName => {
		if (Object.keys(this.a.formFields[formName]).length) {
			return Object.keys(this.a.formFields[formName]).every(item => this.a.formFields[formName][item].valid === true)
		}
		return false
	}

	static clear = formName => {
		this.a.formFields[formName] = {}
	}

	static setValue = (val, rules, name, formName) => {
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
					if (val && min*1 > val.length) {
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
		this.a.formFields[formName][name] = {valid, message}
		return {valid, message}
	}
}

export default Validator