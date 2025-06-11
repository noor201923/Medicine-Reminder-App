
import AsyncStorage from '@react-native-async-storage/async-storage';

const MEDICINE_STORAGE_KEY = '@medicine_list';

export const saveMedicines = async (medicineList) => {
  try {
    const jsonValue = JSON.stringify(medicineList);
    await AsyncStorage.setItem(MEDICINE_STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving medicines to storage', e);
  }
};

export const loadMedicines = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(MEDICINE_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading medicines from storage', e);
    return [];
  }
};


