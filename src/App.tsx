/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// import logo from './logo.svg'
import './App.css'
import React, { useEffect, useState } from 'react'
import request from './utils/request'
import PriceItem from './component/priceItem'

const currencyKey = [
	'btc-usd',
	'eth-usd',
	'ltc-usd',
	'xmr-usd',
	'xrp-usd',
	'doge-usd',
	'dash-usd',
	'maid-usd',
	'lsk-usd',
	'sjcx-usd']

const EventX :React.FC= () => {
	const [getBtc, setBtc] = useState<any>([])

	const btcUsd = async () => {
		try {
			//---------------------------真实api部分------------------------------
				// let buffer: any[]=[];
				// currencyKey.map(async(item:any)=>{
				// 	const getList = await request({url:item})
				// 	const getData:any = getList?.data?.data
				// 	buffer.push(getData)
				// })


				// -----------------------mock部分--------------------------

				const getList = await request({url:'/ticker/btc'}) // mock请求
				const buffer = getList?.data?.data
			
				setBtc(buffer)
			
		
		} catch (error) {
			console.log('%c  error:', 'color: #0e93e0;background: #aaefe5;', error)
		}
	}

	const timer = ()=>{
		setTimeout(() => {
			btcUsd()
		}, 30000);
	}


	useEffect(() => {
		btcUsd();
		// timer()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div className='EventX'>
			<div className='container'>
				<h1 className='header-bar'>Cryptocurrency Realtime Price</h1>
				<p className='content'>
					{getBtc.map((item:any, index:number) => {
						const { ticker } = item
						const { change } = ticker
						const isNegative = change.substring(0, 1) === '-'
						return (
							<PriceItem
								key={index}
								{...ticker}
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