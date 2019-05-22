var fs = require('fs');


let charArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

for(let i=0;i<charArray.length;i++)
{
    let objectDatabase = [];
    let readFileName = 'Treasure-js/etc/'+charArray[i]+".md";

    fs.readFile(readFileName,function(err,buf){
        if(err)
        {
            console.log(err);
        }
        let str             = buf.toString();
        let arr             = str.split('\n');
        let object          = null;

        // THIS IS MARKDOWN PARSER
        for(let j=0;j<arr.length;j++)
        {
            // console.log(arr[i]);
            if(arr[j].search("## :rocket:")!=-1)
            {
                // console.log(object);
                // console.log();
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
                if(website.search("DOCS")!=-1)
                {
                    website = website.split("DOCS")[1]
                }
                // console.log(website);
                object.website = website.substring(2,website.length-1);
            }
            else if(arr[j].search("DOCS")!=-1)
            {
                let docs = arr[j].split("DOCS")[1];
                // console.log(docs);
                object.docs = docs.substring(2,docs.length-1);
            }
            else
            {
                let array = arr[j].split("## :rocket:");
                if(array.length==1 && array[0]!='' && array[0].search("#")==-1)
                {
                    // console.log(array);
                    object.description = array[0];
                }
            }
        }

        // console.log(objectDatabase);
        var data = "var " + charArray[i] + "data = [\n";

        for(let k=0;k<objectDatabase.length;k++)
        {
            data = data + "\t{\n\t\tname : "  + "\"" + objectDatabase[k].name + "\",\n";
            data = data + "\t\tdescription : " + "\"" + objectDatabase[k].description + "\",\n";
            data = data + "\t\tgithub : " + "\"" + objectDatabase[k].github + "\",\n"; 
            data = data + "\t\twebsite : " + "\"" + objectDatabase[k].website + "\",\n";
            data = data + "\t\tdocs : " + "\"" + objectDatabase[k].docs + "\",\n";
            data = data + "\t\tothers : []\n";
            data = data + "\t}";

            if(k!=objectDatabase.length-1)
            {
                data = data +",";
            }
            data=data+"\n";
        }
        data = data+"]";

        // console.log(data); 

        let writeFileName = "../scripts/" + charArray[i] +".js";

        fs.writeFile(writeFileName,data,(err)=>{
            if(err)
            {
                console.log(err);
            }
            console.log("Success: "+charArray[i]);
        })
    });
}