import React from 'react'
import KhaltiCheckout from "khalti-checkout-web";
import config from './khaltiConfig';

function Khalti(props) {

    let checkout = new KhaltiCheckout(config);

  return (
    <div>
        <button type="button" className='px-2 py-2 text-blue-600' onClick={() => checkout.show({amount: props.price * 100})}>Via Khalti</button>
    </div>
  )
}

export default Khalti