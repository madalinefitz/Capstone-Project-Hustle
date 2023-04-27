/**
 * @format
 */

import React, {useEffect, useState, useContext, createContext, useReducer, useMemo} from 'react';
import {FlatList, StyleSheet, Pressable, View, SafeAreaView, Button, Text, ActivityIndicator } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home'
import JobCategories from './components/JobCategories'
// import { AuthContext } from "./AuthContext";

// need()
// function LoadingScreen({ navigation }) {
//   const { loading, loggedIn } = useContext(AuthContext);

//   useEffect(() => {
//     if (loggedIn) {
//       navigation.dispatch(StackActions.replace("Account"));
//     } else if (loggedIn === false) {
//       navigation.dispatch(StackActions.replace("Login"));
//     }
//   }, [loggedIn]);
  
//   return (
//     <View >
//       {loading && (
//         <React.Fragment>
//           <ActivityIndicator size="large" />
//           <View >
//             <Text>Please wait...</Text>
//           </View>
//         </React.Fragment>
//       )}
//     </View>
//   );
// }



// function Login({navigation}){

//   const { loggedIn } = useContext(AuthContext);

//   useEffect(() => {
//     if (loggedIn) {
//       navigation.dispatch(StackActions.replace("Account"));
//     }
//   }, [loggedIn]);

//   const { login } = useContext(AuthContext);

//   return (
//     <View >
//       <Button mode="contained" onPress={() => login()}>
//         Login with Auth0
//       </Button>
//     </View>
//   );
// };
// ()

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const { login } = useContext(AuthContext);
//   return(
//     <View>
//         <TextInput
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//         />
//         <TextInput
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//         <Button title="Login" onPress={() => login({ email, password })} />
//     </View>
//   )
// }

// const AccountScreen = ({ navigation, theme }) => {
//   const { logout, loggedIn, userData } = useContext(AuthContext);
//   const { colors } = theme;

//   useEffect(() => {
//     if (loggedIn === false) {
//       navigation.dispatch(StackActions.replace("Login"));
//     }
//   }, [loggedIn]);

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       {userData && (
//         <View style={styles.userContainer}>
//           <Avatar.Image size={100} source={{ uri: userData.picture }} />
//           <View style={styles.textContainer}>
//             <Text>{userData.name}</Text>
//           </View>
//         </View>
//       )}

//       <Button mode="contained" onPress={() => logout()}>
//         Logout
//       </Button>
//     </View>
//   );
// };


// need()
// function CreateAccount(){
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const { createAccount } = useContext(AuthContext);

//   const user = struct({
//     first_name: firstName,
//     last_name: lastName,
//     email: email,
//     password: password
//   });
//   const STORAGE_KEY = 'id_token'
//   return(
//     <View>
//         <TextInput
//           placeholder="First Name"
//           value={firstName}
//           onChangeText={setFirstName}
//         />
//         <TextInput
//           placeholder="Last Name"
//           value={lastName}
//           onChangeText={setLastName}
//         />
//         <TextInput
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//         />
//         <TextInput
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//         <Button title="Create Account" onPress={() => createAccount({ firstName, lastName, email, password })} />
//     </View>
//   )

// }

const Stack = createNativeStackNavigator();

function App(){

  const [jobCategories, setJobCategories] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isLogout, setIsLogout] = useState(false)
  const [userToken, setUserToken] = useState(null)

  useEffect(()=>{
    fetch('http://127.0.0.1:5555/jobcategories')
      .then(r=>r.json())
      .then(data => setJobCategories(data))
    }, [])


  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName = 'Home' screenOptions={{
          title: 'Hustle',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
          <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ headerRight: () => (
                      <Button
                        onPress={() => alert('This is a button!')}
                        title="Info"
                        color="#fff"
                      />
                      ),
                    }}
                />

        {/* {isLoggedIn == false ? (
                <>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="CreateAccount" component={CreateAccount} />
                </>
            ) : (
              <>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ headerRight: () => (
                      <Button
                        onPress={() => alert('This is a button!')}
                        title="Info"
                        color="#fff"
                      />
                      ),
                    }}
                />
                <Stack.Screen name="Job Categories" component={JobCategories} options={{ title: 'Job Categories' }}/>
              </>
            )
          } */}
        </Stack.Navigator>
        <View >
          <SafeAreaView >
          <FlatList
              data={jobCategories}
              keyExtractor={({id}) => id}
              renderItem={({item}) => (
                <Text>
                  {item.category_name}
                </Text>
              )}
            />
        </SafeAreaView>
        </View>
      </NavigationContainer>
  );
};

export default App





