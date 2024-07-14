import { Text, View } from 'react-native';

import { openRemote, openSync } from '@op-engineering/op-sqlite';
const remoteDb = openRemote({
  url: process.env.EXPO_PUBLIC_TURSO_DATABASE_URL!,
  authToken: process.env.EXPO_PUBLIC_TURSO_AUTH_TOKEN!,
});
const remoteData = remoteDb.execute('SELECT * FROM lights');
console.log('remoteData', remoteData?.rows?._array);

const syncDb = openSync({
  name: 'myDb.sqlite',
  url: process.env.EXPO_PUBLIC_TURSO_DATABASE_URL!,
  authToken: process.env.EXPO_PUBLIC_TURSO_AUTH_TOKEN!,
});
const syncData = syncDb.execute('SELECT * FROM lights');
console.log('syncData', syncData?.rows?._array);

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
