import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import SendBird from 'sendbird';
import SendBirdDesk from 'sendbird-desk';

const APP_ID = '66ABC21F-6BC0-4C76-B672-7467B7880E0B';
const USER_ID = 'desk-rn-test-user-id';

const sb = new SendBird({appId: APP_ID});
sb.connect(USER_ID, (user, error) => {
  if (error) {
    // Handle error.
  }

  SendBirdDesk.init(SendBird);
  SendBirdDesk.authenticate(USER_ID);
});

export default function App() {
  const [createdTicket, setCreatedTicket] = React.useState();
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          SendBirdDesk.Ticket.create(
            'Ticket title',
            'User name',
            (ticket, error) => {
              if (ticket) {
                console.log('Ticket.create():success:', ticket);
                setCreatedTicket(ticket);
              } else {
                console.log('Ticket.create():error:', error);
              }
            },
          );
        }}>
        {'Create ticket'}
      </Button>

      {createdTicket && <Ticket ticket={createdTicket} />}
    </View>
  );
}

const Ticket = ({ticket}) => {
  return (
    <View style={{borderWidth: 1}}>
      <Text style={{fontSize: 22, fontWeight: 'bold'}}>{'Ticket Info'}</Text>
      <Text>Title: {ticket.channel.name}</Text>
      <Text>Url: {ticket.channel.name}</Text>
      <Button
        onPress={() => {
          ticket.channel.sendUserMessage(
            'NEW Message:' + new Date().toString(),
            (message, err) => {
              if (message) {
                console.log(
                  'ticket.channel.sendUserMessage():success:',
                  message,
                );
              }
            },
          );
        }}>
        {'send user message'}
      </Button>
    </View>
  );
};

const Button = ({children, onPress, color = '#aa22ff'}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
        height: 40,
        borderRadius: 8,
      }}>
      <Text style={{color: 'white', textAlign: 'center'}}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
