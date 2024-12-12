import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';

const description = 'Effortless invoicing made simple—create, send, and manage bills in minutes.';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const descriptionStyles = {
  codeHighlightContainer: `rounded-md px-1`,
  getStartedContainer: `items-center mx-12`,
  getStartedText: `text-lg leading-6 text-center`,
  helpContainer: `items-center mx-5 mt-4`,
  helpLink: `py-4`,
  helpLinkText: `text-center`,
  homeScreenFilename: `my-2`,
};

export default function Home() {
  return (
    <>
      <Container>
        <View className="flex-1 items-center justify-center">
          <Image
            source={require('~/assets/invoice.png')}
            className="mb-10 h-20 w-20"
            resizeMode="contain"
            style={styles.logo}
          />

          <Text className="text-2xl font-bold">Invoice Generation</Text>

          <View className="my-5 w-4/5 border-b border-gray-200 pb-2"></View>

          <View
            className={
              descriptionStyles.codeHighlightContainer + descriptionStyles.homeScreenFilename
            }>
            <Text className="mt-4 text-center">{description}</Text>
          </View>
        </View>

        <Link href={{ pathname: '/sender-info' }} asChild>
          <Button className="my-8" title="Create New Invoice" />
        </Link>
      </Container>
    </>
  );
}
