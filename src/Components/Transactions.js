import React from 'react'

const Transactions = ({ transaction }) => {
	const transactionsInfo = transaction.map((item, index) => {
		return (
			<div className={item.type === 'influence' ? 'bgc-green' : 'bgc-blue'} key={index}>
				<ul>
					<li>Kwota: {item.amount}</li>
					<span>
						<span>&#42510;</span>
					</span>
					<li>Treść: {item.title}</li>
					<span>
						<span>&#42510;</span>
					</span>
					<li>{item.type === 'influence' ? 'wpłata' : 'wypłata'}</li>
				</ul>
			</div>
		)
	})

	return <div className='box-acount'>{transactionsInfo}</div>
}

export default Transactions
