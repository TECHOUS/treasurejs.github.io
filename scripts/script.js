let flag=false;
let root = document.getElementById('root');
var script1 = document.createElement('script');
var database = [];

// this function will add the data from html dom to runtime database
function syncDatabase()
{
    var array = document.getElementsByClassName('data-card');
    for(let i=0;i<array.length;i++)
    {
        
    }
}

function getData() {
    syncDatabase();
    
    const key = document.getElementById('section-div-input').value;
    var firstValue = key.charAt(0).toUpperCase();
    
    console.log(firstValue);

    var filename = "scripts/" + firstValue + ".js";
    script1.setAttribute("src", filename);

    if (key.length == 1 && !flag) {
        flag=true;
        //append script tag according to firstname    
        root.prepend(script1);
        console.log("node added");
        
    }
    else if(key.length==0 && flag)
    {
        console.log("node removed");
        console.log(root);
        root.removeChild(script1);
        flag=false;
    }
    searchData(firstValue,key);
}

function searchData(firstValue,key) 
{
    let object = null;
    let output = [];
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
        }
        if(object!=null)
        {
            let index = key.length;
            for (let i = 0; i < object.length; i++) {
                if (object[i].name.substring(0, index) === key.toUpperCase()) {
                    // console.log(object[i]);
                    output.push(object[i]);
                }
            }
            console.log("workdone");
        }
        addToDOM(output);    
    }, 100);
}

function addToDOM(list)
{
    if(list.length!=0)
    {
        console.log(list);
        var root = document.getElementById('found-data');
        // if(root.hasChildNodes())
        // {
        //     console.log("hello");
        // }

        for(let i=0;i<list.length;i++)
        {
            var div = document.createElement('div');
            div.setAttribute("class","data-card");
            
            var h2 = document.createElement('h2');           
            var heading = document.createTextNode(list[i].name);
            h2.appendChild(heading);

            var p = document.createElement('p');
            var paragraph = document.createTextNode(list[i].description);
            p.appendChild(paragraph);

            var ul = document.createElement('ul');
            if(list[i].github != "")
            {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.setAttribute("href",list[i].github);
                var adata = document.createTextNode('GITHUB');
                a.appendChild(adata);
                li.appendChild(a);
                ul.appendChild(li);
            }
            if(list[i].website != "")
            {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.setAttribute("href",list[i].website);
                var adata = document.createTextNode('WEBSITE');
                a.appendChild(adata);
                li.appendChild(a);
                ul.appendChild(li);
            }
            if(list[i].docs != "")
            {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.setAttribute("href",list[i].docs);
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