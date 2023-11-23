import React, { useState } from 'react'
import './App.css'

import Inputs from './Components/Inputs'
import Transactions from './Components/Transactions'

const App = () => {
	const [transaction, setTransaction] = useState([])

	const handleNewAddTransaction = newTransaction => {
		setTransaction([...transaction, newTransaction])
	}

	console.log(transaction)

	return (
		<div className='App'>
			<Inputs click={handleNewAddTransaction} />
			<Transactions transaction={transaction} />
		</div>
	)
}

export default App
