import size from "./Layout";

const app = { errorMsg:{
    color:'red',
    fontSize:10,
    fontStyle:'italic',
  },
  borderError:{
    borderColor:'#fa0a3a',
    
  },
  borderPurpal:{
    borderColor:'#7BABEB', 
  },
  borderPink:{
    borderColor:'#f57aae'//'', 
  },

  textPink:{
    color:'#f57aae'
  },
  btn:{
        height:49,
        width:size.window.width-60,        
        marginHorizontal:15,
        borderRadius:9,
        marginVertical:5,      
        
  },
  btnPurple:{
    backgroundColor:'#7BABEB',// '#7BABEB',
    // shadowColor:'#7BABEB',
    // shadowOpacity:1.0,
    // shadowOffset: {width:size.window.width-35,height:10},
    // shadowRadius:9
    shadowColor: '#7BABEB',
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,

    // for Android
    elevation: 5,
  },
  btnPink:{
    backgroundColor: '#f57aae',
    shadowColor: '#f57aae',
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    // for Android
    elevation: 5,
  },
  btnPink:{
    backgroundColor: '#f57aae',
    shadowColor: '#f57aae',
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    // for Android
    elevation: 5,
  },
  btnGray:{
    color:'#CFD5E3',
    fontSize:20,
    fontWeight:'bold',

    elevation:5
  },
  placeholder:{alignSelf:'center',margin:5},

  formGroup:{margin:5,borderRadius:10,width:size.window.width-60,},
  
  textPurpal:{
    color:'#f57aae'
  },
  title:{color:'#000000',fontSize:25,fontWeight:'900',fontFamily:'ExpoConBol' },
  pickerGroup:{
    
  },
  errorBorder:{
    borderColor:'#ed002f'
  },
  Form:{
 marginTop:5,padding:20,alignItems:'center'
  },
  btnTitle:{color:'#ffffff',fontSize:20,fontWeight:'900',fontFamily:'ExpoConBol'},

  // Text color

  textGray:{
    color:'#CFD5E3'
  }

  
  
  
};

  export default app;