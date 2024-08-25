'use client'

import '@smastrom/react-rating/styles.css'
import {Rating, Star, StickerStar, ThinRoundedStar, ThinStar} from '@smastrom/react-rating'

export default function ProductRate({rate, count} : {rate:number, count:number}) {
  const myStyles = {
    itemShapes: Star,
    activeFillColor: '#eeb524',
    inactiveFillColor: '#837947'
  }
  return (
    <div className={'flex'}>
      <Rating style={{maxWidth: 100}} className={'mr-5s'} itemStyles={myStyles} value={rate} readOnly/><p className={'mx-2'}>-</p><div className={'flex flex-row items-center text-lg'}><label>{'نفر'}</label><label>{count}</label></div>
    </div>
  )
}