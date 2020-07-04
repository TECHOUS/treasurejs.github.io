const darkBackground    = "#121212";
const lightBlack        = "#292b2c";
let nightModeButton     = false;
let map = new Map(JSON.parse(sessionStorage.getItem('compareSelected')))

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
        switchLightMode();
    }else{
        nightModeButton = true;
        document.getElementById('toggle-night').style.display = "none";
        let day = document.getElementById('toggle-day');
        day.style.display = "block";
        document.getElementById('toggle-div').style.backgroundColor = "rgb(139, 139, 255)";
        document.getElementById('toggle-div').style.color = "white";
        switchNightMode();
    }
}

function switchLightMode(){
    // LIGHT HEADER
    let header = document.getElementsByTagName('header')[0];
    header.style.backgroundColor = 'initial';
    header.style.color = 'initial';
    document.getElementById('header-div').style.backgroundColor = 'brown';
    document.getElementsByClassName('actionButtons')[0].style.backgroundColor = '#ccc';
    document.getElementsByClassName('actionButtons')[0].style.color = 'initial';

    let section = document.getElementsByTagName('section')[0];
    section.style.backgroundColor = 'initial';
    section.style.color = 'initial';
    document.getElementsByClassName('lowerSectionButton')[0].style.backgroundColor = '#ccc';
    document.getElementsByClassName('lowerSectionButton')[0].style.color = 'initial';

    // table
    document.getElementsByClassName('compareTable')[0].style.borderColor = 'brown';
    let boxes = document.getElementsByClassName('compareTableData');
    for(let i=0;i<boxes.length;i++){
        boxes[i].style.borderColor = 'brown';
    }
    let headerBoxes = document.getElementsByClassName('compareTableHeaderData');
    for(let i=0;i<headerBoxes.length;i++){
        headerBoxes[i].style.borderColor = 'brown';
        headerBoxes[i].style.backgroundColor = '#ccc';
    }
    let tableLinks = document.getElementsByClassName('tableLinks');
    for(let i=0;i<tableLinks.length;i++){
        tableLinks[i].style.color = 'blue';
    }

    // footer
    document.getElementsByTagName('footer')[0].style.backgroundColor = 'brown';
}

function switchNightMode(){
    // DARK HEADER
    let header = document.getElementsByTagName('header')[0];
    header.style.backgroundColor = darkBackground;
    header.style.color = 'white';
    document.getElementById('header-div').style.backgroundColor = lightBlack;
    document.getElementsByClassName('actionButtons')[0].style.backgroundColor = lightBlack;
    document.getElementsByClassName('actionButtons')[0].style.color = 'cyan';

    let section = document.getElementsByTagName('section')[0];
    section.style.backgroundColor = darkBackground;
    section.style.color = 'white';
    document.getElementsByClassName('lowerSectionButton')[0].style.backgroundColor = lightBlack;
    document.getElementsByClassName('lowerSectionButton')[0].style.color = 'cyan';

    // table
    document.getElementsByClassName('compareTable')[0].style.borderColor = 'white';
    let boxes = document.getElementsByClassName('compareTableData');
    for(let i=0;i<boxes.length;i++){
        boxes[i].style.borderColor = 'white';
    }
    let headerBoxes = document.getElementsByClassName('compareTableHeaderData');
    for(let i=0;i<headerBoxes.length;i++){
        headerBoxes[i].style.borderColor = 'white';
        headerBoxes[i].style.backgroundColor = lightBlack;
    }
    let tableLinks = document.getElementsByClassName('tableLinks');
    for(let i=0;i<tableLinks.length;i++){
        tableLinks[i].style.color = 'cyan';
    }

    // footer
    document.getElementsByTagName('footer')[0].style.backgroundColor = "#292b2c";
}

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

window.onload = () => {
    renderTable();
    autoDarkMode();
}

function renderTable(){
    let table = document.createElement('table');
    table.setAttribute("class", "compareTable");
    document.getElementById('root').appendChild(table);
    
    // render table header
    table.appendChild(renderTableHeader())

    map.forEach((value, key) => {
        if(map.get(key).selected){
            let row = renderTableRow(key, value);
            table.appendChild(row);
        }
    })
}

function renderTableHeader(){
    let tr = document.createElement('tr');
    tr.setAttribute("class", "compareTableRow");

    tr.appendChild(renderTableHeaderData('Library Name'));
    tr.appendChild(renderTableHeaderData('Version'));
    tr.appendChild(renderTableHeaderData('Stars'));
    tr.appendChild(renderTableHeaderData('Forks'));
    tr.appendChild(renderTableHeaderData('Issues'));
    tr.appendChild(renderTableHeaderData('PRs'));
    tr.appendChild(renderTableHeaderData('License'));
    tr.appendChild(renderTableHeaderData('Repo Size'));

    return tr;
}

function renderTableHeaderData(textData){
    let th = document.createElement('th');
    th.setAttribute('class', 'compareTableHeaderData');

    let textNode = document.createTextNode(textData);
    th.appendChild(textNode);
    return th;
}

function renderTableRow(libName, properties){
    let tr = document.createElement('tr');
    tr.setAttribute("class", "compareTableRow");

    let td = document.createElement('td');
    td.setAttribute('class', "compareTableData");

    let span = document.createElement('span');
    span.addEventListener('click', (e)=>{
        removeLibraryFromTable(e);
    })
    let minusIconI = document.createElement('i');
    minusIconI.setAttribute('class', 'fas fa-minus-circle');
    span.appendChild(minusIconI);
    td.appendChild(span);

    let a = document.createElement('a');
    a.setAttribute('href', properties.github);
    a.setAttribute('target','_blank');
    a.setAttribute('class', 'tableLinks');
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

// this function will remove the current row from the table
function removeLibraryFromTable(event){
    let libName = event.target.parentNode.parentNode.childNodes[1].firstChild.nodeValue;
    let row = event.target.parentNode.parentNode.parentNode;
    row.remove();
    map.delete(libName);
}

// add runtime selected map to session storage
function addCurrentLibsToSession(){
    sessionStorage.setItem('compareSelected', JSON.stringify(Array.from(map.entries())));
}