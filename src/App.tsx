/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from 'react'
import request from './utils/request'
import PriceItem from './component/priceItem'
import { Skeleton, Divider, Tooltip, message } from 'antd'
import title from './title.png'
import {
	GithubOutlined,
	RedoOutlined,
	PlayCircleTwoTone,
	PauseCircleTwoTone
} from '@ant-design/icons'
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
	const [loading, setLoading] = useState<boolean>(true)
	const [count, setCount] = useState<number>(0)
	const [isOpenTimer, setTimerButton] = useState<boolean>(false)
	let intervalHandle = useRef<any>()
	console.log(
		'%c  intervalHandle:',
		'color: #0e93e0;background: #aaefe5;',
		intervalHandle
	)
	const btcUsd = async () => {
		try {
			setLoading(true)
			//---------------------------真实api部分()------------------------------
			// let buffer: any[] = []
			// currencyKey.map(async (item: any) => {
			// 	const getList = await request({ url: item })
			// 	const getData: any = getList?.data?.data
			// 	buffer.push(getData)
			// })
			// setBtc(buffer)

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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const setTimer = () => {
		setTimerButton(true)
		intervalHandle.current = setInterval(() => {
			btcUsd()
			setCount((count) => count + 1)
		}, 30000)
	}

	const closeTimer = () => {
		clearInterval(intervalHandle.current)
		setTimerButton(false)
	}

	useEffect(() => {
		count === 0 && btcUsd()
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
				<div className='Cryptocurrency-Realtime'>
					<Divider
						style={{
							width: '80%',
							fontSize: '24px'
						}}
					>
						Cryptocurrency Realtime Price
						<Tooltip
							title={`${
								isOpenTimer ? '关闭开启定时器' : '开启定时器，30s刷新一次汇率'
							}`}
						>
							{isOpenTimer ? (
								<PauseCircleTwoTone
									className='timerButton'
									onClick={() => closeTimer()}
								/>
							) : (
								<PlayCircleTwoTone
									className='timerButton'
									onClick={() => setTimer()}
								/>
							)}
						</Tooltip>
						<Tooltip title='这是一个手动刷新按钮'>
							<RedoOutlined onClick={btcUsd} className='refresh-icon' />
						</Tooltip>
					</Divider>
					<div className='content'>{renderPriceItems()}</div>
				</div>
			</div>
		</div>
	)
}

export default EventX
