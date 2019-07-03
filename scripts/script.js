let flag=false;                                                             // for input
let root = document.getElementById('root');                                 // for refering body node
var database = [];                                                          // working database
const darkBackground = "#121212";
const lightBlack  = "#292b2c";
let nightModeButton = false;

/**
 * This function will be called when key is pressed
 * create script node and add to html dom
 **/
function getData() 
{
    syncDatabase();
    const key = document.getElementById('section-div-input').value;
    var firstValue = key.charAt(0).toUpperCase();
    
    if(!isNaN(parseInt(firstValue)))
    {
        alert("we don't index libraries with numbers");
        return;
    }

    var filename = "scripts/" + firstValue + ".js";
    
    var script1 = document.createElement('script');                         // sample script element
    script1.setAttribute("src", filename);

    if (key.length == 1 && !flag)                                           // add script node
    {
        flag=true;    
        root.prepend(script1);                                              // append script tag according to firstname
    }
    else if(key.length==0 && flag)                                          // remove script node
    {
        try
        {
            root.removeChild(root.firstChild);
        }
        catch(err){}
        flag=false;

        eraseDataList();
        database=[];
        return;
    }
    linkData(firstValue,key);
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
        // console.log(arr);
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
    // remove all nodes from the found data
    let founddata = document.getElementById('found-data');

    var child = founddata.lastElementChild;  
    while (child) { 
        founddata.removeChild(child); 
        child = founddata.lastElementChild; 
    }
}

/**
 * This function will link the data from files
 **/
function linkData(firstValue,key) 
{
    let object = null;
    setTimeout(function () {
        switch (firstValue) {
            case 'A':
                object = Adata;
                break;
            case 'B':
                object = Bdata;
                break;
            case 'C':
                object = Cdata;
                break;
            case 'D':
                object = Ddata;
                break;
            case 'E':
                object = Edata;
                break;
            case 'F':
                object = Fdata;
                break;
            case 'G':
                object = Gdata;
                break;
            case 'H':
                object = Hdata;
                break;
            case 'I':
                object = Idata;
                break;
            case 'J':
                object = Jdata;
                break;
            case 'K':
                object = Kdata;
                break;
            case 'L':
                object = Ldata;
                break;
            case 'M':
                object = Mdata;
                break;
            case 'N':
                object = Ndata;
                break;
            case 'O':
                object = Odata;
                break;
            case 'P':
                object = Pdata;
                break;
            case 'Q':
                object = Qdata;
                break;
            case 'R':
                object = Rdata;
                break;
            case 'S':
                object = Sdata;
                break;
            case 'T':
                object = Tdata;
                break;
            case 'U':
                object = Udata;
                break;
            case 'V':
                object = Vdata;
                break;
            case 'W':
                object = Wdata;
                break;
            case 'X':
                object = Xdata;
                break;
            case 'Y':
                object = Ydata;
                break;
            case 'Z':
                object = Zdata;
                break;
            default:
                break;
        }

        if(object!=null)
        {
            if(database.length!=0)                                          // erase database
            {
                database = [];
            }
            filterData(object,key);
        }
        addToDOM();                                                            
    }, 100);
}

/**
 * This function will filter the data linked
 **/
function filterData(object,key)
{
    let index = key.length;
    for (let i = 0; i < object.length; i++)                         // add filter objects data to database 
    {
        if (object[i].name.substring(0, index) === key.toUpperCase()) 
        {
            database.push(object[i]);
        }
    }
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
            var heading = document.createTextNode(database[i].name);
            h2.appendChild(heading);
            if(parseUrl!=="")
            {
                var img1 = document.createElement('img');
                img1.setAttribute("alt","GitHub Release");
                img1.setAttribute("class","badge-img");
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
    }

    nightModeButton ? switchNightMode() : switchLightMode();
}

/**
 * This function will change the toggle icon on click
 **/
function handleNightMode()
{
    if(nightModeButton==true)                                              // night mode
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

/**
 * change section color to night mode
 **/
function sectionNightMode()
{
    // input dark mode
    let input = document.getElementById('section-div-input');
    input.style.color = "white";
    input.style.backgroundColor = lightBlack;
    
    let searchBar = document.getElementById('search-bar');
    searchBar.style.backgroundColor = lightBlack;
    searchBar.style.border = "1px solid white";

    document.getElementById('find-icon').style.color = "white";

    // cards dark mode
    let cards = document.getElementsByClassName('data-card');
    for(let i=0;i<cards.length;i++)
    {
        cards[i].style.color = "white";
        cards[i].style.backgroundColor = lightBlack;
        cards[i].style.border = "none";
    }

    // card links dark mode
    let links = document.getElementsByClassName('link');
    for(let i=0;i<links.length;i++)
    {
        links[i].style.color = "rgb(139, 139, 255)";
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
}

/**
 * change hr line color for light mode i.e black color
 **/
function hrLightMode()
{
    document.getElementById('horizontal-rule').style.border = "1px solid gray";
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