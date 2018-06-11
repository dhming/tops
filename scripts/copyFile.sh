SRCDIR='../toychain'
TARGETDIR='./toychain'

function copyapp() {
    rm -r $TARGETDIR/api
    rm -r $TARGETDIR/helpers
    rm -r $TARGETDIR/logic
    rm -r $TARGETDIR/modules
    rm -r $TARGETDIR/schema
    rm -r $TARGETDIR/sql
    
    cp -Rf $SRCDIR/api $TARGETDIR/
    cp -Rf $SRCDIR/dapps $TARGETDIR/
    cp -Rf $SRCDIR/helpers $TARGETDIR/
    cp -Rf $SRCDIR/logic $TARGETDIR/
    cp -Rf $SRCDIR/modules $TARGETDIR/
    cp -Rf $SRCDIR/schema $TARGETDIR/
    cp -Rf $SRCDIR/sql $TARGETDIR/
    cp -Rf $SRCDIR/app.js $TARGETDIR/
    cp -Rf $SRCDIR/config.json $TARGETDIR/
    cp -Rf $SRCDIR/genesisBlock.json $TARGETDIR/
    cp -Rf $SRCDIR/logger.js $TARGETDIR/
    cp -Rf $SRCDIR/package.json $TARGETDIR/
    cp -Rf $SRCDIR/toycd $TARGETDIR/
}


# copy ui
function copyui() {
    rm -r $TARGETDIR/public/static
    rm -r $TARGETDIR/public/partials
    rm -r $TARGETDIR/public/assets
    rm -r $TARGETDIR/public/images
    
    cp -Rf $SRCDIR/../toychain-ui/static $TARGETDIR/public/
    cp -Rf $SRCDIR/../toychain-ui/partials $TARGETDIR/public/
    cp -Rf $SRCDIR/../toychain-ui/assets $TARGETDIR/public/
    cp -Rf $SRCDIR/../toychain-ui/images $TARGETDIR/public/
    cp -Rf $SRCDIR/../toychain-ui/po $TARGETDIR/public/
    cp -Rf $SRCDIR/../toychain-ui/wallet.html $TARGETDIR/public/
    cp -Rf $SRCDIR/../toychain-ui/loading.html $TARGETDIR/public/
}


function main() {
    copyapp
    copyui
    
    #rm toychain-full-last.tar.gz
    #tar -czf toychain-full-last.tar.gz ./toychain
    
    rm toychain-last.tar.gz
    tar -czf toychain-last.tar.gz ./toychain --exclude=node_modules
}

main
