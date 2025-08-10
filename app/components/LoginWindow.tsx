import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  View, // Added View for the terms and conditions row
  Switch, // Added Switch for the toggle
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginWindow: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false); // State for terms and conditions

  const handleLogin = () => {
    if (!termsAccepted) {
      Alert.alert('Terms Not Accepted', 'Please accept the Terms and Conditions to log in.');
      return;
    }
    Alert.alert('Success', `Logged in with email: ${email}`);
    // In a real app, you would handle actual authentication here
  };

  const handleCreateAccount = () => {
    Alert.alert('Create Account', 'You clicked the Create Account button!');
    // In a real app, you would navigate to a registration screen here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.container}
      >
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
        />

        {/* Terms and Conditions Checkbox */}
        <View style={styles.termsContainer}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={termsAccepted ? '#6200ee' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setTermsAccepted(previousState => !previousState)}
            value={termsAccepted}
          />
          <Text style={styles.termsText}>I agree to the Terms and Conditions</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {/* Or, Create an account button */}
        <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
          <Text style={styles.createAccountButtonText}>Or, Create an account</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 90,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 30,
    alignSelf: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    elevation: 5, // Android shadow
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  createAccountButton: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  createAccountButtonText: {
    color: '#6200ee',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default LoginWindow;