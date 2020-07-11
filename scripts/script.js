let flag                = false;                                                             
const darkBackground    = "#121212";
const lightBlack        = "#292b2c";
let nightModeButton     = false;
let database            = [];                                       // working database
let linkedObjectData    = [];                                       // data array that comes after linking the js files
let iconMap             = new Map();
let selectedLibCount    = iconMap.size;
let recentSearchesMap   = new Map();

(function () {
    if(localStorage.getItem('treasureHistory')===null 
        || localStorage.getItem('treasureHistory') === ''){
            recentSearchesMap = new Map();            
    }else{
        recentSearchesMap = new Map(JSON.parse(localStorage.getItem('treasureHistory')));
    }
    if(sessionStorage.getItem('compareSelected')===null 
        || sessionStorage.getItem('compareSelected')===''){
            iconMap = new Map();
    }else{
        iconMap = new Map(JSON.parse(sessionStorage.getItem('compareSelected')));
        selectedLibCount = iconMap.size;
    }
})();

/** 
 * called when window is loaded
 **/
window.onload = function(){
    addRecentSearchesToDom();
    addRecentlyComparedToDOM();
    updateSelectedCount();
    autoDarkMode();
}

/**
 * This function will be called when key is pressed
 * create script node and add to html dom
 * 
 * @param e for event
 **/
function search(e) 
{
    if((e.keyCode>=37 && e.keyCode<=40) || e.keyCode===32)                              // when arrow keys are used
    {
        return;
    }

    syncDatabase();
    const key = document.getElementById('section-div-input').value.trim();
    let firstValue = key.charAt(0).toUpperCase();
    
    if(!isNaN(parseInt(firstValue)))
    {
        alert("we don't index libraries with numbers");
        return;
    } 

    if ((key.length == 1 || key.length == 2) && !flag)                                   // add script node when one digit is entered
    {
        flag=true;    
        addScriptToDom(firstValue);
        
        setTimeout(function(){
            linkData(firstValue, function(){
                filterData(key);
                addToDOM();
            });
        },100);
    }
    else if((key==="" || key.length==0) && flag)                    // remove script node
    {
        flag=false;
        removeScriptFromDom();
        eraseDataList();
        hideSearchResults();
        showRecentSearches();
        showRecentlyComparedSection();
        clearRecentSearchDom();        
        addRecentSearchesToDom();
        database=[];
        return;
    }

    if(key==="")                                                    // if user press enter with no search content
    {
        return;
    }

    filterData(key);
    addToDOM();
}

/**
 * it will clear the local storage
 **/
function clearLocalStorage()
{
    localStorage.setItem('treasureHistory','[]');
}

/**
 * it will clear the session storage
 **/
function clearSessionStorage(){
    sessionStorage.setItem('compareSelected','[]');
}

/**
 * this function will clear the number of elements in the list
 **/
function clearRecentSearchDom()
{
    let search = document.getElementById('recent-searches');
    if(recentSearchesMap.size <= 0){
        return;
    }
    if(search.hasChildNodes){
        search.removeChild(search.childNodes[5]);
    }
}

/**
 * this function will clear the number of elements in the 
 * recently search list
 **/
function clearRecentlyComparedDOM(){
    let recentlyComparedRoot = document.getElementById('recentlyComparedRoot');
    if(iconMap.size <= 0){
        return;
    }
    if(recentlyComparedRoot.hasChildNodes){
        recentlyComparedRoot.removeChild(recentlyComparedRoot.childNodes[1])
    }
}

/**
 * it will add recentReachesMap to dom
 **/
function addRecentSearchesToDom()
{
    let search = document.getElementById('recent-searches');
    
    if(recentSearchesMap.size > 0)
    {
        let ul = document.createElement('ul');
        ul.setAttribute('id','search-results-list');
        search.appendChild(ul);

        recentSearchesMap.forEach((value, key) => {
            let li = document.createElement('li');
            li.setAttribute("class", "recentSearchItem");
            let text = document.createTextNode(key);
            
            let label = document.createElement('label');
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type','checkbox');
            checkbox.setAttribute('class','history-checkbox');

            checkbox.addEventListener('click',function(event){
                let check = event.srcElement.checked;
                let node = event.srcElement.parentNode.parentNode;
                
                check ?
                    nightModeButton ? 
                        node.style.backgroundColor = darkBackground 
                            : node.style.backgroundColor = "brown"
                    : node.style.backgroundColor = "initial";
                
                nightModeButton ? 
                    node.style.color = "cyan" : 
                    node.style.color = check ? "white" : "black";
                check ? recentSearchesMap.set(key, false) : recentSearchesMap.set(key, true); 
            })

            label.appendChild(checkbox);
            label.appendChild(text);
            li.appendChild(label);
            ul.appendChild(li);
        })
        
        nightModeButton ? recentSearchNightMode() : recentSearchLightMode();    
    }
}

function addRecentlyComparedToDOM(){
    let recentlyComparedRoot = document.getElementById('recentlyComparedRoot');
    if(iconMap.size > 0){
        let ul = document.createElement('ul');
        ul.setAttribute('id', 'recentlyComparedList');
        recentlyComparedRoot.appendChild(ul);

        iconMap.forEach((value, key) => {
            let li = document.createElement('li');
            li.setAttribute("class", "recentlyComparedItem");
            
            let text = document.createTextNode(key);
            let a = document.createElement('a');
            a.setAttribute('href', value.github);
            a.setAttribute('class', 'recentlyComparedLink');
            a.setAttribute('target','_blank');

            let checkbox = document.createElement('input');
            checkbox.setAttribute('type','checkbox');
            checkbox.setAttribute('class','recentlyComparedCheckBox');

            checkbox.addEventListener('click',function(event){
                let check = event.srcElement.checked;
                let node = event.srcElement.parentNode;
                check ?
                    nightModeButton ? 
                        node.style.backgroundColor = darkBackground 
                            : node.style.backgroundColor = "brown"
                    : node.style.backgroundColor = "initial";
                
                node.childNodes[1].style.color = 
                    nightModeButton ? 'cyan' : check ? 'white' : 'black'; 

                value.selected = !value.selected
                iconMap.set(key, value);
            })

            a.appendChild(text);
            li.appendChild(checkbox);
            li.appendChild(a);
            ul.appendChild(li);
        })

        nightModeButton ? recentlyComparedNightMode() : recentlyComparedLightMode();
    }
}

function recentlyComparedNightMode(){
    let recentlyComparedList = document.getElementById('recentlyComparedList');
    if(recentlyComparedList!==null){
        recentlyComparedList.style.backgroundColor = lightBlack;
        recentlyComparedList.style.border = "1px solid white";
        let links = document.getElementsByClassName('recentlyComparedLink');
        for(let i=0;i<links.length;i++){
            let check = links[i].parentNode.childNodes[0].checked;
            links[i].parentNode.style.backgroundColor = check ? darkBackground : lightBlack;
            links[i].style.color = "cyan";
        }
    }
}

function recentlyComparedLightMode(){
    let recentlyComparedList = document.getElementById('recentlyComparedList');
    if(recentlyComparedList!==null){
        recentlyComparedList.style.backgroundColor = "#f89494";
        recentlyComparedList.style.border = "1px solid yellow";
        let links = document.getElementsByClassName('recentlyComparedLink');
        for(let i=0;i<links.length;i++){
            let check = links[i].parentNode.childNodes[0].checked;
            links[i].parentNode.style.backgroundColor = check ? "brown" : "#f89494";
            links[i].style.color = check ? 'white' : 'black';
        }
    }
}

/**
 * it will create new script tag and prepend to the dom
 **/
function addScriptToDom(firstValue)
{
    let filename = "scripts/" + firstValue + ".js";
    let script1 = document.createElement('script');                         // sample script element
    let root = document.getElementById('root');                             // for refering body node
    script1.setAttribute("src", filename);
    try
    {
        root.prepend(script1);                                              // append script tag according to firstname
    }
    catch(err){}
}

/**
 * it will remove the first script node from the body
 **/
function removeScriptFromDom()
{
    let root = document.getElementById('root');                             // for refering body node
    try
    {
        root.removeChild(root.firstChild);
    }
    catch(err){}
}

/**
 * this function will add the data from html dom to runtime database
 * plus delete the child nodes of found-data
 * this function is used for correct name search
 **/
function syncDatabase()
{
    var array = document.getElementsByClassName('data-card');               // get datacards array
    for(let i=0;i<array.length;i++)
    {
        var object = {                                              
            name: "",
            description:"",
            github:"",
            website:"",
            docs:"",
            other: []
        }

        let arr = array[i].childNodes;                                      // get datacard's data in arr
        for(let j=0;j<arr.length;j++)
        {
            switch(j)
            {
                case 0:
                    object.name = arr[j].firstChild.nodeValue;
                    break;
                case 1:
                    object.description = arr[j].firstChild.nodeValue;
                    break;
                case 2:
                    var listarr = arr[j].childNodes;
                    for(let k=0;k<listarr.length;k++)
                    {
                        if(k%2!=0)
                        {
                            if(listarr[k].lastChild.firstChild.nodeValue=='GITHUB')
                            {
                                object.github = listarr[k].lastChild.href;
                            }
                            else if(listarr[k].lastChild.firstChild.nodeValue=='WEBSITE')
                            {
                                object.website = listarr[k].lastChild.href;
                            }
                            else if(listarr[k].lastChild.firstChild.nodeValue=='DOCS')
                            {
                                object.docs = listarr[k].lastChild.href;
                            }
                        }
                    }
                    break;
                case 3:
                    let links = arr[j].childNodes;
                    for(let k=0;k<links.length;k++)
                    {
                        if(k%2!=0)
                        {
                            let pair = {
                                name: "",
                                link: ""
                            }
                            pair.name = links[k].firstChild.lastChild.nodeValue;
                            pair.link = links[k].firstChild.href;
                            object.other.push(pair);
                        }
                    }
                    break;
            }
        }
        database.push(object);
    }
    eraseDataList(); 
}

/**
 * This function will erase all the data list items from the dom
 **/
function eraseDataList()
{
    let founddata = document.getElementById('found-data');

    var child = founddata.lastElementChild;  
    while (child) {                                                             // remove all nodes from the found data
        founddata.removeChild(child); 
        child = founddata.lastElementChild; 
    }
}

/**
 * This function will link the data from files
 * 
 * @param firstValue first char entered by the user
 * @callback fun for doing the work after linking
 **/
function linkData(firstValue, callback) 
{
    switch (firstValue) {
        case 'A':
            linkedObjectData = Adata;
            break;
        case 'B':
            linkedObjectData = Bdata;
            break;
        case 'C':
            linkedObjectData = Cdata;
            break;
        case 'D':
            linkedObjectData = Ddata;
            break;
        case 'E':
            linkedObjectData = Edata;
            break;
        case 'F':
            linkedObjectData = Fdata;
            break;
        case 'G':
            linkedObjectData = Gdata;
            break;
        case 'H':
            linkedObjectData = Hdata;
            break;
        case 'I':
            linkedObjectData = Idata;
            break;
        case 'J':
            linkedObjectData = Jdata;
            break;
        case 'K':
            linkedObjectData = Kdata;
            break;
        case 'L':
            linkedObjectData = Ldata;
            break;
        case 'M':
            linkedObjectData = Mdata;
            break;
        case 'N':
            linkedObjectData = Ndata;
            break;
        case 'O':
            linkedObjectData = Odata;
            break;
        case 'P':
            linkedObjectData = Pdata;
            break;
        case 'Q':
            linkedObjectData = Qdata;
            break;
        case 'R':
            linkedObjectData = Rdata;
            break;
        case 'S':
            linkedObjectData = Sdata;
            break;
        case 'T':
            linkedObjectData = Tdata;
            break;
        case 'U':
            linkedObjectData = Udata;
            break;
        case 'V':
            linkedObjectData = Vdata;
            break;
        case 'W':
            linkedObjectData = Wdata;
            break;
        case 'X':
            linkedObjectData = Xdata;
            break;
        case 'Y':
            linkedObjectData = Ydata;
            break;
        case 'Z':
            linkedObjectData = Zdata;
            break;
        default:
            break;
    }

    if(database.length!=0)                                          // erase database
    {
        database = [];
    }

    callback();
}

/**
 * This function will filter the data linked in linkedObjectData and put it into database
 * 
 * @param key for search key
 **/
function filterData(key)
{
    database = [];                                                                  // reset runtime database
    let index = key.length;
    for (let i = 0; i < linkedObjectData.length; i++)                               // add filter objects data to database 
    {
        if (linkedObjectData[i].name.substring(0, index) === key.toUpperCase()) 
        {
            database.push(linkedObjectData[i]);
        }
    }
    hideRecentSearches();
    hideRecentlyComparedSection();
    showSearchResults();
    updateSearchCount(database.length);
}

/**
 * it will show search results div in div
 **/
function showSearchResults()
{
    document.getElementById('search-actions').style.display = "block";
}

/**
 * it will hide the search result div from the div
 **/
function hideSearchResults()
{
    document.getElementById('search-actions').style.display = "none";
}

/**
 * it will hide recent searches div
 **/
function hideRecentSearches()
{
    document.getElementById('recent-searches').style.display = "none";
}

/**
 * it will show recent searches div in dom
 **/
function showRecentSearches()
{
    document.getElementById('recent-searches').style.display = "block";
}

/**
 * Hides the recently compared section
 */
function hideRecentlyComparedSection(){
    document.getElementById('recentlyComparedSection').style.display = "none";
}

/**
 * Show the recently compared section
 */
function showRecentlyComparedSection(){
    document.getElementById('recentlyComparedSection').style.display = "block";
}

/**
 * it will update the search count when a key is searched
 * 
 * @param count for rotating the exact count
 **/
function updateSearchCount(count)
{
    let i = 0;
    let x = setInterval(function(){
        document.getElementById('search-count').innerHTML = i;
        i++;
        if(i>count)
        {
            clearInterval(x);
        }
    },10);
}

const createDOMIcons = (libraryName) => {
    let addLibraryIconSpan = document.createElement('span');
    addLibraryIconSpan.setAttribute("class","addLibraryIcon");
    
    let plusIconSpan = document.createElement('span');
    plusIconSpan.setAttribute("class", "plusIcon");

    let plusIconI = document.createElement('i');
    plusIconI.setAttribute('class', 'fas fa-plus-circle');
    plusIconSpan.appendChild(plusIconI);
    addLibraryIconSpan.appendChild(plusIconSpan);

    let minusIconSpan = document.createElement('span');
    minusIconSpan.setAttribute("class", "minusIcon");

    let minusIconI = document.createElement('i');
    minusIconI.setAttribute('class', 'fas fa-minus-circle');
    minusIconSpan.appendChild(minusIconI);

    addLibraryIconSpan.appendChild(minusIconSpan);

    if(iconMap.has(libraryName) && iconMap.get(libraryName).selected){
        plusIconSpan.style.display = "none";
        minusIconSpan.style.display = "inline";
    }else{
        plusIconSpan.style.display = "inline";
        minusIconSpan.style.display = "none";
    }

    return addLibraryIconSpan;
}

function addFunctionsToIcons(){
    let addLibraryIcons = document.getElementsByClassName('addLibraryIcon');
    for(let i=0;i<addLibraryIcons.length;i++){
        addLibraryIcons[i].addEventListener('click', (event)=>{
            let nodes = event.target.parentNode.parentNode.parentNode.childNodes;
            let iconNodes = event.target.parentNode.parentNode.childNodes;
            
            // toggle
            if(iconMap.has(nodes[1].nodeValue.trim()) 
                && iconMap.get(nodes[1].nodeValue.trim()).selected ){
                iconMap.delete(nodes[1].nodeValue.trim());
                selectedLibCount--;
            }else{
                iconMap.set(nodes[1].nodeValue.trim(), {
                    selected: true,
                    github: event.target.parentNode.parentNode.parentNode.parentNode.childNodes[2].childNodes[0].firstChild.href
                });
                selectedLibCount++;
            }

            if(iconMap.has(nodes[1].nodeValue.trim()) 
                && iconMap.get(nodes[1].nodeValue.trim()).selected){
                iconNodes[0].style.display = "none";
                iconNodes[1].style.display = "inline";
            }else{
                iconNodes[0].style.display = "inline";
                iconNodes[1].style.display = "none";
            }
            updateSelectedCount()
        })
    };
}

// this function will update the selected lib count
function updateSelectedCount(){
    let selectedLib = document.getElementById('selectedLib');
    selectedLib.innerHTML = selectedLibCount;
}

// add runtime selected map to session storage
function addSelectedToSession(){
    // reset the selected to true if user just select, search and compare
    iconMap.forEach((value,key) => {
        iconMap.set(key, {...value,selected: true});
    })
    sessionStorage.setItem('compareSelected', JSON.stringify(Array.from(iconMap.entries())));
}

/**
 * This function will add 
 * runtime database to HTML DOM
 **/
function addToDOM()
{
    if(database.length!=0)
    {
        var root = document.getElementById('found-data');

        for(let i=0;i<database.length;i++)
        {
            let parseUrl = "";
            if(database[i].github != "")
            {
                parseUrl = database[i].github.substring(18).split("/");
            }
            
            var div = document.createElement('div');
            div.setAttribute("class","data-card");

            var h2 = document.createElement('h2');
            h2.appendChild(createDOMIcons(database[i].name));
            var heading = document.createTextNode(database[i].name);
            h2.appendChild(heading);
            if(parseUrl!=="")
            {
                var img1 = document.createElement('img');
                img1.setAttribute("alt","GitHub Release");
                img1.setAttribute("class","badge-img rightBadge");
                let img1src = "https://img.shields.io/github/tag/" + parseUrl[1] + "/" + parseUrl[2] +".svg";
                img1.setAttribute("src",img1src);
                h2.appendChild(img1);
            }

            var p = document.createElement('p');
            var paragraph = document.createTextNode(database[i].description);
            p.appendChild(paragraph);

            var ul = document.createElement('ul');
            ul.setAttribute("id","basicList");
            if(database[i].github != "")
            {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.setAttribute("href",database[i].github);
                a.setAttribute("class","link");
                var adata = document.createTextNode('GITHUB');
                a.appendChild(adata);
                li.appendChild(a);
                ul.appendChild(li);
            }
            if(database[i].website != "")
            {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.setAttribute("href",database[i].website);
                a.setAttribute("class","link");
                var adata = document.createTextNode('WEBSITE');
                a.appendChild(adata);
                li.appendChild(a);
                ul.appendChild(li);
            }
            if(database[i].docs != "")
            {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.setAttribute("class","link");
                a.setAttribute("href",database[i].docs);
                var adata = document.createTextNode('DOCS');
                a.appendChild(adata);
                li.appendChild(a);
                ul.appendChild(li);
            }
            
            div.appendChild(h2);
            div.appendChild(p);
            div.appendChild(ul);

            if(database[i].others.length!=0)                        // adding others data info
            {
                let othersListNode = document.createElement('ul');
                othersListNode.setAttribute("id","advList")

                for(let j=0;j<database[i].others.length;j++)
                {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    a.setAttribute("href",database[i].others[j].link);
                    a.setAttribute("class","link");
                    var data = document.createTextNode(database[i].others[j].name);
                    a.appendChild(data);
                    li.appendChild(a);
                    othersListNode.appendChild(li);
                }
                div.appendChild(othersListNode);
            }

            if(parseUrl!=="")
            {
                let div2 = document.createElement('div');
                div2.setAttribute("class","more-div");
                div2.setAttribute("onclick","addBadges(this)");
                let more = document.createTextNode("more")
                div2.appendChild(more);
                div.appendChild(div2);
            }
            root.appendChild(div);
        }
        addFunctionsToIcons()
        nightModeButton ? switchNightMode() : switchLightMode();
    }
}

/**
 * This function will change the toggle icon on click
 **/
function handleNightMode(event)
{
    if(nightModeButton == true)                                              // light mode
    {
        nightModeButton = false;
        let night = document.getElementById('toggle-night');
        night.style.display = "block";
        document.getElementById('toggle-day').style.display = "none";
        document.getElementById('toggle-div').style.backgroundColor = "#ccc";
        document.getElementById('toggle-div').style.color = "black";
        switchLightMode();
    }
    else if(nightModeButton == false)
    {
        nightModeButton = true;
        document.getElementById('toggle-night').style.display = "none";
        let day = document.getElementById('toggle-day');
        day.style.display = "block";
        document.getElementById('toggle-div').style.backgroundColor = "rgb(139, 139, 255)";
        document.getElementById('toggle-div').style.color = "white";
        switchNightMode();
    }
}

/**
 * This function will change the body theme to dark theme
 **/
function bodyNightMode()
{
    let body = document.getElementsByTagName('body')[0];
    body.style.color = "white";
    body.style.backgroundColor = darkBackground;
}

/**
 * change the horizontal rule to dark mode
 **/
function hrNightMode()
{
    document.getElementById('horizontal-rule').style.border = "1px solid white";
}

function headingNightMode()
{
    // heading dark mode
    document.getElementById('header-div-a').style.color = "white";
} 

function inputNightMode()
{
    // input dark mode
    let input = document.getElementById('section-div-input');
    input.style.color = "white";
    input.style.backgroundColor = lightBlack;
    
    let searchBar = document.getElementById('search-bar');
    searchBar.style.backgroundColor = lightBlack;
    searchBar.style.border = "1px solid white";

    document.getElementById('find-icon').style.color = "white";
}

function cardsNightMode()
{
    // cards dark mode
    let cards = document.getElementsByClassName('data-card');
    for(let i=0;i<cards.length;i++)
    {
        cards[i].style.color = "white";
        cards[i].style.backgroundColor = lightBlack;
        cards[i].style.border = "1px solid cyan";
    }

    // card links dark mode
    let links = document.getElementsByClassName('link');
    for(let i=0;i<links.length;i++)
    {
        links[i].style.color = "cyan";
    }

    // card footer dark mode
    let badgeArray = document.getElementsByClassName('badge-class');
    for(let i=0;i<badgeArray.length;i++)
    {
        badgeArray[i].style.backgroundColor = lightBlack;
    }

    // card footer text dark mode
    let moreArray = document.getElementsByClassName('more-div');
    for(let i=0;i<moreArray.length;i++)
    {
        moreArray[i].style.backgroundColor = lightBlack;
    }
}

/**
 * it will change recent search section to dark mode
 **/
function recentSearchNightMode()
{
    // recent search dark mode
    let recent = document.getElementById('search-results-list');
    if(recent !== null)
    {
        recent.style.backgroundColor = lightBlack;
        recent.style.border = "0.5px solid white";
        recent.style.color = "white";
    }
    let light = document.getElementsByClassName('recentSearchItem');
    for(let i=0;i<light.length;i++){
        let check = light[i].firstChild.firstChild.checked;
        light[i].style.backgroundColor = check ? darkBackground : lightBlack;
        light[i].style.color = 'cyan';
    }
    let clearHistoryButton = document.getElementsByClassName('clearHistoryButton');
    for(let i=0;i<clearHistoryButton.length;i++){
        clearHistoryButton[i].style.color = 'white';
        clearHistoryButton[i].style.backgroundColor = lightBlack;
        clearHistoryButton[i].style.border = '1px solid white';
    }
}

/**
 * change section color to night mode
 **/
function sectionNightMode()
{
    headingNightMode();
    
    inputNightMode();
    searchActionsNightMode();
    cardsNightMode();

    recentSearchNightMode();
    recentlyComparedNightMode();
}

function searchActionsNightMode(){
    let actionButtons = document.getElementsByClassName('actionButtons');
    for(let i=0;i<actionButtons.length;i++){
        actionButtons[i].style.color = 'white';
        actionButtons[i].style.backgroundColor = lightBlack;
        actionButtons[i].style.border = '0.1px solid white';
    } 
    let compareLibraryLink = document.getElementsByClassName('compareLibraryLink');
    for(let i=0;i<compareLibraryLink.length;i++){
        compareLibraryLink[i].style.color = 'white';
    }
}

function searchActionsLightMode(){
    let actionButtons = document.getElementsByClassName('actionButtons');
    for(let i=0;i<actionButtons.length;i++){
        actionButtons[i].style.color = 'black';
        actionButtons[i].style.backgroundColor = "#ccc";
        actionButtons[i].style.border = 'none';
    } 
    let compareLibraryLink = document.getElementsByClassName('compareLibraryLink');
    for(let i=0;i<compareLibraryLink.length;i++){
        compareLibraryLink[i].style.color = 'black';
    }
}

/**
 * change footer to dark mode
 **/
function footerNightMode()
{
    document.getElementsByTagName('footer')[0].style.backgroundColor = "#292b2c";
}

/**
 * it will handle night mode colors
 **/
function switchNightMode()
{
    bodyNightMode();
    hrNightMode();
    sectionNightMode();
    footerNightMode();
}

/**
 * This function will handle body light mode
 **/
function bodyLightMode()
{
    let body = document.getElementsByTagName('body')[0];
    body.style.color = "black";
    body.style.backgroundColor = "white";

    // heading light mode
    document.getElementById('header-div-a').style.color = "black";
}

/**
 * change hr line color for light mode i.e black color
 **/
function hrLightMode()
{
    document.getElementById('horizontal-rule').style.border = "1px solid gray";
}

function recentSearchLightMode()
{
    // recent search light mode
    let recent = document.getElementById('search-results-list');
    if(recent !== null)
    {
        recent.style.backgroundColor = "rgb(248, 148, 148)";
        recent.style.border = "2px solid yellow";
        recent.style.color = "black";
    }
    let dark = document.getElementsByClassName('recentSearchItem');
    for(let i=0;i<dark.length;i++){
        let check = dark[i].firstChild.firstChild.checked;
        dark[i].style.backgroundColor = check ? "brown" : "rgb(248, 148, 148)";
        dark[i].style.color = check ? 'white' : 'black';
    }
    let clearHistoryButton = document.getElementsByClassName('clearHistoryButton');
    for(let i=0;i<clearHistoryButton.length;i++){
        clearHistoryButton[i].style.color = 'black';
        clearHistoryButton[i].style.backgroundColor = '#ccc';
        clearHistoryButton[i].style.border = 'none';
    }
}

/**
 * change section colors to light mode
 **/
function sectionLightMode()
{
    // input light mode
    let input = document.getElementById('section-div-input');
    input.style.color = "initial";
    input.style.backgroundColor = "white";

    let searchBar = document.getElementById('search-bar');
    searchBar.style.backgroundColor = "white";
    searchBar.style.border = "2px solid brown";

    document.getElementById('find-icon').style.color = "brown";

    // cards light mode
    let cards = document.getElementsByClassName('data-card');
    for(let i=0;i<cards.length;i++)
    {
        cards[i].style.color = "black";
        cards[i].style.backgroundColor = "rgb(248, 148, 148)";
        cards[i].style.border = "2px solid yellow";
    }

    // card links light mode
    let links = document.getElementsByClassName('link');
    for(let i=0;i<links.length;i++)
    {
        links[i].style.color = "blue";
    }

    recentSearchLightMode();
    recentlyComparedLightMode();

    // card footer light mode
    let badgeArray = document.getElementsByClassName('badge-class');
    for(let i=0;i<badgeArray.length;i++)
    {
        badgeArray[i].style.backgroundColor = "rgb(230, 119, 119)";
    }

    // card footer text light mode
    let moreArray = document.getElementsByClassName('more-div');
    for(let i=0;i<moreArray.length;i++)
    {
        moreArray[i].style.backgroundColor = "rgb(230, 119, 119)";
    }
}

/**
 * change the footer to light mode color i.e brown
 **/
function footerLightMode()
{
    document.getElementsByTagName('footer')[0].style.backgroundColor = "brown";
}

/**
 * it will handle light mode colors
 **/
function switchLightMode()
{
    bodyLightMode();
    hrLightMode();
    sectionLightMode();
    searchActionsLightMode();
    footerLightMode();
}

/**
 * this function will add the repo badges to the card clicked
 * 
 * @param element for card clicked
 **/
function addBadges(element)
{
    let parent = element.parentNode;

    let parseUrl = parent.childNodes[2].firstChild.firstChild.href.substring(18).split("/");
    
    if(parseUrl!=="")
    {
        let badgesDiv = document.createElement('div');
        badgesDiv.setAttribute("id","badges");
        badgesDiv.setAttribute("class","badge-class");

        let badge2 = document.createElement('img');
        badge2.setAttribute("alt","GitHub repo size");
        badge2.setAttribute("class","badge-img");
        let badge2src = "https://img.shields.io/github/repo-size/" + parseUrl[1] + "/" + parseUrl[2] +".svg";
        badge2.setAttribute("src",badge2src);
        badgesDiv.appendChild(badge2);

        let badge3 = document.createElement('img');
        badge3.setAttribute("alt","GitHub license");
        badge3.setAttribute("class","badge-img");
        let badge3src = "https://img.shields.io/github/license/" + parseUrl[1] + "/" + parseUrl[2] +".svg";
        badge3.setAttribute("src",badge3src);
        badgesDiv.appendChild(badge3);

        let badge4 = document.createElement('img');
        badge4.setAttribute("alt","GitHub issues");
        badge4.setAttribute("class","badge-img");
        let badge4src = "https://img.shields.io/github/issues/" + parseUrl[1] + "/" + parseUrl[2] +".svg";
        badge4.setAttribute("src",badge4src);
        badgesDiv.appendChild(badge4);

        let badge5 = document.createElement('img');
        badge5.setAttribute("alt","GitHub pull requests");
        badge5.setAttribute("class","badge-img");
        let badge5src = "https://img.shields.io/github/issues-pr/" + parseUrl[1] + "/" + parseUrl[2] +".svg";
        badge5.setAttribute("src",badge5src);
        badgesDiv.appendChild(badge5);

        let badge6 = document.createElement('img');
        badge6.setAttribute("alt","GitHub forks");
        badge6.setAttribute("class","badge-img");
        let badge6src = "https://img.shields.io/github/forks/" + parseUrl[1] + "/" + parseUrl[2] +".svg?style=social";
        badge6.setAttribute("src",badge6src);
        badgesDiv.appendChild(badge6);

        let badge7 = document.createElement('img');
        badge7.setAttribute("alt","GitHub stars");
        badge7.setAttribute("class","badge-img");
        let badge7src = "https://img.shields.io/github/stars/" + parseUrl[1] + "/" + parseUrl[2] +".svg?style=social";
        badge7.setAttribute("src",badge7src);
        badgesDiv.appendChild(badge7);

        let lessDiv = document.createElement('div');
        lessDiv.appendChild(document.createTextNode('less'));
        lessDiv.setAttribute('class','less-div');
        lessDiv.setAttribute('onclick','hideBadges(this)');
        badgesDiv.appendChild(lessDiv);

        parent.appendChild(badgesDiv);

        element.style.display = "none";

        let libraryName = parent.childNodes[0].childNodes[1].nodeValue;
        if(!recentSearchesMap.has(libraryName)){
            recentSearchesMap.set(libraryName, true);
        }
        localStorage.setItem(
            'treasureHistory', 
            JSON.stringify(Array.from(recentSearchesMap.entries())) 
        );
    } 

    nightModeButton ? switchNightMode() : switchLightMode();
}

/**
 * this function will handle the event called by clicking less button
 * 
 * @param element for element clicked
 **/
function hideBadges(element)
{
    let parent = element.parentNode.parentNode;
    let parentArr = parent.childNodes; 

    if(parentArr.length == 6)
    {
        parentArr[4].style.display = "block";
        parent.removeChild(parentArr[5]);
    }
    else if(parentArr.length == 5)
    {
        parentArr[3].style.display = "block";
        parent.removeChild(parentArr[4]);
    }
}

/**
 * This function will clear the recent search history
 **/
function clearSearchHistory()
{
    if(!confirm('Do you want to clear recent searches ?')){
        return;
    }
    let count = 0;
    recentSearchesMap.forEach((value, key) => {
        if(!value){
            count++;
            recentSearchesMap.delete(key);
        }
    })
    clearRecentSearchDom();
    if(count==0){
        clearLocalStorage();
    }else{
        localStorage.setItem(
            'treasureHistory', 
            JSON.stringify(Array.from(recentSearchesMap.entries())) 
        );
        addRecentSearchesToDom();
    }
}

/**
 * This function will clear the recent compared section items
 **/
function clearRecentlyComparedLibrary(){
    if(!confirm('Do you want to clear recently compared library/s ?')){
        return;
    }
    let count = 0;
    iconMap.forEach((value, key) => {
        if(!value.selected){
            count++;
            iconMap.delete(key);
            selectedLibCount--;
        }
    })
    clearRecentlyComparedDOM();
    if(count==0){
        clearSessionStorage();
        selectedLibCount = 0;
    }else{
        sessionStorage.setItem(
            'compareSelected', 
            JSON.stringify(Array.from(iconMap.entries())) 
        );
        addRecentlyComparedToDOM();
    }
    updateSelectedCount();
}

/**
 * this function is called when print action is called
 **/
function printResults(){
    let earlierReverseNightMode = !nightModeButton;

    document.getElementById('search-actions').style.display = "none";
    nightModeButton = true;
    handleNightMode();
    print();

    document.getElementById('search-actions').style.display = "block";
    nightModeButton=earlierReverseNightMode;
    handleNightMode();
}