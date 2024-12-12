import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Or any other icon library

const ButtonWithIcon = ({ onPress, title, iconName, iconColor = 'black', outlined = true }) => {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-center px-4 py-2 rounded-[28px] ${
        outlined ? 'border border-gray-500' : 'bg-blue-500'
      }`}
    >
      {iconName && (
        <FontAwesome
          name={iconName}
          size={20}
          color={iconColor}
          className="mr-2"
        />
      )}
      <Text
        className={`font-medium ${outlined ? 'text-gray-500' : 'text-white'}`}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default ButtonWithIcon;
