import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '../hooks/useTheme.js';
import { Ionicons } from '@expo/vector-icons';

const HotspotItem = ({ item, onPress, isFavorite, onFavoriteToggle }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.itemTitle, { color: theme.textColor }]}>
            {item.title}
          </Text>
          <Text style={[styles.itemDescription, { color: theme.textColor }]}>
            {item.description}
          </Text>
        </View>
        <TouchableOpacity onPress={onFavoriteToggle}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? 'red' : theme.textColor}
            style={styles.favoriteIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

HotspotItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  favoriteIcon: {
    marginLeft: 10,
  },
});

export default HotspotItem;
