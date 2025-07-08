import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

const Logo = ({ size = 'medium', showText = true }) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 48;
      default:
        return 32;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 24;
      default:
        return 16;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="finger-print" size={getSize()} color="#093FB4" />
      </View>
      {showText && <Text style={[styles.text, { fontSize: getTextSize() }]}>BioSecure</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  text: {
    fontWeight: 'bold',
    color: '#093FB4',
    letterSpacing: 0.5,
  },
});

export default Logo;
