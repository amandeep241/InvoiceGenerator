import { Link } from 'expo-router';
import { Button } from '~/components/Button';
import ButtonWithIcon from '~/components/ButtonWithIcon';
import { View, Text } from 'react-native';
import { useStore } from '~/store/store';
import { generateInvoicePDF } from '~/utils/pdf';

const SharePDF = () => {
  const newInvoice = useStore((data) => data.newInvoice);

  const sharePDF = () => {
    generateInvoicePDF(newInvoice);
  };

  return (
    <View className="flex-1 items-center justify-center">
      {/* Success Message */}
      <View
        className="mb-32 mt-32 items-center rounded-lg py-40"
        style={{ height: '70%' }}>
        <Text className="mb-4 text-2xl font-bold text-green-600">
          Invoice PDF Created Successfully!
        </Text>
        <Text className="mb-4 text-center text-base text-gray-700">
          Your invoice has been generated as a PDF.
        </Text>

        <Button title="Save / Share Invoice" className="my-4" onPress={sharePDF} />
        <Link href={{ pathname: '/' }} asChild>
          <ButtonWithIcon iconName="arrow-left" iconColor="green" title="Go to Home Page" />
        </Link>
      </View>
    </View>
  );
};

export default SharePDF;
