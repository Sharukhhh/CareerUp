import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter  } from 'react-router-dom';
import {store , persistor} from './Redux/store/store.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// interface ErrorBoundaryProps{
//   children : React.ReactNode
// }

// interface ErrorBoundaryState {
//   hasError : boolean;
// }


// class ErrorBoundary extends React.Component<ErrorBoundaryProps , ErrorBoundaryState> {
//   constructor(props : ErrorBoundaryProps) {
//     super(props);
//     this.state = {hasError : false};
//   }

//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
//     this.setState({hasError : true})
//   }

//   render(): React.ReactNode {
//     if(this.state.hasError){
//       return (
//         <section className="flex items-center max-w-3xl mx-auto mt-10 h-full sm:p-16 bg-blue-gray-50 text-black">
//           <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 dark:text-gray-600">
//               <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
//               <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
//               <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
//               <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
//             </svg>
//             <p className="text-3xl">Oops, Something Went Wrong!</p>
//               <button className='bg-blue px-4 py-2'>
//                 <p  className="px-8 py-3 font-semibold rounded bg-blue text-white"> Refresh</p>
//               </button>
//           </div>
//         </section>
//       )
//     }
//     return this.props.children
//   }
// }


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter> 
            <App />
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
)
