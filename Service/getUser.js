
    
    _httpLogin = async (data) => {
  
        var connectionInfoLocal = '';
        NetInfo.getConnectionInfo().then((connectionInfo) => {
        
          if(connectionInfo.type == 'none'){
            console.log('no internet ');
           
            Global.MSG("No Internet ! ");
            return;
          }else{
           
          
            fetch(Global.API_URL+'login', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',   
                  'Content-Type':'application/json'   
                },
                body: JSON.stringify(data)
              }).then((response) =>response.json() )
              .then((responseJson) => {
                
                
                 if(responseJson.success){
                
                  this.setValues(responseJson.data)
                 }
                 else{
                   console.log(responseJson);
                  Global.MSG(responseJson.msg);
                   this.setState({
                     isLoading:false,
                     isUsernameError:true,
                     isPasswordError:true,
                     usernameErrorMsg:'Username May Be error',
                    passwordErrorMsg:'Password May be error'
    
                   });
     
                  
                 }
             })
             .catch((error) => {
    
    
              ToastAndroid.showWithGravityAndOffset(
                'Network Failed!!! Retrying...',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
              console.log('on error fetching:'+error);
              
            });
          }
        });
       
        }

export default _httpLogin;