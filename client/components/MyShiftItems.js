import React, {useEffect, useContext, useState} from 'react';
import {Text, TextInput, Pressable, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';


function MyShiftItems({job_category_name, job_category_id, start_date_time, hourly_pay, location, end_date_time, id}){
    
    const {userInfo, deleteShift, updateShift} = useContext(AuthContext)

    const [editedStartDT, setEditedStartDT] = useState(start_date_time)
    const [editedEndDT, setEditedEndDT] = useState(end_date_time)
    const [editedJobId, setEditedJobId] = useState(job_category_id)
    const [editedLocation, setEditedLocation] = useState(location)
    const [editedPay, setEditedPay] = useState(hourly_pay)

    const [showShiftEdit, setShowShiftEdit] = useState(false)

    const editShift=(id)=>{
      fetch (`http://127.0.0.1:5555/shifts/${id}`, {
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            user_id: userInfo.id,
            start_date_time: editedStartDT,
            end_date_time: editedEndDT,
            job_id: editedJobId,
            location: editedLocation,
            hourly_pay: editedPay,
          })
      })
          .then(r=>r.json())
          .then(editedShift => {
              updateShift(editedShift)
            })
            
    }
    
    return(
        <SafeAreaView>
            {showShiftEdit ? (
                <View style={styles.shiftItem}>
                        <TextInput onChangeText={text=>setEditedStartDT(text)} style={styles.editShiftInput} placeholder={start_date_time}/>
                        <TextInput onChangeText={text=>setEditedEndDT(text)} style={styles.editShiftInput} placeholder={end_date_time}/>
                        <TextInput onChangeText={text=>setEditedJobId(text)} style={styles.editShiftInput} placeholder={job_category_name} />
                        <TextInput onChangeText={text=>setEditedLocation(text)} style={styles.editShiftInput} placeholder={location} />
                        <TextInput onChangeText={text=>setEditedPay(text)} style={styles.editShiftInput} placeholder={hourly_pay.toString()} />
                    
                    <Pressable style={styles.shiftSaveButton} onPress={()=>{editShift(id), setShowShiftEdit(!showShiftEdit)}}>
                            <Text style={styles.shiftSaveText}> Save Edits </Text>
                    </Pressable>
                    <Pressable style={styles.shiftDeleteButton} onPress={()=>deleteShift(id)}>
                        <Text style={styles.shiftDeleteText}>Delete Shift</Text>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.shiftItem}>
                    <Text style={styles.shiftTitle}>{job_category_name}</Text>
                    <Text style={styles.shiftText}>Start: {new Date(start_date_time).toUTCString()}</Text>
                    <Text style={styles.shiftText}>End: {new Date(start_date_time).toUTCString()}</Text>
                    <Text style={styles.shiftText}>{location}</Text>
                    <Text style={styles.shiftText}>${hourly_pay}/hr</Text>
                    <Pressable style={styles.shiftEditButton} onPress={()=>setShowShiftEdit(!showShiftEdit)}>
                        <Text style={styles.shiftEditText}>EDIT</Text>
                    </Pressable>
                </View>
            )}
        
        </SafeAreaView>
      )
}

export default MyShiftItems