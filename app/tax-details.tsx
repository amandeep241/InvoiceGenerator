import { ScrollView, Text, View } from 'react-native';
import { Button } from '~/components/Button';
import CustomTextInput from '../components/CustomTextInput';
import { useForm, FormProvider } from 'react-hook-form';
import { router } from 'expo-router';
import { useStore } from '~/store/store';

export default function GenerateInvoice() {
  const { updateTaxInfo } = useStore();

  const form = useForm({
    defaultValues: {
      taxPercentage: 0,
    },
  });

  const onSubmit = (data) => {
    updateTaxInfo(data);
    router.push('/summary');
  };

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: '#fff' }}>
      <Text className="mb-5 text-2xl font-bold">Tax Info</Text>
      <FormProvider {...form}>
        <ScrollView>
          <View className="flex-row items-center p-2 ">
            <View className="flex-[9]">
              <CustomTextInput
                keyboardType="numeric"
                name="taxPercentage"
                label="Tax Percentage"
                placeholder="Enter Tax percentage"
                rules={{
                  required: 'Tax percentage is required',
                  pattern: {
                    value: /^\d+$/,
                    message: 'Please enter a valid digit',
                  },
                  min: {
                    value: 0,
                    message: 'Value must be at least 0',
                  },
                  max: {
                    value: 100,
                    message: 'Value cannot exceed 100',
                  },
                }}
              />
            </View>
            <Text className="ml-2 mt-4 text-base text-gray-500">%</Text>
          </View>
        </ScrollView>

        <Button title="Next" className="mb-12" onPress={form.handleSubmit(onSubmit)} />
      </FormProvider>
    </View>
  );
}
