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
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  attributeContainer: {
    marginBottom: 8,
  },
  attributeFieldContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 