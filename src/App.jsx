import { useEffect } from 'react';
import './App.css';
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";
import PaymentComponent from './components/PaymentComponent';

export function App() {

  return (
    <div className= "App">
      <PaymentComponent />
    </div>
  );
}

export default App;
