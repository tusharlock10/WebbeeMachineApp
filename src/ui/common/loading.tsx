import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={28}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})