import * as React from 'react';

// libs
import Web3 from 'web3';
import { CONTACT_ABI, CONTACT_ADDRESS } from './config';
import { Web3ReactProvider } from '@web3-react/core'


function getLibrary(provider) {
  return new Web3(provider)
}


export const Web3App = React.forwardRef((props: any, ref) => {
  const [account, setAccount] = React.useState();
  const [contactList, setContactList] = React.useState();
  const [contacts, setContacts] = React.useState([]);


  /**
   * The component instance will be extended
   * with whatever you return from the callback passed
   * as the second argument
   */
  React.useImperativeHandle(ref, () => ({

    init: () => {
      init();
    }

  }));


  const init = async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);

    const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);

    console.error('contactList', contactList);

    setContactList(contactList);

    console.error('!!', await contactList.methods.count().call());
    const counter = await contactList.methods.count().call();

    console.error('counter', counter);

    for (var i = 1; i <= counter; i++) {
      const contact = await contactList.methods.contacts(i).call();
      setContacts((contacts) => [...contacts, contact]);
    }
  }

  if (!account) {
    return props.children
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div>
        Your account is: {account}
        {contacts.length > 0 && (
          <div>
            <h4>Contacts</h4>
            <ul>
              {
                Object.keys(contacts).map((contact, index) => (
                  <li key={`${contacts[index].name}-${index}`}>
                    <h4>{contacts[index].name}</h4>
                    <span><b>Phone: </b>{contacts[index].phone}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        )}

      </div>
    </Web3ReactProvider>
  )
})

