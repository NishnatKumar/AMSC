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
    borderColor:'#6a37ff',
  },

  btn:{
        height:49,
        width:size.window.width-30,        
        marginHorizontal:15,
        borderRadius:9,
        marginVertical:5,
        
  },
  btnPurpal:{
    backgroundColor: '#6a37ff',
    // shadowColor:'#6a37ff',
    // shadowOpacity:1.0,
    // shadowOffset: {width:size.window.width-35,height:10},
    // shadowRadius:9
    shadowColor: '#6a37ff',
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
    backgroundColor: '#FF00DD',
    shadowColor: '#FF00DD',
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
    backgroundColor: '#FF00DD',
    shadowColor: '#FF00DD',
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
    color:'#c9c9c9',
    fontSize:20,
    fontWeight:'bold',

    elevation:5
  },
  placeholder:{alignSelf:'center',margin:5},
  formGroup:{margin:5,borderRadius:10},
  textPurpal:{
    color:'#FF00DD'
  },
  title:{color:'#000000',fontSize:25,fontWeight:'900',fontFamily:'ExpoConBol' },
  pickerGroup:{
    
  },
  errorBorder:{
    borderColor:'#ed002f'
  },
  Form:{paddingHorizontal:11},



  
  
  
};

  export default app;