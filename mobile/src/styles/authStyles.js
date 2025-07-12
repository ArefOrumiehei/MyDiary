import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const authStyles = StyleSheet.create({
  background: {
    flex: 1,
    // justifyContent: "center",
  },
  formWrapper: {
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  authContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    direction: "rtl"
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#5e60ce',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'TanhaFD',
  },
  authForm: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    width: width > 400 ? 360 : width - 32,
    backdropFilter: 'blur(4px)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'TanhaFD',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    fontFamily: 'TanhaFD',
    direction: "inherit"
  },
  error: {
    color: '#b00020',
    // backgroundColor: '#fdecea',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'TanhaFD',
  },
  formBtn: {
    width: '100%',
    backgroundColor: '#5e60ce',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    fontFamily: 'TanhaFD',
  },
  formBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'TanhaFD',
  },
  switchAuth: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'TanhaFD',
  },
  switchAuthLink: {
    color: '#5e60ce',
  },
});
