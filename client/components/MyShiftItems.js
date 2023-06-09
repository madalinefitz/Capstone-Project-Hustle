import React, {useContext, useState} from 'react'
import {Text, TextInput, Pressable, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from './AuthContext'


function MyShiftItems({job_category_name, job_category_id, start_date_time, hourly_pay, location, end_date_time, id}){
    
    const {userInfo, deleteShift, updateShift} = useContext(AuthContext)

    const [editedStartDT, setEditedStartDT] = useState(startFormat)
    const [editedEndDT, setEditedEndDT] = useState(endFormat)
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

    const editedCategory = (name) => {
        userInfo.job_categories.filter(c =>{
            if (c.category_name == name){
                setEditedJobId(c.id)
            }
        })
    }

    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit", 
        minute: "2-digit", 
        
      }

    const startSplit = start_date_time.split(' ')
    const startFormat = startSplit[0]+'T'+startSplit[1]+'Z'
    const startDT = new Date(startFormat).toLocaleString('en-US', dateOptions)

    const endSplit = end_date_time.split(' ')
    const endFormat = endSplit[0]+'T'+endSplit[1]+'Z'
    const endDT = new Date(endFormat).toLocaleString('en-US', dateOptions)
    
    return(
        <SafeAreaView>
            {showShiftEdit ? (
                <View style={styles.shiftItem}>
                        <TextInput onChangeText={text=>setEditedStartDT(text)} style={styles.editShiftInput} placeholder={startDT}/>
                        <TextInput onChangeText={text=>setEditedEndDT(text)} style={styles.editShiftInput} placeholder={endDT}/>
                        <TextInput onChangeText={text=>editedCategory(text)} style={styles.editShiftInput} placeholder={job_category_name} />
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
                    <Text style={styles.shiftText}>Start: {startDT}</Text>
                    <Text style={styles.shiftText}>End: {endDT}</Text>
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