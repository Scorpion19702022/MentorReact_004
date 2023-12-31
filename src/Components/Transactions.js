import React from 'react'

import Bin from '../assets/bin.png'

const Transactions = ({ transaction, deleteTransaction, resultTransaction, typeTransaction }) => {
	const transactionsInfo = resultTransaction.map((item, index) => {
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
				<button className='btn-bin' onClick={() => deleteTransaction(item)}>
					<img src={Bin} alt='' />
				</button>
			</div>
		)
	})
	const allTransaction = transaction.map((item, index) => {
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
				<button className='btn-bin' onClick={() => deleteTransaction(item)}>
					<img src={Bin} alt='' />
				</button>
			</div>
		)
	})

	return <div className='box-acount'>{typeTransaction === 'all' ? allTransaction : transactionsInfo}</div>
}

export default Transactions
