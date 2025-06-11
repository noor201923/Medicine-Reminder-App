import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Alert, Animated, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMedicine } from '../redux/medicineSlice';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MedicineListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const medicineList = useSelector(state => state.medicine.medicineList);
  const [searchText, setSearchText] = useState('');

  // Animation refs for fade-in
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [medicineList]);

  const handleDelete = (index) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this medicine?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => dispatch(deleteMedicine(index)) },
      ]
    );
  };

  const filteredMedicines = medicineList.filter(med =>
    med.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderMedicineItem = ({ item, index }) => (
    <Animated.View style={[styles.medicineItem, { opacity: fadeAnim }]}>
      <View style={styles.medicineInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detail}>Dosage: {item.dosage}</Text>
        <Text style={styles.detail}>Time: {item.time}</Text>
      </View>

      <View style={styles.actionButtons}>
        <Button
          mode="outlined"
          icon="pencil"
          compact
          onPress={() => navigation.navigate('EditMedicine', { medicine: item, index })}
          style={styles.button}
          textColor="#00796B"
        >
          Edit
        </Button>

        <Button
          mode="contained"
          icon="delete"
          compact
          buttonColor="#e74c3c"
          onPress={() => handleDelete(index)}
          style={styles.button}
        >
          Delete
        </Button>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Medicines</Text>

      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color="#00796B" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Medicine by Name"
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#666"
        />
      </View>

      {filteredMedicines.length === 0 ? (
        <View style={styles.noMedicinesContainer}>
          <MaterialCommunityIcons name="medicine-box-off" size={48} color="#777" />
          <Text style={styles.noMedicines}>No medicines found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredMedicines}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMedicineItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddMedicine')}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default MedicineListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 15,
    alignSelf: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B2DFDB',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    fontSize: 16,
    color: '#004D40',
  },
  noMedicinesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMedicines: {
    marginTop: 10,
    fontSize: 18,
    color: '#555',
  },
  medicineItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2, // for android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicineInfo: {
    flex: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796B',
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
  actionButtons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#00796B',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },
});
