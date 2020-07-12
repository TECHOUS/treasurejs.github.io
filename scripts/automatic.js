function autoDarkMode(){
    /**
     * automatic night mode according to hours
     * 
     * 7-18 - light
     * 0-6 , 19-23 - night
     **/
    let currentHours = new Date().getHours();
    if(currentHours>=7 && currentHours<=18){
        // automatic light mode
        nightModeButton = true;
        handleNightMode();
    }else{
        // automatic night mode
        nightModeButton = false;
        handleNightMode();
    }
}