import React from 'react';
import { Text, View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { openRemote, openSync } from '@op-engineering/op-sqlite';

type lights = {
  id: number;
  name: string;
  output: number;
  image: string | null;
};
let lights: lights[] = [];
try {
  const syncDb = openSync({
    name: 'myDb.sqlite',
    url: process.env.EXPO_PUBLIC_TURSO_DATABASE_URL!,
    authToken: process.env.EXPO_PUBLIC_TURSO_AUTH_TOKEN!,
  });
  const syncData = syncDb.execute('SELECT * FROM lights');
  lights = syncData?.rows?._array || [];

  // const remoteDb = openRemote({
  //   url: process.env.EXPO_PUBLIC_TURSO_DATABASE_URL!,
  //   authToken: process.env.EXPO_PUBLIC_TURSO_AUTH_TOKEN!,
  // });
  // const remoteData = remoteDb.execute('SELECT * FROM lights');
  // lights = remoteData?.rows?._array || [];
  // console.log(lights);
} catch (err) {
  console.error(err);
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default function Index() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>ID: {item.id}</Text>
      <Text>Output: {item.output}</Text>
      <Text>Image: {item.image ? 'Available' : 'Not available'}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Lights List</Text>
        {lights.length > 0 ? (
          <FlatList
            data={lights}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.errorMessage}>
            No lights found. Please check your database connection.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
