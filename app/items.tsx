import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from '~/components/Button';
import ButtonWithIcon from '~/components/ButtonWithIcon';
import CustomTextInput from '../components/CustomTextInput';
import { useForm, FormProvider } from 'react-hook-form';
import { router } from 'expo-router';
import { useStore } from '~/store/store';

export default function Items() {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [items, setItems] = useState([]);
  const [itemError, setItemError] = useState('');

  const { updateItems } = useStore();

  const form = useForm();
  const { reset } = form;

  useEffect(() => {
    if (!isSubmitSuccessful) {
      return;
    }

    reset();
    setIsSubmitSuccessful(false);
  }, [isSubmitSuccessful]);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setItemError('');
  }, [items]);

  const onNextClick = () => {
    if (items.length === 0) {
      setItemError('Please add atleast 1 item.');
      return;
    }
    updateItems(items);
    router.push('/tax-details');
  };

  const addItem = (data) => {
    const { name, price, quantity } = data;
    if (name.trim() !== '' && price.trim() !== '' && quantity.trim() !== '') {
      const newItem = {
        id: Date.now().toString(), // Unique ID for each item
        name: name.trim(),
        price: parseFloat(price).toFixed(2),
        quantity: parseInt(quantity, 10),
      };
      setItems([...items, newItem]);
      setIsSubmitSuccessful(true);
      reset({
        name: '',
        price: '',
        quantity: '',
      });
      //TODO Clear input fields after adding
    }
  };

  const styles = StyleSheet.create({
    itemContainer: {
      padding: 15,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    },
    itemText: {
      fontSize: 16,
    },
    itemInput: {},
  });

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: '#fff' }}>
      <Text className="mb-5 text-2xl font-bold">Items</Text>
      <FormProvider {...form}>
        <ScrollView>
          <CustomTextInput
            name="name"
            label="Name"
            placeholder="Enter Item  Name"
            rules={{ required: 'Item Name is required' }}
          />
          <View className="item-fields flex-row justify-between">
            <CustomTextInput
              width="w-48"
              name="price"
              label="Price"
              placeholder="Enter Item Price"
              style={styles.itemInput}
              rules={{
                required: 'Item Price is required',
                pattern: {
                  value: /^\d+$/,
                  message: 'Please enter a valid number',
                },
              }}
              keyboardType="numeric"
            />
            <CustomTextInput
              width="w-48"
              name="quantity"
              label="Quantity"
              placeholder="Enter Item Quantity"
              rules={{
                required: 'Item Quantity is required',
                pattern: {
                  value: /^\d+$/,
                  message: 'Please enter a valid number',
                },
              }}
              keyboardType="numeric"
            />
          </View>
          {/* <Button title="Add Item" className="mt-auto" onPress={form.handleSubmit(addItem)} /> */}
          <ButtonWithIcon
            title="Add Item"
            onPress={form.handleSubmit(addItem)}
            iconName="plus"
            iconColor="green"
          />
        </ScrollView>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            // <View style={styles.itemContainer}>
            <View style={styles.itemContainer}>
              <View className="flex-row items-center justify-between px-4 py-2">
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>{Number(item.price) * item.quantity}</Text>
              </View>
              <View>
                <Text style={styles.itemText}>
                  {Number(item.price).toFixed(2)} x {item.quantity}
                </Text>
              </View>
            </View>
          )}
        />

        {itemError && <Text className="mb-5 text-center text-red-500">{itemError}</Text>}

        <Button title="Next" className="mt-auto" onPress={onNextClick} />
      </FormProvider>
    </View>
  );
}
