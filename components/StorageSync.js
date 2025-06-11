import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { saveMedicines } from '../utils/storage';

export default function StorageSync() {
  const medicineList = useSelector(state => state.medicines.medicineList);
const reminderList = useSelector(state => state.reminders.reminderList);
  useEffect(() => {
    saveMedicines(medicineList);
    saveReminders(reminderList);
  }, [medicineList, reminderList]);

  return null; // no UI
}
