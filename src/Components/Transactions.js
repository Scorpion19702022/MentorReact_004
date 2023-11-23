import React from 'react'

const Transactions = ({ transaction }) => {
	const transactionsInfo = transaction.map((item, index) => {
		return (
			<div className={item.type === 'influence' ? 'bgc-green' : 'bgc-red'} key={index}>
				<ul>
					<li>Kwota: {item.amount}</li>
					<li>Treść: {item.title}</li>
					<li>{item.type}</li>
				</ul>
			</div>
		)
	})

	return <div className='box-acount'>{transactionsInfo}</div>
}

export default Transactions
