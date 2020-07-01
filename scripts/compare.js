const darkBackground    = "#121212";
const lightBlack        = "#292b2c";
let nightModeButton     = false;

// handles night mode functionality
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

window.onload = () => {
    renderTable();
}

function renderTable(){
    let map = new Map(JSON.parse(sessionStorage.getItem('compareSelected')))
    
    let table = document.createElement('table');
    table.setAttribute("class", "compareTable");
    document.getElementById('root').appendChild(table);

    map.forEach((value, key) => {
        if(map.get(key).selected){
            let row = renderTableRow(key, value);
            table.appendChild(row);
        }
    })
}

function renderTableRow(libName, properties){
    let tr = document.createElement('tr');
    tr.setAttribute("class", "compareTableRow");

    let td = document.createElement('td');
    td.setAttribute('class', "compareTableData");

    let a = document.createElement('a');
    a.setAttribute('href', properties.github);
    td.appendChild(a);
    let text1 = document.createTextNode(libName);
    a.appendChild(text1);

    let parsedUrl = properties.github.substring(18).split('/');      
    let username = parsedUrl[1];
    let reponame = parsedUrl[2];

    tr.appendChild(td);
    tr.appendChild(
        renderTableData(
            "GitHub Release",
            "https://img.shields.io/github/tag/" + username + "/" + reponame +".svg"
        )
    );
    tr.appendChild(
        renderTableData(
            "GitHub stars",
            "https://img.shields.io/github/stars/" + username + "/" + reponame +".svg?style=social"
        )
    );
    tr.appendChild(
        renderTableData(
            "GitHub forks",
            "https://img.shields.io/github/forks/" + username + "/" + reponame +".svg?style=social"
        )
    );
    tr.appendChild(
        renderTableData(
            "GitHub issues",
            "https://img.shields.io/github/issues/" + username + "/" + reponame +".svg"
        )
    );
    tr.appendChild(
        renderTableData(
            "GitHub pull requests", 
            "https://img.shields.io/github/issues-pr/" + username + "/" + reponame +".svg"
        )
    )
    tr.appendChild(
        renderTableData(
            "GitHub license",
            "https://img.shields.io/github/license/" + username + "/" + reponame +".svg"
        )
    )
    tr.appendChild(
        renderTableData(
            "GitHub repo size",
            "https://img.shields.io/github/repo-size/" + username + "/" + reponame +".svg"
        )
    )
    return tr;
}

function renderTableData(alt, src){
    let td = document.createElement('td');
    td.setAttribute('class', "compareTableData");
    let badge = document.createElement('img');
    badge.setAttribute("alt", alt);
    badge.setAttribute("src", src);
    td.appendChild(badge);
    return td;
}