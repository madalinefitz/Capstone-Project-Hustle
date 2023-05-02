import React, {useEffect, useContext, useState} from 'react';
import {Text, TextInput, Pressable, View, StyleSheet, Button, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage'




function MyAccount({navigation, handleModalState}){
    const {logout, userInfo, updateUser} = useContext(AuthContext)

    const firstName = userInfo.first_name
    const lastName = userInfo.last_name
    const email = userInfo.email

    
    const [showEdit, setShowEdit] = useState(false)
    const [editedFirst, setEditedFirst] = useState(firstName)
    const [editedLast, setEditedLast] = useState(lastName)
    const [editedEmail, setEditedEmail] = useState(email)

    const editUser = ()=>{
        fetch(`http://127.0.0.1:5555/users/${userInfo.id}`, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                first_name: editedFirst,
                last_name: editedLast,
                email: editedEmail
            })
        })
            .then(r=>r.json())
            .then(editedUser => {
                updateUser(editedUser)
            })
        }
    
    const deleteUser = ()=>{
        fetch(`http://127.0.0.1:5555/users/${userInfo.id}`, {method: 'DELETE',})
            .then(r=>r.json())
        }

    return (
        <SafeAreaView style={styles.centeredView}>
            <Modal>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => handleModalState()}>
                            <Text style={styles.buttonText}>X</Text>
                        </Pressable>
                        {showEdit ? (
                                <>
                                <Pressable style={styles.editButton} onPress={() => {editUser(), setShowEdit(!showEdit)}}>
                                    <Text style={styles.editText}>Save</Text>
                                </Pressable>
                                </>
                            ):(
                                <>
                                <Pressable style={styles.editButton} onPress={() => setShowEdit(!showEdit)}>
                                    <Text style={styles.editText}>Edit</Text>
                                </Pressable>
                                </>
                            )
                        }
                        
                        {showEdit == false ? (
                                <>
                                <Text style={styles.modalText}>
                                    {userInfo.first_name}
                                    <Text style={styles.modalText}> {userInfo.last_name}</Text>
                                </Text>
                                <Text style={styles.modalText}>{userInfo.email}</Text>
                                </>
                            ) : (
                                <>
                                <TextInput onChangeText={text=>setEditedFirst(text)} style={styles.input} placeholder={userInfo.first_name}/>
                                <TextInput onChangeText={text=>setEditedLast(text)} style={styles.input} placeholder={userInfo.last_name}/>
                                <TextInput onChangeText={text=>setEditedEmail(text)} style={styles.input} placeholder={userInfo.email}/>
                                </>
                            )
                        }
                        <Pressable style={styles.logoutButton} onPress={()=>{handleModalState(), logout()}}>
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </Pressable>
                        
                        <Pressable style={styles.deleteUserButton} onPress={()=>{deleteUser(), handleModalState(), logout()}}>
                            <Text style={styles.deleteUserText}>Delete Account</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 200,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    },
    editButton:{
        alignSelf: 'flex-start',
        marginTop:0,
        marginBottom:30,
    },
    editText:{
        color: '#2196F3',
        fontSize: 18,
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
        backgroundColor: '#2196F3',
        alignSelf: 'flex-end',
        marginBottom:0,
        marginTop:0
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