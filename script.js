let field = [];
for(let i=0;i<9;i++){
    let arr=[]
    arr.length=9;
    arr.fill(0);
    field.push(arr);
    
}

function fill(){
    let field=document.getElementById("field");
    for(let i=0;i<9;i++){
        for(let r=0;r<9;r++){
            let cell=document.createElement("input");
            cell.classList.add("cell");
            cell.setAttribute('id',i+' '+r);
            cell.setAttribute('onchange',"putNumber(this)");
            field.appendChild(cell);
        }
    }
}
fill();
function putNumber(cell){
    let id = cell.id;
    let reg = new RegExp('^[1-9]*$');
    if(reg.test(cell.value)&&(cell.value<='9'&&cell.value>='1') ){
        field[parseInt(id[0])][parseInt(id[2])]=parseInt(cell.value);
    }else if(cell.value!=''){
        alert("error");
        cell.value=0;
    }
}
function isPossible(row, col,value,field) {
 
    let startRow=row-(row%3),startCol=col-(col%3);
    let endRow=startRow+2,endCol=startCol+2; 
    
    for(let r=0;r<9;r++){
        if (r!=row&&field[r][col]==value&&value!=0){
            return false;
        }
    }

    for(let c=0;c<9;c++){
        if (c!=col&&field[row][c]==value&&value!=0){
            return false;
        }
    }


    for(let r=startRow;r<=endRow;r++){
        for(let c=startCol; c<=endCol;c++){
            if((c!=col||r!=row)&&field[r][c]==value&&value!=0) {
                return false;
            }
        }
    }
    return true;
}
function solution(){
    solve(field,0,0);
    for(let i=0;i<9;i++)
        for(let r=0;r<9;r++){
            let cell=document.getElementById(i+" "+r);
            cell.value=field[i][r];
            cell.disabled=true;
        }
}
function check(){
    for(let i=0;i<9;i++)
        for(let r=0;r<9;r++)
            if( isPossible(i,r,field[i][r],field)==false ){
                alert("WRONG");
                return; 
            }
    alert("CORRECT");
}
function is_not_in_arr( arr1,arr2){ 
    for (let i=0;i<arr1.length;i++) 
        if(arr1[i][0]==arr2[0]&&arr1[i][1]==arr2[1]) 
            return false;
     return true;
 } 
 
function rand_0_8(){
    return Math.floor(Math.random() * 9);
}
function rand_1_9(){
    return Math.floor(Math.random() * 9+1);
}
function create_random_arr(count){
    let arr=[];
    while(arr.length<count){
        let el=[];
        el.push(rand_0_8());
        el.push(rand_0_8());
        if(is_not_in_arr(arr,el))
            arr.push(el);
    }
    return arr;
}
function change_field(count){
    let arr=create_random_arr(count);
    let j=0;
    for(let i=0;i<9;i++)
        for(let r=0;r<9;r++){
            field[i][r]=0;
            let cell=document.getElementById(i+" "+r);
            cell.value="";
            cell.disabled=false;
        }
    do{
        for(let i=0;i<arr.length;i++){
            let value;
            let k=0;
            do{
                k++;
                value=rand_1_9();
            }while(k<=10&&isPossible(arr[i][0],arr[i][1],value,field)==false);
            field[arr[i][0]][arr[i][1]]=value;
            let cell=document.getElementById(arr[i][0]+" "+arr[i][1]);
            cell.value=value;
            cell.disabled=true;
        }
        j++;
    }while(j<=10&&is_solvable()==false);
}
function hard(){
    do{
        change_field(9);
    }while(is_solvable()==false);
    solution();
    clear(81-18);
}
function medium(){
    do{
        change_field(9);
    }while(is_solvable()==false);
    solution();
    clear(81-27);
}
function easy(){
    do{
        change_field(9);
    }while(is_solvable()==false);
    solution();
    clear(81-36);
}
function sort(arr){
    for(let i=1;i<arr.length;i++)
        for(let r=0;r<arr.length-i;r++)
            if(arr[r][0]>arr[r+1][0]||arr[r][0]==arr[r+1][0]&&arr[r][1]>arr[r+1][1]){
                let temp=arr[r];
                arr[r]=arr[r+1];
                arr[r+1]=temp;
            }
}
function solve(arr,row,col){
    let p=false;
    if(col==9){
        col=0;
        row++;
    }
    if(row==9)
        return true;
    if(arr[row][col]==0){
        for(let i=1;i<=9;i++){
            if(isPossible(row,col,i,arr)){
                arr[row][col]=i;
                p=solve(arr,row,col+1);
            }
        }
        if(p==false)
            arr[row][col]=0;
    }else
        p=solve(arr,row,col+1);
    return p;
}
function is_solvable(){
    arr=[];
    for(let i=0;i<9;i++){
        let el=[];
        for(let r=0;r<9;r++)
            el.push(field[i][r]);
        arr.push(el);
    }
    return solve(arr,0,0);
}
function clear(count){
    let arr=create_random_arr(count);
    for(let i=0;i<arr.length;i++){
        field[arr[i][0]][arr[i][1]]=0;
        let cell=document.getElementById(arr[i][0]+" "+arr[i][1]);
        cell.value="";
        cell.disabled=false;
    }
}