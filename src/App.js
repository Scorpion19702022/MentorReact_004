import React, { useEffect, useState } from 'react'
import './App.css'

import Inputs from './Components/Inputs'
import Transactions from './Components/Transactions'

const App = () => {
	const [transaction, setTransaction] = useState([])

	const [count, setCount] = useState({
		earnings: 0,
		influence: 0,
		savings: 0,
	})

	const [typeTransaction, setTypeTransaction] = useState('all')

	// useEffect(() => {
	// 	const newArrayTransaction = [...transaction]
	// 	const selectTransactionInfluence = newArrayTransaction.filter(item => item.type === 'influence')
	// 	const selectTransactionPaycheck = newArrayTransaction.filter(item => item.type === 'paycheck')
	// 	if (typeTransaction === 'in') {
	// 		return setTransaction(selectTransactionInfluence)
	// 	} else if (typeTransaction === 'out') {
	// 		return setTransaction(selectTransactionPaycheck)
	// 	} else {
	// 		return setTransaction(newArrayTransaction)
	// 	}
	// }, [transaction, typeTransaction])

	const handleChangeTypeTransaction = type => {
		setTypeTransaction(type)
		const newArrayTransaction = [...transaction]
		const selectTransactionInfluence = newArrayTransaction.filter(item => item.type === 'influence')
		const selectTransactionPaycheck = newArrayTransaction.filter(item => item.type === 'paycheck')
		if (typeTransaction === 'in') {
			setTransaction(selectTransactionInfluence)
		} else if (typeTransaction === 'out') {
			setTransaction(selectTransactionPaycheck)
		} else {
			setTransaction(newArrayTransaction)
		}
	}

	const handleNewAddTransaction = newTransaction => {
		setTransaction([...transaction, newTransaction])
		if (transaction.length >= 18) {
			setTransaction([...transaction])
		}

		if (newTransaction.type === 'influence') {
			setCount(prevState => {
				return { ...prevState, earnings: prevState.earnings + Number(newTransaction.amount) }
			})
		} else if (newTransaction.type === 'paycheck') {
			setCount(prevState => {
				return { ...prevState, influence: prevState.influence + Number(newTransaction.amount) }
			})
		}
	}

	useEffect(() => {
		setCount(prevState => {
			return { ...prevState, savings: prevState.earnings - prevState.influence }
		})
	}, [count.earnings, count.influence])

	const handleDeleteTransation = trans => {
		const newTransaction = transaction.filter(item => item.id !== trans.id)

		setTransaction(newTransaction)

		if (trans.type === 'influence') {
			setCount(prevState => {
				return { ...prevState, earnings: prevState.earnings - Number(trans.amount) }
			})
		} else if (trans.type === 'paycheck') {
			setCount(prevState => {
				return { ...prevState, influence: prevState.influence - Number(trans.amount) }
			})
		}
		console.log(count)
		console.log(trans)
	}

	return (
		<div className='App'>
			<div className='box-info'>
				<h1 className='heading-info'>stan konta: {count.savings}</h1>
				<h1 className='heading-info'>wpłaty: {count.earnings} </h1>
				<h1 className='heading-info'>wypłaty: {count.influence}</h1>
			</div>
			<Inputs
				click={handleNewAddTransaction}
				translationLength={transaction.length}
				changeTypeTransaction={handleChangeTypeTransaction}
			/>
			<Transactions transaction={transaction} deleteTransaction={handleDeleteTransation} />
		</div>
	)
}

export default App
