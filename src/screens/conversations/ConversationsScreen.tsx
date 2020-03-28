import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const USERS = gql`
  {
    me {
      id
      username
    }
  }
`;

export default function HomeScreen() {
  const { loading, error, data } = useQuery(USERS);

  useEffect(() => {
    console.log('mount')
    return () => console.log('unmount');
  }, [])

  function users() {
    if (data) {
      // return data.users.map(user => <Text key={user.id}>{user.username}</Text>)
      return <Text>{data.me.username}</Text>
    } else {
      return null;
    }
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      {}
      {users()}
    </View>
  );
}