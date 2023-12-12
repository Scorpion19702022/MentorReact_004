import React from 'react'

const Transactions = ({ transaction }) => {
	const transactionsInfo = transaction.map((item, index) => {
		return (
			<div className={item.type === 'influence' ? 'bgc-green' : 'bgc-blue'} key={index}>
				<ul>
					<li>
						Kwota: <span>{item.amount}</span>
					</li>

					<li>
						Treść: <span>{item.title}</span>
					</li>

					<li>
						<span>{item.type === 'influence' ? 'wpłata' : 'wypłata'}</span>
					</li>
				</ul>
			</div>
		)
	})

	return <div className='box-acount'>{transactionsInfo}</div>
}

export default Transactions
