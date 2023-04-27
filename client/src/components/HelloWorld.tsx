import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import App from '../App';
import { IHelloWorldProps } from './IHelloWorldProps';
import { UserProvider } from './UserContext';
// import styles from './HelloWorld.module.scss';



export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public render(): React.ReactElement<IHelloWorldProps> {

    return (
     <HashRouter>
     <UserProvider>
      <App />
      </UserProvider>
     </HashRouter>
     
    );
  }
}
