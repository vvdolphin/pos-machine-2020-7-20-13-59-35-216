function printReceipt(barcodes) {

    let barcodeCount = itemsCount(barcodes);
    let itemInfo = getItemInfo(barcodeCount);
    let itemDetail = getSingleReceipt(itemInfo);
    printInfo(itemDetail);

}

function itemsCount(barcodes){
    let numMap=new Map();
    for(index = 0; index < barcodes.length; index++) {
        let numListKey=barcodes[index];
        if(numMap.get(numListKey)==null){
            numMap.set(numListKey,1);
        }
        else{
            numMap.set(numListKey,numMap.get(numListKey)+1);
        }
    }
    return numMap;

}

function getItemInfo(barcodeCount){
    let itemArray=new Array();
    for(index = 0; index < database.length; index++){
        let dataKey=database[index].barcode;
        if(barcodeCount.get(dataKey)!=null){
            lineItem={
                barcode: database[index].barcode,
                name: database[index].name,
                price: database[index].price,
                num: barcodeCount.get(dataKey)
            };
            itemArray.push(lineItem);
        }
    }
    return itemArray;
}


function getSingleReceipt(itemDetail){
    let lineData=new Array();
    let totalPrice=0;
    for(index = 0; index < itemDetail.length; index++){
        let lineKey=itemDetail[index];
        let lineString="";
        totalPrice+=lineKey.total;
        lineString="Name: "+lineKey.name+", Quantity: "+lineKey.num+", Unit price: "+lineKey.price+" (yuan)"+", Subtotal: "+lineKey.total+" (yuan)"+"\n";
        lineData.push(lineString);
    }
    let totalString="Total: "+totalPrice+" (yuan)"+"\n";
    lineData.push(totalString);
    return lineData;
}

function printInfo(itemDetail){
    let info ="***<store earning no money>Receipt ***\n";
    for(index = 0; index < itemDetail.length; index++){
        if(index==itemDetail.length-1)
            info+="----------------------"+"\n"+itemDetail[index]+"**********************";
        else
            info+=itemDetail[index];
    }
    return info;
}

const database=[
    {
        barcode: 'ITEM000000',
        name: 'Coca-Cola',
        price: 3
    },
    {
        barcode: 'ITEM000001',
        name: 'Sprite',
        price: 3
    },
    {
        barcode: 'ITEM000002',
        name: 'Apple',
        price: 5
    },
    {
        barcode: 'ITEM000003',
        name: 'Litchi',
        price: 15
    },
    {
        barcode: 'ITEM000004',
        name: 'Battery',
        price: 2
    },
    {
        barcode: 'ITEM000005',
        name: 'Instant Noodles',
        price: 4
    }
];

module.exports = {
    printReceipt
};