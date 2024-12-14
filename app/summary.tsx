import { useState, useEffect } from 'react';
import { Button } from '~/components/Button';
import { View, Text, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { useStore } from '~/store/store';
import { generateInvoicePDF } from '~/utils/pdf';

const Summary = () => {
  const [grandTotal, setGrandTotal] = useState(0);
  const { updategrandTotal } = useStore();
  const newInvoice = useStore((data) => data.newInvoice);
  const { recipientInfo, items, taxInfo } = newInvoice;

  useEffect(() => {
    const finalTotal = items.reduce(
      (acc, item) => acc + calculateTotal(item.price, item.quantity),
      0
    );
    const percentage = taxInfo.taxPercentage / 100;
    const taxAmt = percentage * finalTotal;
    const totalFigures = {
      subTotal: finalTotal,
      taxAmount: taxAmt,
      totalDue: taxAmt + finalTotal,
    };
    updategrandTotal(totalFigures);
    setGrandTotal(totalFigures);
  }, [items]);

  const calculateTotal = (price, quantity) => price * quantity;

  const onGenerateInvoice = () => {
    generateInvoicePDF(newInvoice);
  };

  return (
    <View className="flex-1 p-4" style={{ backgroundColor: '#fff' }}>
      <View className="flex-1 bg-gray-100 p-6">
        {/* Recipient Details */}
        <Text className="mb-4 text-xl font-bold text-gray-800">Recipient Details</Text>
        <View className="mb-6">
          <Text className="text-lg text-gray-700">Name: {recipientInfo.name}</Text>
          <Text className="text-lg text-gray-700">Email: {recipientInfo.email}</Text>
          <Text className="text-lg text-gray-700">Phone: {recipientInfo.phone}</Text>
        </View>

        {/* Items List */}
        <Text className="mb-4 text-xl font-bold text-gray-800">Items</Text>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="mb-2 flex-row items-center justify-between rounded border bg-white p-2">
              <View>
                <Text className="font-bold text-gray-700">{item.name}</Text>
                <Text className="text-gray-500">Price: ${item.price}</Text>
                <Text className="text-gray-500">Quantity: {item.quantity}</Text>
              </View>
              <Text className="font-semibold text-gray-800">
                Total: ${calculateTotal(item.price, item.quantity)}
              </Text>
            </View>
          )}
        />

        {/* Grand Total */}
        <Text className="mt-4 text-lg font-bold text-gray-800">
          Sub Total: ${grandTotal.subTotal}
        </Text>

        <Text className="mt-4 text-lg font-bold text-gray-800">
          Tax Percentage: ${taxInfo.taxPercentage} %
        </Text>
      </View>

      <Link href={{ pathname: '/share-pdf' }} asChild>
        <Button title="Generate Invoice PDF" className="my-8" />
      </Link>
    </View>
  );
};

export default Summary;
