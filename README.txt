if (state.isLoading) {
    return <LoadingScreen />;
  }

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGIN':
          return {
            ...prevState,
            isLogout: false,
            userToken: action.token,
          };
        case 'LOGOUT':
          return {
            ...prevState,
            isLogout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isLogout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      login: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'LOGIN', token: 'dummy-auth-token' });
      },
      logout: () => dispatch({ type: 'LOGOUT' }),
      createAccount: async (data) => {
        dispatch({ type: 'LOGIN', token: 'dummy-auth-token' });
      },
    }),
    []
  );


  // import React, {useEffect, useState, useContext, createContext, useReducer, useMemo} from 'react';
// import {FlatList, StatusBar, StyleSheet, Pressable, View, SafeAreaView, Text, ActivityIndicator } from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from './components/Home'
// import JobCategories from './components/JobCategories'
// import { AuthContextProvider, AuthContext } from "./components/AuthContext";
// import { Provider as PaperProvider, Button, withTheme } from "react-native-paper";
// import Loading from './components/Loading'
// import Login from './components/Login'





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


// const Stack = createNativeStackNavigator();

// function App(){

//   const [jobCategories, setJobCategories] = useState([])

//   useEffect(()=>{
//     fetch('http://127.0.0.1:5555/jobcategories')
//       .then(r=>r.json())
//       .then(data => setJobCategories(data))
//     }, [])


//   return (
//     <PaperProvider>
//     <SafeAreaView >
//       <StatusBar/>
//       <AuthContextProvider>
//         <NavigationContainer>
//           <Stack.Navigator screenOptions={{
//             title: 'Hustle',
//             headerStyle: {
//               backgroundColor: '#f4511e',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//           }}>
//           <>
//           <Stack.Screen name="Loading" component={Loading} />
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen
//                     name="Home"
//                     component={Home}
//                     options={{ headerRight: () => (
//                         <Button
//                           onPress={() => alert('This is a button!')}
//                           title="Info"
//                           color="#fff"
//                         />
//                         ),
//                       }}
//                   />
//           </>
//           </Stack.Navigator>
          
//           <View >
            
//             <FlatList
//                 data={jobCategories}
//                 keyExtractor={({id}) => id}
//                 renderItem={({item}) => (
//                   <Text>
//                     {item.category_name}
//                   </Text>
//                 )}
//               />
          
//           </View>
//         </NavigationContainer>
//       </AuthContextProvider>
//       </SafeAreaView>
//       </PaperProvider>
//   );
// };

// export default App

// {isLoggedIn ? (
          //         <>
          //           <Stack.Screen name="Loading" component={Loading} />
          //           <Stack.Screen name="Login" component={Login} />
          //           {/* <Stack.Screen name="CreateAccount" component={CreateAccount} /> */}
          //         </>
          //     ) : (
          //       <>
          //         <Stack.Screen
          //           name="Home"
          //           component={Home}
          //           options={{ headerRight: () => (
          //               <Button
          //                 onPress={() => alert('This is a button!')}
          //                 title="Info"
          //                 color="#fff"
          //               />
          //               ),
          //             }}
          //         />
          //         <Stack.Screen name="Job Categories" component={JobCategories} options={{ title: 'Job Categories' }}/>
          //       </>
          //     )
          //   }
