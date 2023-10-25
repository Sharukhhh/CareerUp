import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import {store , persistor} from './Redux/store/store.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

interface ErrorBoundaryProps{
  children : React.ReactNode
}

interface ErrorBoundaryState {
  hasError : boolean;
}


class ErrorBoundary extends React.Component<ErrorBoundaryProps , ErrorBoundaryState> {
  constructor(props : ErrorBoundaryProps) {
    super(props);
    this.state = {hasError : false};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({hasError : true})
  }

  render(): React.ReactNode {
    if(this.state.hasError){
      return (
        <div className='flex justify-center items-center mx-auto my-auto text-5xl text-black bg-blue-gray-50'>
          OOPS! Something Went Wrong!
        </div>
      )
    }
    return this.props.children
  }
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter> 
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
)
