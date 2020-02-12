import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

function Suggestion(props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          style={styles.cover}
          source={{
            uri: props.medium_cover_image
          }}
        />
        <View style={styles.genreContainer}>
          <Text style={styles.genreText}>{props.genres[0]}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.year}>{props.year}</Text>
        <Text style={styles.rating}>Score: {props.rating}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  cover: {
    height: 150,
    width: 100,
    resizeMode: 'contain'
  },
  right: {
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18,
    color: '#44546b'
  },
  year: {
    backgroundColor: '#70b124',
    paddingVertical: 4,
    paddingHorizontal: 6,
    color: 'white',
    fontSize: 11,
    borderRadius: 5,
    overflow: 'hidden',
    alignSelf: 'flex-start'
  },
  rating: {
    color: '#6b6b6b',
    fontSize: 14,
    fontWeight: 'bold'
  },
  genreContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: 'black'
  },
  genreText: {
    color: 'white',
    fontSize: 11,

  }
});

export default Suggestion;