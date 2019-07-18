function Time(){
    var time = new Date().getDate();

       
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var day = new Date().getUTCDay();

    if( 10  >hours  )
    {
       
        hours = '0'+ hours;
    }

    if(min < 10)
    {
        min = '0'+ min;
    }

    if(sec < 10)
    {
        sec = '0'+ sec;
    }

   

    console.log("Hours : "+hours+" Min : "+min+" Sec" + sec );

   return  hours + ' : ' +min+' : '+sec; 

   

}

export default Time;