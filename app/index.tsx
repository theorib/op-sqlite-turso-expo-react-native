import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import { openRemote, openSync } from '@op-engineering/op-sqlite';
import { faker } from '@faker-js/faker';

const syncDb = openSync({
  name: 'myDb.sqlite',
  url: process.env.EXPO_PUBLIC_TURSO_DATABASE_URL!,
  authToken: process.env.EXPO_PUBLIC_TURSO_AUTH_TOKEN!,
});
syncDb.sync();

type Light = {
  id: string;
  name: string;
  output: number;
  image: string | null;
};

const createNewLight = (): Light => {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    output: faker.number.int({ min: 100, max: 100000 }),
    image: faker.image.urlPlaceholder({ height: 600, width: 600 }),
  };
};

const getAllLights = function (): Light[] | [] {
  syncDb.sync();
  const syncData = syncDb.execute(`
    SELECT * FROM lights 
    ORDER BY substr(id, 15, 4) || substr(id, 10, 4) || substr(id, 1, 8) DESC
  `);
  return syncData?.rows?._array || [];
};

const addNewLight = (): Light => {
  const newLight = createNewLight();
  syncDb.execute(
    'INSERT INTO lights (id, name, output, image) VALUES (?, ?, ?, ?)',
    [newLight.id, newLight.name, newLight.output, newLight.image]
  );
  return newLight;
};

const deleteLightById = (id: string) => {
  syncDb.execute('DELETE FROM lights WHERE id = ?', [id]);
};

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
    marginBottom: 6,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function Index() {
  const [lights, setLights] = React.useState<Light[]>(() => getAllLights());

  const handleAddLight = () => {
    const newLight = addNewLight();
    setLights(lights => [newLight, ...lights]);
  };

  const handleDeleteLight = () => {
    if (lights.length > 0) {
      const lastLight = lights[0];
      deleteLightById(lastLight.id);
      setLights(lights => lights.slice(1));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Lights List ({lights.length})</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddLight}>
            <Text style={styles.buttonText}>New Light</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDeleteLight}>
            <Text style={styles.buttonText}>Delete Last </Text>
          </TouchableOpacity>
        </View>
        {lights.length > 0 ? (
          <FlatList
            data={lights}
            renderItem={({ item }: { item: Light }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item.name}</Text>
                <Text>ID: {item.id}</Text>
                <Text>Output: {item.output}</Text>
                <Text>Image: {item.image ? 'Available' : 'Not available'}</Text>
              </View>
            )}
            keyExtractor={item => `${item.id}-id`}
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
