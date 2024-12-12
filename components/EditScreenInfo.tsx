import { Text, View } from 'react-native';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const description = 'Effortless invoicing made simple—create, send, and manage bills in minutes.';

  return (
    <View>
      <View className={styles.codeHighlightContainer + styles.homeScreenFilename}>
        <Text>{description}</Text>
      </View>
    </View>
  );
};

const styles = {
  codeHighlightContainer: `rounded-md px-1`,
  getStartedContainer: `items-center mx-12`,
  getStartedText: `text-lg leading-6 text-center`,
  helpContainer: `items-center mx-5 mt-4`,
  helpLink: `py-4`,
  helpLinkText: `text-center`,
  homeScreenFilename: `my-2`,
};
