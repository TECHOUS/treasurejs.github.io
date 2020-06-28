const darkBackground    = "#121212";
const lightBlack        = "#292b2c";
let nightModeButton     = false;

function handleNightMode(event)
{
    if(nightModeButton)                                              // light mode
    {
        nightModeButton = false;
        let night = document.getElementById('toggle-night');
        night.style.display = "block";
        document.getElementById('toggle-day').style.display = "none";
        document.getElementById('toggle-div').style.backgroundColor = "#ccc";
        document.getElementById('toggle-div').style.color = "black";
        // switchLightMode();
    }else{
        nightModeButton = true;
        document.getElementById('toggle-night').style.display = "none";
        let day = document.getElementById('toggle-day');
        day.style.display = "block";
        document.getElementById('toggle-div').style.backgroundColor = "rgb(139, 139, 255)";
        document.getElementById('toggle-div').style.color = "white";
        // switchNightMode();
    }
}
