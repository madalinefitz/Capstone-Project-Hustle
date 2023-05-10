import React, {useEffect, useContext, useState} from 'react';
import {Text, TextInput, Pressable, View, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';




function MyAccount({handleModalState}){
    const {logout, userInfo, updateUser} = useContext(AuthContext)
    
    const [showEdit, setShowEdit] = useState(false)
    const [editedFirst, setEditedFirst] = useState(userInfo.first_name)
    const [editedLast, setEditedLast] = useState(userInfo.last_name)
    const [editedEmail, setEditedEmail] = useState(userInfo.email)

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
                                    <Text style={styles.editText}>SAVE</Text>
                                </Pressable>
                                </>
                            ):(
                                <>
                                <Pressable style={styles.editButton} onPress={() => setShowEdit(!showEdit)}>
                                    <Text style={styles.editText}>EDIT</Text>
                                </Pressable>
                                </>
                            )
                        }
                        
                        {showEdit == false ? (
                                <>
                                <Text style={styles.modalName}>
                                    {userInfo.first_name}
                                    <Text style={styles.modalName}> {userInfo.last_name}</Text>
                                </Text>
                                <Text numberOfLines={1} style={styles.modalEmail}>{userInfo.email}</Text>
                                </>
                            ) : (
                                <>
                                <TextInput onChangeText={text=>setEditedFirst(text)} style={styles.input} placeholder={userInfo.first_name}/>
                                <TextInput onChangeText={text=>setEditedLast(text)} style={styles.input} placeholder={userInfo.last_name}/>
                                <TextInput onChangeText={text=>setEditedEmail(text)} style={styles.input} placeholder={userInfo.email} autoCapitalize='none'/>
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


export default MyAccount