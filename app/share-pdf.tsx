import { Button } from '~/components/Button';
import { View, Text } from 'react-native';
import { useStore } from '~/store/store';
import { generateInvoicePDF } from '~/utils/pdf';

const SharePDF = () => {
  const newInvoice = useStore((data) => data.newInvoice);

  const sharePDF = () => {
    generateInvoicePDF(newInvoice);
  };

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: '#fff' }}>
      <View className="flex-1 items-center justify-center">
        {/* Success Message */}
        <View className="mb-32 mt-32 items-center rounded-lg py-40" style={{ height: '70%' }}>
          <Text className="mb-4 text-2xl font-bold text-green-600">
            Invoice PDF Created Successfully!
          </Text>
          <Text className="mb-4 text-center text-base text-gray-700">
            Your invoice is ready. Click the button below to share it or save it to your device.
          </Text>
        </View>
      </View>

      <Button title="Save / Share Invoice" className="mb-16" onPress={sharePDF} />
    </View>
  );
};

export default SharePDF;
