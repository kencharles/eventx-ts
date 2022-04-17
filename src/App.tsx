import './App.css'
import React, { useEffect, useState } from 'react'
// import { Input } from 'antd'
import axios from 'axios'
import PriceItem from './component/priceItem'

const EventX = () => {
	const [getBtc, setBtc] = useState<any[]>([])
	console.log('%c  getBtc:', 'color: #0e93e0;background: #aaefe5;', getBtc)
	// const [currencyKey] = useState([])
	console.log('%c  getBtc:', 'color: #0e93e0;background: #aaefe5;', getBtc)
	const btcUsd = async () => {
		try {
			const getList = await axios.get(
				'https://b1264722-067f-47f8-9d37-d4fc9e4b7d46.mock.pstmn.io/ticker/btc'
			)
			console.log(
				'%c  getList:',
				'color: #0e93e0;background: #aaefe5;',
				getList
			)
			const getData = getList.data.data
			console.log(
				'%c  getData:',
				'color: #0e93e0;background: #aaefe5;',
				getData
			)
			setBtc(getData)
		} catch (error) {
			console.log('%c  error:', 'color: #0e93e0;background: #aaefe5;', error)
		}
	}

	useEffect(() => {
		btcUsd()
		// fetchBitcoinPrice()
	}, [])

	return (
		<div className='EventX'>
			<div className='container'>
				<div className='header-bar'>cryptocurrency Realtime Price</div>
				<p className='content'>
					{getBtc.map((item:any, index:number) => {
						const { ticker } = item
						const { base, change, price, target, volume = '' } = ticker
						const isNegative = change.substring(0, 1) === '-'
						return (
							<PriceItem
								key={index}
								base={base}
								change={change}
								price={price}
								target={target}
								volume={volume}
								isNegative={isNegative}
							/>
						)
					})}
				</p>
			</div>
		</div>
	)
}

export default EventX
