import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View, StyleSheet, Button, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';


function MyAccount({navigation}){

    const {logout, userInfo} = useContext(AuthContext)


    return (
        
      <SafeAreaView>
        <Text>My Account</Text>
        <View style={styles.centeredView}>
            <Modal
                transparent={true}
                visible={accountModal}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setAccountModal(!accountModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{userInfo.first_name}</Text>
                        <Text>{userInfo.last_name}</Text>
                        <Text>{userInfo.email}</Text>
                        <Button title='logout' onPress={()=> {logout()}}/>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setAccountModal(!accountModal)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
        
        
        
        
      </SafeAreaView>
    );
  }

export default MyAccount