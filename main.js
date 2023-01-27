img="";
sstatus="";
object=[];
function preload(){
    img=loadImage("dog_cat.jpg")
}

function setup(){
    canvas=createCanvas(500,500)
    canvas.center();

    object_dectector=ml5.objectDetector('cocossd',modelLoaded) ;
    document.getElementById("status").innerHTML='Status=Detecting Objects'
}
    
function modelLoaded(){
    console.log("Model Loaded");
    sstatus=true;
    object_dectector.detect(img,got_result);
}

function got_result(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results)
        object=results;
    }
}

function draw(){
    image( img,0,0,500,500);

    if (sstatus != ""){
         for (i=0; i<object.length; i++){
            document.getElementById("status").innerHTML='Status = Object Detected';

            persent= floor(object[i].confidence*100);
            fill("#FF0000");
            text(object[i].label +""+persent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke("#FF0000");
           rect(object[i].x,object[i].y,object[i].width,object[i].height);
         }
    }
}