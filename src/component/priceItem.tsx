import React from 'react'
import '../App.css'
interface IProps {
    base?:string
    target?:string
    price?:string
    volume?:string
    isNegative:boolean
    change?:string
    key:number
}

const PriceItem : React.FC<IProps> = (props:any)=>{
    const {base='',target='',price='',volume='',isNegative,change='',key} = props;

    return (
        <div key={key} className='price-item'>
            <h1 style={{ fontWeight: 'bold', margin: 0, color: 'black' }}>
                {base}-{target}
            </h1>
            <h2 className='price'>${price}</h2>
            <div className='volume-and-change'>
                <div className='volume'>
                    volume:
                    <p style={{ margin: '8px 0', width: '100%' }}>{volume}</p>
                </div>
                <div className='change'>
                    change:
                    <p
                        style={{
                            margin: '8px 0',
                            color: `${isNegative ? 'red' : 'green'}`
                        }}
                    >
                        {change}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PriceItem;