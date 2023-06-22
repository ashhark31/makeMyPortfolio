import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import { Provider, useDispatch } from 'react-redux';
import { notifySelector } from '../redux_selecter';
import { useEffect } from 'react';
import { deactivateNotify } from '../redux/notification.slice';
import { Notification } from '../components';
import { store, wrapper } from '../store';

export function App({ Component, pageProps }) {
    const [isNotifyOn,type,message] = notifySelector();
    const dispatch = useDispatch();
    
    useEffect(() => {
      setTimeout(() => {
        dispatch(deactivateNotify());
      }, 3000);
    }, [isNotifyOn]);

  return (
    <Provider store={store}>
      <NextUIProvider>
        { isNotifyOn ?
            <Notification type={type} message={message} />
          : ''
        }
        <Component {...pageProps} />
      </NextUIProvider>
    </Provider>
  ); 
}

export default wrapper.withRedux(App)