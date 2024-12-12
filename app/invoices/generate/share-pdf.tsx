import { useState, useEffect } from 'react';
import { Button } from '~/components/Button';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStore } from '~/store/store';
import { generateInvoicePDF } from '~/utils/pdf'

const SharePDF = () => {

  const newInvoice = useStore(data => data.newInvoice); 
  const  { recipientInfo, items, grandTotal } = newInvoice

  const sharePDF = () => {
    generateInvoicePDF(newInvoice)
  }

  return (
    <View className="flex-1 justify-center items-center">
      {/* Success Message */}
      <View className="rounded-lg items-center mt-32 mb-32 py-40" style={{ height: '70%'}}>
        <Text className="text-2xl font-bold text-green-600 mb-4">
          Invoice PDF Created Successfully!
        </Text>
        <Text className="text-base text-gray-700 mb-4 text-center">
          Your invoice has been generated as a PDF.
        </Text>

        {/* Share Button */}
        {/* <TouchableOpacity
          onPress={sharePDF}
          className="bg-blue-500 py-3 px-6 rounded-full shadow-md mt-4"
        >
          <Text className="text-white text-lg font-semibold">Save or Share Invoice PDF</Text>
        </TouchableOpacity> */}

        <Button title="Save / Share Invoice" className='my-4' onPress={sharePDF}/>
      </View>
    </View>
  );
};

export default SharePDF;
