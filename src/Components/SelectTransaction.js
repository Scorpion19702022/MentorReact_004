import React, { useState } from 'react'

const SelectTransaction = ({ changeTypeTransaction }) => {
	const [selectTransation, setSelectTransation] = useState('all')

	const handleSelectTransaction = e => {
		setSelectTransation(e.target.value)
		changeTypeTransaction(selectTransation)
	}

	return (
		<div className='box-select'>
			<select value={selectTransation} onChange={handleSelectTransaction}>
				<option value='all'>wszystkie</option>
				<option value='in'>wpłaty</option>
				<option value='out'>wypłaty</option>
			</select>
		</div>
	)
}

export default SelectTransaction
