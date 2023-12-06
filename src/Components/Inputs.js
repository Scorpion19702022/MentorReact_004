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
		error: '',
	})

	const handleAddTransaction = () => {
		const isError = handleValidationInput()
		// console.log(isError)

		console.log(textError)
		if (isError) {
			return setTextError({
				error: isError,
			})
		} else {
			setTextError({
				error: '',
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
		if (!inputValue.amount.match(numbers) || inputValue.amount === '') {
			return 'błąd'
		} else if (inputValue.amount === '' || inputValue.title === '' || select === 'choose') {
			return 'błąd'
		}
	}

	// var numbers = /^[-+]?[0-9]+$/;

	return (
		<div className='box-input'>
			<div className='input'>
				<label htmlFor=''>Podaj kwotę:</label>
				<input type='text' placeholder='kwota' value={inputValue.amount} onChange={handleChangeValueAmount} />
				<p>{textError.error === 'błąd' ? textError.error : ''}</p>
			</div>
			<div className='input'>
				<label htmlFor=''>Informacja:</label>
				<input type='text' placeholder='tekst' value={inputValue.title} onChange={handleChangeValueTitle} />
				<p>{textError.error === 'błąd' ? textError.error : ''}</p>
			</div>
			<div className='input-select'>
				<select value={select} name='' id='' onChange={handleChangeSelect}>
					<option value='choose'>WYBIERZ</option>
					<option value='influence'>WPŁATA</option>
					<option value='paycheck'>WYPŁATA</option>
				</select>
				<p>{textError.error === 'błąd' ? textError.error : ''}</p>
			</div>
			<div className='btns'>
				<button className='btn-add' onClick={handleAddTransaction}>
					dodaj
				</button>
			</div>
		</div>
	)
}

export default Inputs
