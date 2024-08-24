'use client'

import '@smastrom/react-rating/styles.css'
import {Rating, Star, StickerStar, ThinRoundedStar, ThinStar} from '@smastrom/react-rating'

export default function ProductRate({rate, count} : {rate:number, count:number}) {
  const myStyles = {
    itemShapes: Star,
    activeFillColor: '#ffb700',
    inactiveFillColor: '#fbf1a9'
  }
  return (
    <div className={'flex'}>
      <Rating style={{maxWidth: 100}} itemStyles={myStyles} value={rate} readOnly/>{' -'} {count}
    </div>
  )
}