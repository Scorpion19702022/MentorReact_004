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

	// const influence = transaction.filter(item => item.type === 'influence')
	// const paycheck = transaction.filter(item => item.type === 'paycheck')

	const [resultTransaction, setResultTransaction] = useState([])

	useEffect(() => {
		if (typeTransaction === 'in') {
			const influence = transaction.filter(item => item.type === 'influence')
			setResultTransaction(influence)
		} else if (typeTransaction === 'out') {
			const paycheck = transaction.filter(item => item.type === 'paycheck')
			setResultTransaction(paycheck)
		}
	}, [typeTransaction])
	// console.log(all)
	// console.log(transaction)
	// console.log(influence)
	// console.log(paycheck)

	const handleChangeTypeTransaction = type => {
		setTypeTransaction(type)
		// if (typeTransaction === 'all') {
		// 	setTransaction(transaction)
		// } else if (typeTransaction === 'in') {
		// 	setTransaction(influence)
		// 	// console.log(typeTransaction)
		// } else if (typeTransaction === 'out') {
		// 	setTransaction(paycheck)
		// 	// console.log(typeTransaction)
		// }
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
			<Transactions
				resultTransaction={resultTransaction}
				deleteTransaction={handleDeleteTransation}
				typeTransaction={typeTransaction}
				transaction={transaction}
			/>
		</div>
	)
}

export default App
