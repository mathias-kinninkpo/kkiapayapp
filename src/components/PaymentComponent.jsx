import React, { useState, useEffect } from 'react';
import './payement.css';
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";


const  PaymentComponent = () => {
  const [paymentMethod, setPaymentMethod] = useState('card'); // Par défaut, utilisez la carte bancaire
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: '',
    mobileMoneyNumber: '',
    email : ''
  });

  function open(paymentData) {

    return openKkiapayWidget({
      amount: 500,
      publicAPIKey: "d5da86d927dd664c670c866f65d2fe4102a2c011",
      sandbox: true,
      email: paymentData.email,
      phone: paymentData.mobileMoneyNumber,
    });
  }

  function successHandler(response) {
    console.log(response);
  }
  function failureHandler(response) {
    console.log(response);
  }


  useEffect(() => {
    addKkiapayListener('success',successHandler)
    addKkiapayListener('failure',failureHandler)
    return () => {
      removeKkiapayListener('success',successHandler)
    };
  }, []);

  const handlePayment = async () => {
    try {
      if (paymentMethod === 'card') {
        return open(paymentData)
        
      } else if (paymentMethod === 'mobileMoney') {
        console.log("success")
        return open(paymentData)
        
      }
    } catch (error) {
      // Gérez les erreurs de paiement ici
      console.error('Erreur de paiement :', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className='payment'>
      <h2>Finalisez votre paiement</h2>
      <div className="payment-method">
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={handlePaymentMethodChange}
          />
          Payer par carte bancaire
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="mobileMoney"
            checked={paymentMethod === 'mobileMoney'}
            onChange={handlePaymentMethodChange}
          />
          Payer par Mobile Money
        </label>
      </div>
        <form>
                {paymentMethod === 'card' && (
                <>
                <form className='form-container'>
                <div className="form-group">
                <label htmlFor="cardNumber" className='form-label'>Numéro de carte :</label>
                <input
                    type="text"
                    className="form-control"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="cardHolderName">Titulaire de la carte :</label>
                <input
                    type="text"
                    className="form-control"
                    id="cardHolderName"
                    name="cardHolderName"
                    value={paymentData.cardHolderName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="expirationDate">Date d'expiration :</label>
                <input
                    type="text"
                    className="form-control"
                    id="expirationDate"
                    name="expirationDate"
                    value={paymentData.expirationDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="cvv">CVV :</label>
                <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    required
                />
                </div>

        </form>
          </>
        )}
        {paymentMethod === 'mobileMoney' && (
          <form className='mobile'>
            <div className="form-group">
              <label htmlFor="mobileMoneyNumber">Numéro Mobile Money :</label>
              <input
                type="text"
                id="mobileMoneyNumber"
                name="mobileMoneyNumber"
                value={paymentData.mobileMoneyNumber}
                onChange={handleChange}
                placeholder="Numéro Mobile Money"
                required
                className='form-control'
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Numéro Mobile Money :</label>
              <input
                type="email"
                id="email"
                name="email"
                value={paymentData.email}
                onChange={handleChange}
                placeholder="exemple@gmail.com"
                className='form-control'
                required
              />
            </div>
          </form>
        )}
        <button className="payment-button" onClick={handlePayment}>
          Payer
        </button>
      </form>
    </div>
  );
};

export default PaymentComponent;
