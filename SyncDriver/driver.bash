echo "Sync started..."

echo "Do you want to fresh sync ?(Y/N)";
read option

if [[ $option == Y ]] || [[ $option == y ]];then
    rm -rf Treasure-js
    git clone "https://github.com/TechOUs/Treasure-js.git"
fi

node driver.js

if [ -d "Treasure-js" ];then
    echo "Do you want to delete cache ?(Y/N)";
    read opt
    if [[ $opt == Y ]] || [[ $opt == y ]];then
        rm -rf Treasure-js
    fi
fi

echo "Sync completed..."