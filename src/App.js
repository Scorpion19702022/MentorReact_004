import React, { useState } from 'react'
import './App.css'

import Inputs from './Components/Inputs'
import Transactions from './Components/Transactions'

const App = () => {
	const [transaction, setTransaction] = useState([])

	console.log(transaction.length)

	const handleNewAddTransaction = newTransaction => {
		setTransaction([...transaction, newTransaction])
		if (transaction.length >= 18) {
			setTransaction([...transaction])
		}
	}

	return (
		<div className='App'>
			<Inputs click={handleNewAddTransaction} translationLength={transaction.length} />
			<Transactions transaction={transaction} />
		</div>
	)
}

export default App
