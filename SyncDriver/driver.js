var fs = require('fs');

let charArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

for(let i=0;i<charArray.length;i++)
{
    let objectDatabase = [];
    let readFileName = 'Treasure-js/etc/'+charArray[i]+".md";       // reading files path

    fs.readFile(readFileName,function(err,buf){                     // reading markdown files
        if(err)
        {
            console.log(err);
        }
        let readedFile      = buf.toString();
        let arr             = readedFile.split('\n');
        let object          = null;

        // MARKDOWN PARSING
        for(let j=0;j<arr.length;j++)                               // parsing markdown and create objects
        {
            if(arr[j].search("## :rocket:")!=-1)
            {    
                if(object!=null)
                {
                    objectDatabase.push(object);
                }
                object = {
                    name :"",
                    description:"",
                    github:"",
                    website:"",
                    docs:"",
                    other:[]
                }
                let name = arr[j].split("## :rocket:")[1];
                object.name = name.substring(1,name.length); 
            }
            else if(arr[j].search("GITHUB")!=-1)
            {
                let str = arr[j].split("GITHUB")[1];
                object.github = str.substring(2,str.length-1); 
            }
            else if(arr[j].search("WEBSITE")!=-1)
            {
                let website = arr[j].split("WEBSITE")[1];
                object.website = website.substring(2,website.length-1);
            }
            else if(arr[j].search("DEVDOCS")==-1 && arr[j].search("DOCS")!=-1)
            {
                let docs = arr[j].split("DOCS")[1];
                object.docs = docs.substring(2,docs.length-1);
            }
            else if(arr[j].indexOf("*")!=-1)
            {
                let pair = {
                    name: "",
                    link: ""
                }
                let parse = arr[j].split(/([()])/);
                let first  = parse[0].replace('* [','').replace(']','');
                pair.name = first.replace(/"/g, "'");
                pair.link = parse[2];
                object.other.push(pair);
            }
            else                                                            // writing description
            {
                let array = arr[j].split("## :rocket:");
                if(array.length==1 && array[0]!='' && array[0].search("#")==-1)
                {
                    array[0] = array[0].replace(/"/g, "'");
                    object.description = array[0];
                }
            }
        }
        objectDatabase.push(object);                                        //pushing last created object

        // writing js files
        var data = "var " + charArray[i] + "data = [\n";

        for(let k=0;k<objectDatabase.length;k++)
        {
            data = data + "\t{\n\t\tname : "  + "\"" + objectDatabase[k].name + "\",\n";
            data = data + "\t\tdescription : " + "\"" + objectDatabase[k].description + "\",\n";
            data = data + "\t\tgithub : " + "\"" + objectDatabase[k].github + "\",\n"; 
            data = data + "\t\twebsite : " + "\"" + objectDatabase[k].website + "\",\n";
            data = data + "\t\tdocs : " + "\"" + objectDatabase[k].docs + "\",\n";
            
            if(objectDatabase[k].other.length==0)
            {
                data = data + "\t\tothers : []\n";
            }
            else
            {
                let result = "[\n";
                for(let i=0;i<objectDatabase[k].other.length;i++)
                {
                    result = result + "\t\t\t{\n";
                    result = result + "\t\t\t\tname: " + "\"" + objectDatabase[k].other[i].name + "\",\n";
                    result = result + "\t\t\t\tlink: " + "\"" + objectDatabase[k].other[i].link + "\"\n";
                    result = result + "\t\t\t}";
                    if(i != objectDatabase[k].other.length-1)
                    {
                        result = result+","
                    }
                    result = result+"\n";
                }
                result = result + "\t\t]";

                data = data + "\t\tothers : " + result + "\n";
            }
            
            data = data + "\t}";

            if(k!=objectDatabase.length-1)
            {
                data = data +",";
            }
            data=data+"\n";
        }
        data = data+"]";

        let writeFileName = "../scripts/" + charArray[i] +".js";

        fs.writeFile(writeFileName,data,(err)=>{                    // writing A.js ... files
            if(err)
            {
                console.log(err);
            }
            console.log("Success: "+charArray[i]);
        })
    });
}