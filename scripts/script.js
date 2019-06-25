let flag=false;                                                             // for input
let root = document.getElementById('root');                                 // for refering body node
var database = [];                                                          // working database
const darkBackground = "#121212";
const lightBlack  = "#292b2c";

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
    
    var script1 = document.createElement('script');                             // sample script element
    script1.setAttribute("src", filename);

    if (key.length == 1 && !flag)                   // add script node
    {
        flag=true;    
        root.prepend(script1);                      // append script tag according to firstname
    }
    else if(key.length==0 && flag)                  // remove script node
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
                        // console.log(listarr[k]);
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
                        let pair = {
                            name: "",
                            link: ""
                        }
                        pair.name = links[k].firstChild.lastChild.nodeValue;
                        pair.link = links[k].firstChild.href;
                        object.other.push(pair);
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

            let index = key.length;
            for (let i = 0; i < object.length; i++)                         // add objects data to database 
            {
                if (object[i].name.substring(0, index) === key.toUpperCase()) 
                {
                    database.push(object[i]);
                }
            }   
        }
        addToDOM();                                                            
    }, 100);
}

/**
 * This function will add to 
 * runtime database to HTML DOM
 **/
function addToDOM()
{
    if(database.length!=0)
    {
        var root = document.getElementById('found-data');

        for(let i=0;i<database.length;i++)
        {
            var div = document.createElement('div');
            div.setAttribute("class","data-card");
            
            var h2 = document.createElement('h2');           
            var heading = document.createTextNode(database[i].name);
            h2.appendChild(heading);

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

            root.appendChild(div);
        }
    }
    handleNightMode();
}

/**
 * it will handle night mode of the application
 **/
function handleNightMode()
{
    let toggleSwitch = document.getElementById('toggleSwitch');
    if(toggleSwitch.checked)
    {
        switchNightMode();
    }
    else
    {
        switchLightMode();
    }
}

/**
 * it will handle night mode colors
 **/
function switchNightMode()
{
    let body = document.getElementsByTagName('body')[0];
    body.style.color = "white";
    body.style.backgroundColor = darkBackground;

    document.getElementById('horizontal-rule').style.border = "1px solid white";

    let input = document.getElementById('section-div-input');
    input.style.color = "white";
    input.style.backgroundColor = lightBlack;

    let cards = document.getElementsByClassName('data-card');
    for(let i=0;i<cards.length;i++)
    {
        cards[i].style.color = "white";
        cards[i].style.backgroundColor = lightBlack;
        cards[i].style.border = "none";
    }

    let links = document.getElementsByClassName('link');
    for(let i=0;i<links.length;i++)
    {
        links[i].style.color = "rgb(139, 139, 255)";
    }
}

/**
 * it will handle light mode colors
 **/
function switchLightMode()
{
    let body = document.getElementsByTagName('body')[0];
    body.style.color = "black";
    body.style.backgroundColor = "white";

    document.getElementById('horizontal-rule').style.border = "1px solid gray";

    let input = document.getElementById('section-div-input');
    input.style.color = "initial";
    input.style.backgroundColor = "white";

    let cards = document.getElementsByClassName('data-card');
    for(let i=0;i<cards.length;i++)
    {
        cards[i].style.color = "black";
        cards[i].style.backgroundColor = "rgb(248, 148, 148)";
        cards[i].style.border = "2px solid yellow";
    }

    let links = document.getElementsByClassName('link');
    for(let i=0;i<links.length;i++)
    {
        links[i].style.color = "blue";
    }
}