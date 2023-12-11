import React, { useState } from 'react'

const Inputs = props => {
	const [inputValue, setInputValue] = useState({
		amount: '',
		title: '',
	})

	const [select, setSelect] = useState('choose')

	const handleChangeValueAmount = e => {
		setInputValue({
			...inputValue,
			amount: e.target.value,
		})
		// console.log(e.target.value)
	}

	const handleChangeValueTitle = e => {
		setInputValue({
			...inputValue,
			title: e.target.value,
		})
		// console.log(e.target.value)
	}

	const handleChangeSelect = e => {
		setSelect(e.target.value)
		// console.log(select)
	}

	const [textError, setTextError] = useState({
		errorAll: '',
		errorAmount: '',
		errorOption: '',
	})

	const handleAddTransaction = () => {
		const isError = handleValidationInput()
		// console.log(isError)

		console.log(textError)
		if (isError === 'wszystkie pola muszą być uzupełnione') {
			return setTextError({
				errorAll: isError,
				errorAmount: '',
				errorOption: '',
			})
		} else if (isError === 'zły format kwoty') {
			return setTextError({
				errorAll: '',
				errorAmount: isError,
				errorOption: '',
			})
		} else if (isError === 'zły format treści') {
			return setTextError({
				errorAll: '',
				errorAmount: '',
				errorOption: isError,
			})
		} else {
			setTextError({
				errorAll: '',
				errorAmount: '',
				errorOption: '',
			})
		}

		const newTransaction = {
			amount: inputValue.amount,
			title: inputValue.title,
			type: select,
		}
		// console.log(newTransaction)
		props.click(newTransaction)

		handleCleanContent()
		handleValidationInput()
	}

	const handleCleanContent = () => {
		setInputValue({
			amount: '',
			title: '',
		})
		setSelect('choose')
	}

	const handleValidationInput = () => {
		const numbers = /^[-+]?[0-9]+$/

		console.log(inputValue.amount.trim().length)

		if (inputValue.amount.trim().length === 0 || inputValue.title.trim().length === 0 || select === 'choose') {
			return 'wszystkie pola muszą być uzupełnione'
		} else if (!inputValue.amount.match(numbers)) {
			return 'zły format kwoty'
		} else if (inputValue.title.match(numbers)) {
			return 'zły format treści'
		}
	}

	// var numbers = /^[-+]?[0-9]+$/;

	return (
		<div className='wrapper'>
			<div className='box-input'>
				<div className='input'>
					<label htmlFor=''>Podaj kwotę:</label>
					<input type='text' placeholder='kwota' value={inputValue.amount} onChange={handleChangeValueAmount} />
					<p className='error'>{textError.errorAmount ? textError.errorAmount : ''}</p>
				</div>
				<div className='input'>
					<label htmlFor=''>Informacja:</label>
					<input type='text' placeholder='tekst' value={inputValue.title} onChange={handleChangeValueTitle} />
					<p className='error'>{textError.errorOption ? textError.errorOption : ''}</p>
				</div>
				<div className='input-select'>
					<select value={select} name='' id='' onChange={handleChangeSelect}>
						<option value='choose'>WYBIERZ</option>
						<option value='influence'>WPŁATA</option>
						<option value='paycheck'>WYPŁATA</option>
					</select>
				</div>
				<div className='btns'>
					<button className='btn-add' onClick={handleAddTransaction}>
						dodaj
					</button>
				</div>
			</div>
			<p className='error'>{textError.errorAll ? textError.errorAll : ''}</p>
		</div>
	)
}

export default Inputs
