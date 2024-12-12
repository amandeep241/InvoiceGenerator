import { ScrollView, Text, View } from 'react-native';
import { Button } from '~/components/Button';
import CustomTextInput from '../../../components/CustomTextInput';
import { useForm, FormProvider } from 'react-hook-form';
import { router } from 'expo-router';
import { useStore } from '~/store/store';

export default function GenerateInvoice() {
  const { addRecipientInfo } = useStore();

  const form = useForm();

  const onSubmit = (data) => {
    addRecipientInfo(data);
    router.push('/invoices/generate/items');
  };

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: '#fff' }}>
      <Text className="mb-5 text-2xl font-bold">Recipient Info</Text>
      <FormProvider {...form}>
        <ScrollView>
          <CustomTextInput
            name="name"
            label="Name"
            placeholder="Enter Recipient Name"
            rules={{ required: 'Name is required' }}
          />
          <CustomTextInput
            name="phone"
            label="Phone Number"
            placeholder="Enter Recipient Phone Number"
            rules={{
              pattern: {
                value: /^\d+$/,
                message: 'Please enter a valid phone number',
              },
            }}
            keyboardType="numeric"
          />
          <CustomTextInput
            name="email"
            label="Email"
            placeholder="Enter Recipient Email"
            rules={{
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address.',
              },
            }}
          />
          <CustomTextInput name="address" label="Address" placeholder="Enter Bussiness Address" />
        </ScrollView>

        <Button title="Next" className="mb-12" onPress={form.handleSubmit(onSubmit)} />
      </FormProvider>
    </View>
  );
}
