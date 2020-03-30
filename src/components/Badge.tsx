import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface Props {
  value: string | number
}

export const Badge = ({value}: Props) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{value}</Text>
    </View>
    )
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: 10,
    left: 30,
    backgroundColor: "#f00",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 1,
    paddingBottom: 1,
    borderRadius: 20,
    opacity: 0.7
  },
  badgeText: {
    fontSize: 8,
    color: '#fff'
  },
});