/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from 'react'
import request from './utils/request'
import PriceItem from './component/priceItem'
import { Skeleton, Divider, Tooltip, message } from 'antd'
import title from './title.png'
import { GithubOutlined } from '@ant-design/icons'
// const currencyKey = [
// 	'btc-usd',
// 	'eth-usd',
// 	'ltc-usd',
// 	'xmr-usd',
// 	'xrp-usd',
// 	'doge-usd',
// 	'dash-usd',
// 	'maid-usd',
// 	'lsk-usd',
// 	'sjcx-usd'
// ] // api key for real api

const EventX: React.FC = () => {
	const [getBtc, setBtc] = useState<any>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [count, setCount] = useState<number>(0)
	let intervalHandle = useRef<any>()
	const btcUsd = async () => {
		try {
			setLoading(true)
			//---------------------------真实api部分()------------------------------
			// let buffer: any[]=[];
			// currencyKey.map(async(item:any)=>{
			// 	const getList = await request({url:item})
			// 	const getData:any = getList?.data?.data
			// 	buffer.push(getData)
			// })

			// -----------------------mock部分--------------------------

			const getList = await request({ url: '/ticker/btc' }) // mock请求
			const buffer = getList?.data?.data
			setBtc(buffer)
			setLoading(false)
		} catch (error) {
			message.error('api error')
			setLoading(false)
			console.error('%c  error:', 'color: #0e93e0;background: #aaefe5;', error)
		}
	}

	useEffect(() => {
		document.title = 'Interview for WaikeiChan'
	})
	const setTimer = () => {
		intervalHandle.current = setInterval(() => {
			btcUsd()
			setCount((count) => count + 1)
		}, 30000)
	}

	useEffect(() => {
		count === 0 && btcUsd()
		setTimer()
		return () => clearInterval(intervalHandle.current)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const renderPriceItems = (): React.ReactNode => {
		return getBtc.map((item: any, index: number) => {
			const { ticker } = item
			const { change } = ticker
			const isNegative = change.substring(0, 1) === '-'
			return (
				<Skeleton loading={loading} active>
					<PriceItem key={index} {...ticker} isNegative={isNegative} />
				</Skeleton>
			)
		})
	}
	return (
		<div className='eventX'>
			<div className='container'>
				<div className='header-bar'>
					<div className='head-container'>
						<div className='title'>
							<img className='img' src={title} />
						</div>
						<div className='menu'>
							<Tooltip title='返回kencharles的github'>
								<a
									style={{ userSelect: 'none' }}
									href='https://github.com/kencharles/eventx-ts'
								>
									<GithubOutlined
										style={{
											color: '#000',
											fontSize: '5vh',
											verticalAlign: 'middle',
											cursor: 'pointer'
										}}
									/>
								</a>
							</Tooltip>
						</div>
					</div>
				</div>
				<Divider
					style={{
						width: '80%',
						fontSize: '24px'
					}}
				>
					Cryptocurrency Realtime Price
				</Divider>
				<div className='content'>{renderPriceItems()}</div>
			</div>
		</div>
	)
}

export default EventX
