import { useEffect } from 'react';
import './App.css';
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";
import PaymentComponent from './components/PaymentComponent';

export function App() {

  function open() {
    return openKkiapayWidget({
      amount: 4000,
      api_key: "xxxxxxxxxxxxxxxxxx",
      sandbox: true,
      email: "randomgail@gmail.com",
      phone: "97000000",
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

  return (
    <div className= "App">
      <PaymentComponent />
     
    </div>
  );
}

export default App;
