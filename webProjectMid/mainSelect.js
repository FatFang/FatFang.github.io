$(function(){
    $("input").on("click",function(){
        var numberOfListItem = $("li").length;
        var randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        

        var temp = document.querySelector('input').dataset.num;
        var previousNum = parseInt(temp) - 1;

        //debugger;

        while(previousNum == randomChildNumber){
            var randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        }

        $("h1").text($("li").eq(randomChildNumber).text());
        var num = randomChildNumber + 1;
        
        var i = document.querySelector('input');
        i.setAttribute('data-num',num );

        //$("list").src = num+".jpg";
        var a = document.getElementById("list");
        a.innerHTML = "<img style = 'height: 500px; width: 700px;'  src='"+num+".jpg'>";
    });
});