import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import SelectTransaction from './SelectTransaction'

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
			id: uuidv4(),
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

		// console.log(inputValue.amount.trim().length)

		if (
			(inputValue.amount.trim().length === 0 || inputValue.title.trim().length === 0 || select === 'choose') &&
			props.translationLength < 18
		) {
			return 'wszystkie pola muszą być uzupełnione'
		} else if (!inputValue.amount.match(numbers) && props.translationLength < 18) {
			return 'zły format kwoty'
		} else if (inputValue.title.match(numbers) && props.translationLength < 18) {
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
					<p className={!textError.errorAll ? 'one-error' : null}>
						{textError.errorAmount ? textError.errorAmount : ''}
					</p>
				</div>
				<div className='input'>
					<label htmlFor=''>Informacja:</label>
					<input type='text' placeholder='tekst' value={inputValue.title} onChange={handleChangeValueTitle} />
					<p className={!textError.errorAll ? 'two-error' : null}>
						{textError.errorOption ? textError.errorOption : ''}
					</p>
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
			<div className='box-error'>
				<p className={textError.errorAll ? 'all-error' : null}>{textError.errorAll ? textError.errorAll : ''}</p>
				<p className='all-error'>{props.translationLength >= 18 ? 'więcej transakcji nie możesz dodać' : null}</p>
			</div>
			<SelectTransaction changeTypeTransaction={props.changeTypeTransaction} />
		</div>
	)
}

export default Inputs
