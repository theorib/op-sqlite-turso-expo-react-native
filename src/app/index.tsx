// import { deleteItemById, insertItem } from '@/db/mutations';

import { createItemData } from '@/db/seedData';

import { Item } from '@/db/schema';

import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

import { selectAllItems } from '@/db/queries';
import { deleteItemById, insertItem } from '@/db/mutations';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sync } from '@/db';

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
    fontSize: 20,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'left',
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
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
    opacity: 0.7,
  },
});

export default function Index() {
  const queryClient = useQueryClient();
  const { isPending, isLoading, status, data } = useQuery({
    queryKey: ['items'],
    queryFn: selectAllItems,
    throwOnError: true,
  });

  const insertItemMutation = useMutation({
    mutationFn: async (_: GestureResponderEvent) => {
      const newItem = createItemData();
      await insertItem(newItem);
    },
    onSuccess: () => {
      sync();
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    throwOnError: true,
  });
  const deleteItemMutation = useMutation({
    mutationFn: async (_: GestureResponderEvent) => {
      const lastItem = data?.[0];
      if (!lastItem) return;
      await deleteItemById(lastItem?.id);
    },
    onSuccess: () => {
      sync();
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    throwOnError: true,
  });

  const handleRefresh = async () => {
    sync();
    queryClient.invalidateQueries({ queryKey: ['items'] });
  };

  if (status !== 'success') return <Text>No data available</Text>;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>
          Items List ({data.length}) -
          {!isLoading ? 'Data loaded' : 'Loading data...'}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={insertItemMutation.mutate}
            disabled={isLoading || isPending}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={deleteItemMutation.mutate}
            disabled={isLoading || isPending}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleRefresh}
            disabled={isLoading || isPending}
          >
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
        {data.length > 0 ? (
          <FlatList
            data={data}
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
            No data found. Please check your database connection.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
