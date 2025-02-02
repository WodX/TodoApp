import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import initialData from '../initialData';
import { getData, storeData } from '../api';

function Home({ navigation }) {
  const [randomGame, setRandomGame] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    getData().then(async (outerData) => {
      if (!outerData) {
        await storeData(initialData);
        setData(await getData());
      } else {
        setData(outerData);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={{ width: 150, height: 150 }}
          source={require('../../assets/logo.png')}
        />
      </View>
      <View style={styles.content}>
        {randomGame ? (
          <View style={styles.randomGame}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Details', randomGame);
              }}
              style={styles.imageContainer}
            >
              <Image
                style={styles.image}
                source={
                  randomGame.images[
                    Math.floor(Math.random() * randomGame.images.length)
                  ]
                }
              />
            </TouchableOpacity>
            <Text style={styles.title}>{randomGame.title}</Text>
          </View>
        ) : (
          <View style={styles.randomGame}>
            <TouchableOpacity
              onPress={() => {
                setRandomGame(data[Math.floor(Math.random() * data.length)]);
              }}
              style={[
                styles.imageContainer,
                { justifyContent: 'center', alignItems: 'center' }
              ]}
            >
              <Text style={{ color: 'white', fontSize: 50 }}>?</Text>
            </TouchableOpacity>
            <Text style={styles.title}>What should I play?</Text>
          </View>
        )}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={async () => {
              Alert.alert(
                'Info',
                'This application was developed by André Nunes',
                [{ text: 'OK', onPress: () => {} }]
              );
            }}
          >
            <MaterialIcons name="info" size={30} color="#444" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Games');
            }}
          >
            <MaterialIcons name="settings" size={30} color="#444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff734e',
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 30
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    height: 100
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#ddd'
  },
  logo: {
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  randomGame: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 25,
    color: '#444'
  }
});

export default Home;
