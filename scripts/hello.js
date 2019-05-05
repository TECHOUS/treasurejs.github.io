var fs = require('fs');

fs.readFile("A.md",function(err,buf){
    if(err)
    {
        console.log(err);
    }
    let str = buf.toString();
    let arr = str.split('\n');
    let line = 0;
    let flag = false;
    let object = null;
    for(let i=0;i<arr.length;i++)
    {
        line++;
        if(flag==false)
        {
            object = {
                name :"",
                description:"",
                github:"",
                website:"",
                docs:"",
                other:[]
            }
        }

        if(arr[i].search('## :rocket: '))
        {
            if(arr[i].search("[*]"))
            {
                // console.log(arr[i]);
            }
            else
            {
                console.log(arr[i]);
            }
        }
        else
        {
            // console.log(arr[i]);
            object.name = arr[i];
        }
    }
})