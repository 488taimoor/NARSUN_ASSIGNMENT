
import {device_Actions} from '../constants/devices'
import store from '../store/index'
import {ROOT_URL} from '../constants/config';

export const DevicesServer = {
    handleAddDevice,
    getDevicesList,
    handleUpdateDevice,
    handleDelete
}

export function getDevicesList()
{
  var token = localStorage.getItem('userToken')
  console.log('here is token', token)
  

      const Request =  fetch(ROOT_URL+'/api/getDeviceList', {
          method: 'POST',
         headers: {'Content-Type':'application/json;charset=UTF-8','Authorization':token},
           mode: 'cors',
     }).then((response)=>{
      console.log('********'+response);
      response.json().then(data=>{
        console.log("device list data:......",data )
        if(data.status=='success'){
          store.dispatch({type:device_Actions.device_List.SUCCESS,payload:data.data});
          return ;
        }else if(data.status=='failure') {
          store.dispatch({type:device_Actions.device_List.FAILURE,payload:data.err});
          return ;
        }
      })
    }).catch(()=>{
      return {type:device_Actions.device_List.NETWORK_FAILURE};
     })



return {type:device_Actions.device_List.POST};

};


export function handleAddDevice(DeviceData)
{
  var token = localStorage.getItem('userToken')
  console.log('here is token', token)
    var formData = new FormData();
    formData.append('photo', DeviceData.imageUrl);
  const postRequest =  fetch(ROOT_URL+'/uploadFile', {
        method: 'POST',
         mode: 'cors',
        body: formData
   }).then((response)=>{
    console.log('********',response);
    response.json().then(data=>{
      console.log("data:......", data )
      console.log(data);
      if(data.status=='uploaded'){
        let imagePath = ROOT_URL+'/'+data.imageData.originalname
      console.log('here is URI Path', imagePath)
      DeviceData.imageUrl=imagePath
      console.log('Complete data',DeviceData )


      var dataset = JSON.stringify(DeviceData)
      const updateRequest =  fetch(ROOT_URL+'/api/addDevice', {
          method: 'post',
         headers: {'Content-Type':'application/json;charset=UTF-8','Authorization':token},
           mode: 'cors',
          body: dataset
     }).then((response)=>{
      console.log('********'+response.status);
      response.json().then(data=>{
        console.log(" new device data:......",data )
        if(data.status=='success'){
          store.dispatch({type:device_Actions.device_List.ADD_SUCCESS,payload:data.data});
          return ;
        }else if(data.status=='failure') {
          store.dispatch({type:device_Actions.device_List.FAILURE,payload:data.err});
          return ;
        }
      })
    })






      }else{

      }
      
    

     });
   }).catch(()=>{
    return {type:device_Actions.device_List.NETWORK_FAILURE};
   })


return {type:device_Actions.device_List.SUCCESS};

};

export function handleUpdateDevice(DeviceData)
{
  var token = localStorage.getItem('userToken')
  console.log('here is token', token)
    var formData = new FormData();
    formData.append('photo', DeviceData.imageUrl);
  const postRequest =  fetch(ROOT_URL+'/uploadFile', {
        method: 'POST',
         mode: 'cors',
        body: formData
   }).then((response)=>{
    console.log('********',response);
    response.json().then(data=>{
      console.log("data:......", data )
      console.log(data);
      if(data.status=='uploaded'){
        let imagePath = ROOT_URL+'/'+data.imageData.originalname
      console.log('here is URI Path', imagePath)
      DeviceData.imageUrl=imagePath
      console.log('Complete data',DeviceData )


      var dataset = JSON.stringify(DeviceData)
      const updateRequest =  fetch(ROOT_URL+'/api/UpdateDevice', {
          method: 'post',
         headers: {'Content-Type':'application/json;charset=UTF-8','Authorization':token},
           mode: 'cors',
          body: dataset
     }).then((response)=>{
      console.log('********'+response.status);
      response.json().then(data=>{
        console.log(" new device data:......",data )
        if(data.status=='success'){
          store.dispatch({type:device_Actions.device_List.EDIT_SUCCESS,payload:data.data});
          return ;
        }else if(data.status=='failure') {
          store.dispatch({type:device_Actions.device_List.FAILURE,payload:data.err});
          return ;
        }
      })
    })
      }
      
    

     });
   }).catch(()=>{
    return {type:device_Actions.device_List.NETWORK_FAILURE};
   })


return {type:device_Actions.device_List.SUCCESS};

};

export function handleDelete(id)
{
  var token = localStorage.getItem('userToken')
  console.log('here is token', token)
   var deviceId ={'_id':id}

      const Request =  fetch(ROOT_URL+'/api/DeleteDevice', {
          method: 'POST',
         headers: {'Content-Type':'application/json;charset=UTF-8','Authorization':token},
           mode: 'cors',
           body: JSON.stringify(deviceId)
     }).then((response)=>{
      console.log('********'+response);
      response.json().then(data=>{
        console.log("device list data:......",data )
        if(data.status=='success'){
          store.dispatch({type:device_Actions.device_List.DELETE_SUCCESS,payload:data.data});
          return ;
        }else if(data.status=='failure') {
          store.dispatch({type:device_Actions.device_List.FAILURE,payload:data.err});
          return ;
        }
      })
    }).catch(()=>{
      return {type:device_Actions.device_List.NETWORK_FAILURE};
     })



return {type:device_Actions.device_List.SUCCESS};

};


