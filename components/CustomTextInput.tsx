import { View, Text, TextInput } from 'react-native';
import { useController } from 'react-hook-form';

export default function CustomTextInput({ name, label, rules = {}, width = '', keyboardType = "default", ...props }) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, rules });

  const classNew = 'rounded border border-gray-300 p-4 ' + width;

  console.log('error', error);
  return (
    <View className="gap-2">
      <Text className="text-lg mb-3">{label}</Text>
      <TextInput
        {...props}
        className={classNew}
        onChangeText={onChange}
        value={value}
        onBlur={onBlur}
        keyboardType={keyboardType}
      />
      <Text className="text-red-500">{error?.message}</Text>
    </View>
  );
}
