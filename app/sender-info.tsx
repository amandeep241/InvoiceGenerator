import { ScrollView, Text, View } from 'react-native';
import { Button } from '~/components/Button';
import CustomTextInput from '../components/CustomTextInput';
import { useForm, FormProvider } from 'react-hook-form';
import { router } from 'expo-router';
import { useStore } from '~/store/store';

export default function GenerateInvoice() {
  const { addSenderInfo } = useStore();

  const form = useForm();

  const onSubmit = (data) => {
    addSenderInfo(data);
    router.push('/recipient-info');
  };

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: '#fff' }}>
      <Text className="mb-5 text-2xl font-bold">Sender Info</Text>
      <FormProvider {...form}>
        <ScrollView className="">
          <CustomTextInput
            name="name"
            label="Name*"
            placeholder="Enter Bussiness Name"
            rules={{ required: 'Bussiness Name is required' }}
          />
          <CustomTextInput
            name="phone"
            label="Phone Number"
            placeholder="Enter Your Phone Number"
            rules={{
              pattern: {
                // value: /^(?:\+61|0)[2-9]{1}[0-9]{8}$/, // Adjust the pattern for your specific phone number format
                value: /^\d+$/,
                message: 'Please enter a valid phone number',
              },
            }}
            keyboardType="numeric"
          />
          <CustomTextInput
            name="secondaryPhone"
            label="Secondary Phone Number"
            placeholder="Enter Your Phone Number"
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
            placeholder="Enter Your Email"
            rules={{
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address.',
              },
            }}
          />
          <CustomTextInput name="address" label="Address" placeholder="Enter Bussiness Address" />
          <CustomTextInput
            name="website"
            label="Bussiness Website"
            placeholder="Enter Bussiness Website URL"
          />
        </ScrollView>

        <View className="pt-4">
          <Button title="Next" className="mb-12" onPress={form.handleSubmit(onSubmit)} />
        </View>
      </FormProvider>
    </View>
  );
}
