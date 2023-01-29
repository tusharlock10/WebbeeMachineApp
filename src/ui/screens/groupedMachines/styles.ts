import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
    flexGrow: 1,
    paddingBottom: 100
  },
  button: {
    padding: 10,
    backgroundColor: 'blue'
  },
  navigateButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
  centre: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    textAlign: 'center',
    color: 'grey'
  },
}); 