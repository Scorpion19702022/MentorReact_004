import React, { useEffect, useState } from 'react'

const Inputs = props => {
	const [inputValue, setInputValue] = useState({
		amount: '',
		title: '',
	})

	const [select, setSelect] = useState('choose')

	const [error, setError] = useState({
		amount: '',
		title: '',
		select: '',
	})

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

	const handleAddTransaction = () => {
		const isError = handleValidationInput()
		// console.log(isError)
		if (isError) {
			return
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

	useEffect(() => {
		setError({
			amount: '',
			title: '',
			select: '',
		})
	}, [error])

	const handleValidationInput = () => {
		const numbers = /^[-+]?[0-9]+$/
		if (!inputValue.amount.match(numbers)) {
			// console.log(inputValue.amount)
			return 'zły format'
		} else if (inputValue.amount === '' || inputValue.title === '' || select === 'choose') {
			setError({
				amount: 'wypełnij pole',
				title: 'wypełnij pole',
				select: 'wybierz transakcję',
			})
			return
		}
	}

	// var numbers = /^[-+]?[0-9]+$/;

	return (
		<div className='box-input'>
			<div className='input'>
				<label htmlFor=''>Podaj kwotę:</label>
				<input type='text' placeholder='kwota' value={inputValue.amount} onChange={handleChangeValueAmount} />
				<p className='error'>{error.amount}</p>
			</div>
			<div className='input'>
				<label htmlFor=''>Informacja:</label>
				<input type='text' placeholder='tekst' value={inputValue.title} onChange={handleChangeValueTitle} />
				<p className='error'>{error.title}</p>
			</div>
			<div className='input-select'>
				<select value={select} name='' id='' onChange={handleChangeSelect}>
					<option value='choose'>WYBIERZ</option>
					<option value='influence'>WPŁATA</option>
					<option value='paycheck'>WYPŁATA</option>
				</select>
				<p className='error'>{error.select}</p>
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
