import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View, StyleSheet, Button, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';


function MyAccount({navigation, handleModalState}){

    const {logout, userInfo} = useContext(AuthContext)


    return (
        <SafeAreaView style={styles.centeredView}>
            <Modal>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => handleModalState()}>
                            <Text style={styles.buttonText}>X</Text>
                        </Pressable>
                        <Text style={styles.modalText}>
                            {userInfo.first_name}
                            <Text style={styles.modalText}> {userInfo.last_name}</Text>
                        </Text>
                        <Text style={styles.modalText}>{userInfo.email}</Text>
                        <Pressable style={styles.logoutButton} onPress={()=> {logout()}}>
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </Pressable>
                        
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    centeredView: {
      width: '90%',
      height: '90%',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 10,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    buttonClose: {
        borderRadius: 20,
        padding: 5,
        elevation: 1,
        backgroundColor: '#2196F3',
        alignSelf: 'flex-end',
        marginBottom:20
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12
    }, 


    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20
    },

    logoutButton: {
        backgroundColor: '#2196F3',
        alignSelf: 'center',
        marginTop:10,
        padding: 7,
        marginBottom:3,
        borderRadius: 20,
    },

    logoutButtonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }

  });

export default MyAccount