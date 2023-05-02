import React, {useEffect, useContext, useState} from 'react';
import {Text, TextInput, Pressable, View, StyleSheet, Button, Modal, Dropdown} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage'


function MyAccount({navigation, handleModalState}){

    const {logout, userInfo, setUserInfo} = useContext(AuthContext)
    const [showEdit, setShowEdit] = useState(false)
    const [editedAttribute, setEditedAttribute] = useState('')
    const [editedInfo, setEditedInfo] = useState('')

    const editUser = ()=>{
        fetch(`http://127.0.0.1:5555/users/${userInfo.id}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                [editedAttribute]: editedInfo,
            })
        })
            .then(r=>r.json())
            .then(editedUser => {
                setUserInfo(editedUser)
                AsyncStorage.setItem('userInfo', JSON.stringify(editedUser))
            })
            
        }
    const deleteUser = ()=>{
        fetch(`http://127.0.0.1:5555/users/${userInfo.id}`, {method: 'DELETE',})
            .then(r=>r.json())
        }

    

    return (
        <SafeAreaView style={styles.centeredView}>
            <View>
                        {showEdit ? (
                            <Modal>
                            <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TextInput style={styles.input}/>
                                <Pressable onPress={()=>setShowEdit(false)}>
                                    <Text>Save</Text>
                                </Pressable>
                            </View>
                            </View>
                            </Modal>
                            ):(
                            <Modal>
                            <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                {/* <Pressable
                                        style={styles.editButton}
                                        onPress={() => setShowEdit(true)}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                </Pressable> */}
                                <Button title='Edit' onPress={() => setShowEdit(true)}/>

                                <Pressable
                                    style={styles.buttonClose}
                                    onPress={() => handleModalState()}>
                                    <Text style={styles.buttonText}>X</Text>
                                </Pressable>

                                <Text style={styles.modalText}>
                                    {userInfo.first_name}
                                    <Text style={styles.modalText}> {userInfo.last_name}</Text>
                                </Text>
                                
                                <Text style={styles.modalText}>{userInfo.email}</Text>
                                
                                <Pressable style={styles.logoutButton} onPress={()=>{handleModalState(), logout()}}>
                                    <Text style={styles.logoutButtonText}>Logout</Text>
                                </Pressable>
                                
                                <Pressable style={styles.deleteUserButton} onPress={()=>{deleteUser(), handleModalState(), logout()}}>
                                    <Text style={styles.deleteUserText}>Delete Account</Text>
                                </Pressable>
                            </View>
                            </View>
                            </Modal>
                        )
                    }
                        
                    </View>
        </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 200,
        margin: 20,
        borderWidth: 1,
        padding: 10,
    },
    saveButton:{
        marginTop: 0,
        backgroundColor: "blue",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 2,
        alignSelf: 'center',
        marginVertical: 30,
        marginHorizontal: 10,
        width: '50%'
    },
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
        padding: 12,
        marginBottom:3,
        borderRadius: 20,
        width: 200,
    },

    logoutButtonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center',
    }, 
    
    deleteUserButton:{
        backgroundColor: 'red',
        alignSelf: 'center',
        marginTop:40,
        padding: 7,
        marginBottom:3,
        borderRadius: 20,
    },

    deleteUserText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18

    },

  });

export default MyAccount