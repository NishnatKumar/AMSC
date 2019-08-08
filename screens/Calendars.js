import React, { Component } from 'react'
import {View, Container, Content, Card, CardItem, Body, Left, Right,Text, Title} from 'native-base';
import {Calendar, CalendarList, Agenda,LocaleConfig} from 'react-native-calendars';
import {AsyncStorage,NetInfo} from 'react-native';
import Headers from './Headers';
import app from '../constants/app';
import Global from '../constants/Global';


export default class CalendarScreen extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {

            markedDates:{
                            '2019-08-16': {selected: true, marked: true, selectedColor: 'blue'},
                            '2019-08-12': {marked: true},
                            '2019-08-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                            '2019-08-17': {disabled: true, disableTouchEvent: true}
                        },

            day:[],

        }
    }
    
    componentDidMount()
    {
        LocaleConfig.locales.en = LocaleConfig.locales[''];
    LocaleConfig.locales['en'] = {
        monthNames: ["January" , "February" , "March" , "April", "May",
        "June", "July", "August", "September", "October",
        "November", "December"],
        monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'],
        dayNames: [ 'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                            'Saturday'],
        dayNamesShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
       
      };
      LocaleConfig.defaultLocale = 'en';

      this._httpGetUserProfile();

    }

    
_httpGetUserProfile = async () => {
   
    let token =  await AsyncStorage.getItem('userToken');
    let user = await AsyncStorage.getItem('userDetails');
    const { navigation } = this.props;
    const value = navigation.getParam('id', null);
    
    let url;
    let body
       
      
      if(value!=null)
      {
        this.setState({userID:value});
        console.log("USer ID from other : ",this.state.userID);
       url = Global.API_URL+'attendance-show';
       body =JSON.stringify({id:this.state.userID})
      }
      else if(user != null){
        user = JSON.parse(user);
       
        console.log("User value ",typeof user)
        user = user.id;
        this.setState({userID:user});
        url = Global.API_URL+'attendance-history';
        /**TODO: Uncomment this */
        // body=JSON.stringify({userID:user})
        body=JSON.stringify({userID:173})
      }
      else{
        console.log("Nothing to use");
        return;
      }
      
  
    
      
  
      console.log('yes internet '+Global.API_URL+'attendance-history Data : ',{userID:this.state.userID}); 
   
  
    var connectionInfoLocal = '';
    NetInfo.getConnectionInfo().then((connectionInfo) => {
     
      if(connectionInfo.type == 'none'){
        console.log('no internet ');
      Global.MSG("No Internet !");
        return;
      }else{
        // console.log('yes internet '+Global.API_URL+'attendance-history Data : '+JSON.stringify(body)); 
        this.setState({
          isLoding:true,
        });
        fetch(url, {
          method:'POST',
          headers: {
              'Accept': 'application/json',   
              "Content-Type": "application/json",
              "Authorization":'Bearer '+ token,             
            },
          body:body
  
  
  
          }).then((response) =>response.json() )
          .then((responseJson) => {
            // var itemsToSet = responseJson.data;
          console.log('of Get PRofile resp :',responseJson);
             if(responseJson.success)
             {
                // console.log(responseJson.data);
                this.setState({isLoading:false});
                this.setData(responseJson.data.data);
             }
             else
             {
                console.log('User Not found ');
                this.setState({isLoading:false});
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
          //  this._httpSignUp(data);
        });
      }
    });
    console.log(connectionInfoLocal);
  }

  setData(data)
  {
    // console.log("DAta : ",data);
    temp={}
    data.forEach(element => {
        temp[element.Date] = {selected: true, marked: true, selectedColor: '#63a63a',in:element.in,out:element.out}
    });

    this.setState({markedDates:temp});

  }

    
  static navigationOptions = {
            header: null
    }

    render()
    {
        return(
            <Container style={{backgroundColor:'#bfbfbf'}}>
            <Headers title="History"/>
                <Content>
                    <Card>
                        
                                        <Calendar
                                            // Initially visible month. Default = Date()
                                            // current={'2012-03-01'}
                                            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                                            // minDate={'2012-05-10'}
                                            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                                            //  maxDate={'2012-05-30'}
                                            // Handler which gets executed on day press. Default = undefined
                                            onDayPress={(day) => {console.log('selected day', day)}}
                                            // Handler which gets executed on day long press. Default = undefined
                                            onDayLongPress={(day) => {console.log('selected day', day)}}
                                            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                                            monthFormat={'MM yyyy '}
                                            // Handler which gets executed when visible month changes in calendar. Default = undefined
                                            onMonthChange={(month) => {console.log('month changed', month)}}
                                            // Hide month navigation arrows. Default = false
                                            // hideArrows={true}
                                            // Replace default arrows with custom ones (direction can be 'left' or 'right')
                                            // renderArrow={(direction) => (<Arrow />)}
                                            // Do not show days of other months in month page. Default = false
                                            hideExtraDays={true}
                                            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                                            // day from another month that is visible in calendar page. Default = false
                                            // disableMonthChange={true}
                                            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                                            firstDay={1}
                                            // Hide day names. Default = false
                                            // hideDayNames={true}
                                            // Show week numbers to the left. Default = false
                                            // showWeekNumbers={true}
                                            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                                            onPressArrowLeft={substractMonth => substractMonth()}
                                            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                                            onPressArrowRight={addMonth => addMonth()}
                                            markedDates={this.state.markedDates}
                                            />
                                
                    </Card>
                    <Card style={{margin:10}} transparent>
                        <CardItem transparent>
                            <Left>
                                <Card transparent>
                                    <View style={{backgroundColor:'#f72576',padding:1,borderRadius:100}}><Title></Title></View>
                                    <Text>Absent</Text>
                                </Card>
                               
                            </Left>
                            <Body>
                                {/* <Card transparent>
                                    <View style={{backgroundColor:'#f72576',padding:10,borderRadius:50}}><Title>54</Title></View>
                                    <Text>Absent</Text>
                                </Card> */}
                            </Body>
                            <Right>
                                <Card transparent>
                                    <View style={{backgroundColor:'#63a63a',padding:1,borderRadius:100}}><Title></Title></View>
                                    <Text>Ful Day</Text>
                                </Card>
                            </Right>
                        </CardItem>
                    </Card>

                   
                    {/* <Card style={{margin:10}}>
                        <Text style={{color:'#000000',padding:10,fontSize:15,fontWeight:'900'}}>Enrolled :</Text>
                        <Text style={{color:'#b9bab8',padding:10,fontSize:15,}}>Present Day : 10 </Text>
                        <Text style={{color:'#b9bab8',padding:10,fontSize:15,}}>Absent Day : 1 </Text>

                    </Card> */}

                    
                  

                   
{/*                                                     
                                <Agenda
                                // the list of items that have to be displayed in agenda. If you want to render item as empty date
                                // the value of date key kas to be an empty array []. If there exists no value for date key it is
                                // considered that the date in question is not yet loaded
                                items={{
                                    '2012-05-22': [{text: 'item 1 - any js object'}],
                                    '2012-05-23': [{text: 'item 2 - any js object'}],
                                    '2012-05-24': [],
                                    '2012-05-25': [{text: 'item 3 - any js object'},{text: 'any js object'}]
                                }}
                                // callback that gets called when items for a certain month should be loaded (month became visible)
                                loadItemsForMonth={(month) => {console.log('trigger items loading')}}
                                // callback that fires when the calendar is opened or closed
                                onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
                                // callback that gets called on day press
                                onDayPress={(day)=>{console.log('day pressed')}}
                                // callback that gets called when day changes while scrolling agenda list
                                onDayChange={(day)=>{console.log('day changed')}}
                                // initially selected day
                                selected={'2012-05-16'}
                                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                                minDate={'2012-05-10'}
                                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                                maxDate={'2012-05-30'}
                                // Max amount of months allowed to scroll to the past. Default = 50
                                pastScrollRange={50}
                                // Max amount of months allowed to scroll to the future. Default = 50
                                futureScrollRange={50}
                                // specify how each item should be rendered in agenda
                                renderItem={(item, firstItemInDay) => {return (<View />);}}
                                // specify how each date should be rendered. day can be undefined if the item is not first in that day.
                                renderDay={(day, item) => {return (<View />);}}
                                // specify how empty date content with no items should be rendered
                                renderEmptyDate={() => {return (<View />);}}
                                // specify how agenda knob should look like
                                renderKnob={() => {return (<View />);}}
                                // specify what should be rendered instead of ActivityIndicator
                                renderEmptyData = {() => {return (<View />);}}
                                // specify your item comparison function for increased performance
                                rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
                                // Hide knob button. Default = false
                                hideKnob={true}
                                // By default, agenda dates are marked if they have at least one item, but you can override this if needed
                                markedDates={{
                                    '2012-05-16': {selected: true, marked: true},
                                    '2012-05-17': {marked: true},
                                    '2012-05-18': {disabled: true}
                                }}
                                // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
                                onRefresh={() => console.log('refreshing...')}
                                // Set this true while waiting for new data from a refresh
                                refreshing={false}
                                // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
                                refreshControl={null}
                                // agenda theme
                                theme={{
                                    ...calendarTheme,
                                    agendaDayTextColor: 'yellow',
                                    agendaDayNumColor: 'green',
                                    agendaTodayColor: 'red',
                                    agendaKnobColor: 'blue'
                                }}
                                // agenda container style
                                style={{}}
                                /> */}
                </Content>
            </Container>
        )
    }
    
}

const calendarTheme={
    arrowColor: 'white',
    'stylesheet.calendar.header': {
      week: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
    }
  }