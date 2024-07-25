import { deleteItemById, insertItem } from '@/db/mutations';
import { selectAllItems } from '@/db/queries';
import { Item } from '@/db/schema';
import { createItemData } from '@/db/seedData';
import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

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
  const [items, setLights] = React.useState<Item[]>(() => selectAllItems());
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleAddItem = async () => {
    setIsLoading(true);
    const newItem = createItemData();
    const item = await insertItem(newItem);
    if (!item) return;
    setLights(items => [item, ...items]);
    setIsLoading(false);
  };

  const handleDeleteItem = async () => {
    if (items.length > 0) {
      setIsLoading(true);
      const lastLight = items[0];
      const result = await deleteItemById(lastLight.id);
      if (!result) return;
      setLights(items => items.slice(1));
      setIsLoading(false);
    }
    return;
  };

  const handleRefresh = () => {
    const items = selectAllItems();
    setLights(items);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Items List ({items.length})</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddItem}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleDeleteItem}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleRefresh}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
        {items.length > 0 ? (
          <FlatList
            data={items}
            renderItem={({ item }: { item: Item }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item.name}</Text>
                <Text>ID: {item.id}</Text>
                <Text>Output: {item.value}</Text>
                <Text>Image: {item.image ? 'Available' : 'Not available'}</Text>
              </View>
            )}
            keyExtractor={item => `${item.id}-id`}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.errorMessage}>
            No items found. Please check your database connection.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
