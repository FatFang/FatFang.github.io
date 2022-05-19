var place_data=[
    {
     tag: "taipei_city",
     place: "臺北市",
     people:176096,
    },
  
    {
     tag: "new_taipei_city",
     place: "新北市",
     people:372720,
    },
  
    {
     tag: "taichung_city",
     place: "台中市",
     people:64417,
    },
  
    {
     tag: "tainan_city",
     place: "臺南市",
     people:35207,
    },
  
    {
     tag: "kaohsiung_city",
     place: "高雄市",
     people:59071,
    },
  
    {
     tag: "keelung_city",
     place: "基隆市",
     people:36598,
    },
  
    {
     tag: "taoyuan_country",
     place: "桃園市",
     people:153382,
    },
  
    {
     tag: "hsinchu_city",
     place: "新竹市",
     people:13468,
    },
  
    {
     tag: "hsinchu_country",
     place: "新竹縣",
     people:23284,
    },
  
    {
     tag: "miaoli_country",
     place: "苗栗縣",
     people:11281,
    },
  
    {
     tag: "changhua_country",
     place: "彰化縣",
     people:17041,
    },
  
    {
     tag: "nantou_country",
     place: "南投縣",
     people:6296,
    },
  
    {
     tag: "yunlin_country",
     place: "雲林縣",
     people:9410,
    },
  
    {
     tag: "chiayi_city",
     place: "嘉義市",
     people:3382,
    },
  
    {
     tag: "chiayi_country",
     place: "嘉義縣",
     people:5592,
    },
  
    {
     tag: "pingtung_country",
     place: "屏東縣",
     people:17299,
    },
  
    {
     tag: "yilan_country",
     place: "宜蘭縣",
     people:22448,
    },
  
    {
     tag: "hualien_country",
     place: "花蓮縣",
     people:18047,
    },
  
    {
     tag: "taitung_country",
     place: "台東縣",
     people:5795,
    },
  
    {
     tag: "penghu_country",
     place: "澎湖縣",
     people:1352,
    },
  
    {
     tag: "chin_country",
     place: "金門縣",
     people:1078,
    },
  
    {
     tag: "L_country",
     place: "連江縣",
     people:213,
    },
  ]
  ;
  /**/
var parsed;
fetch('./people.csv').then(response => response.text()).then(body => {
    parsed = body.split("\n").map(line => line.split(","));
})
  var vm = new Vue({
    el: "#app",
    data: {
      filter: "",
      place_data: place_data
    },computed:{
      areaChinese: function(){
        var vobj=this;
        var result=this.place_data.filter(function(obj){
          return obj.tag==vobj.filter;
        });
        if (result.length==0){
          return null;
        }
        return result[0];
      }
    }
  });
  $("path").mouseenter(function(e){
    var name=$(this).attr("data-name");
    vm.filter=name;
    //var peo;
    /*for(var i = 0;i < 22;i++){
        if(parsed[i] == name){
            peo = parsed[i][1];
        }
    }
    a.p = peo;*/
    console.log(name);
  });
  
  
  