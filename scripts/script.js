let flag=false;                                                             // for input
let root = document.getElementById('root');                                 // for refering body node
var database = [];                                                          // working database

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
            other:""
        }

        let arr = array[i].childNodes;                                      // get datacard's data in arr
        for(let j=0;j<arr.length;j++)
        {
            switch(j)
            {
                case 1:
                    object.name = arr[j].firstChild.nodeValue;
                    break;
                case 3:
                    object.description = arr[j].firstChild.nodeValue;
                    break;
                case 5:
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
            }
        }   

        database.push(object);
    }
    eraseDataList(); 
}

/**
 * This function will erase all the data list items
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
        // console.log(object);
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
            if(database[i].github != "")
            {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.setAttribute("href",database[i].github);
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
                var adata = document.createTextNode('WEBSITE');
                a.appendChild(adata);
                li.appendChild(a);
                ul.appendChild(li);
            }
            if(database[i].docs != "")
            {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.setAttribute("href",database[i].docs);
                var adata = document.createTextNode('DOCS');
                a.appendChild(adata);
                li.appendChild(a);
                ul.appendChild(li);
            }
            
            div.appendChild(h2);
            div.appendChild(p);
            div.appendChild(ul);

            root.appendChild(div);
        }
    }
}