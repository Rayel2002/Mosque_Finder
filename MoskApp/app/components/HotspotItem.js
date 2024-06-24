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
        <Text style={[styles.itemTitle, { color: theme.textColor }]}>
          {item.title}
        </Text>
        <Text style={[styles.itemDescription, { color: theme.textColor }]}>
          {item.description}
        </Text>
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
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    flex: 2,
  },
  favoriteIcon: {
    marginLeft: 10,
  },
});

export default HotspotItem;

