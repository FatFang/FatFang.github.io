var place_data=[
    {
     tag: "taipei_city",
     place: "臺北市",
     people:329137,
    },
  
    {
     tag: "new_taipei_city",
     place: "新北市",
     people:754513,
    },
  
    {
     tag: "taichung_city",
     place: "台中市",
     people:320394,
    },
  
    {
     tag: "tainan_city",
     place: "臺南市",
     people:189181,
    },
  
    {
     tag: "kaohsiung_city",
     place: "高雄市",
     people:325518,
    },
  
    {
     tag: "keelung_city",
     place: "基隆市",
     people:71844,
    },
  
    {
     tag: "taoyuan_country",
     place: "桃園市",
     people:373257,
    },
  
    {
     tag: "hsinchu_city",
     place: "新竹市",
     people:56307,
    },
  
    {
     tag: "hsinchu_country",
     place: "新竹縣",
     people:79091,
    },
  
    {
     tag: "miaoli_country",
     place: "苗栗縣",
     people:55974,
    },
  
    {
     tag: "changhua_country",
     place: "彰化縣",
     people:126485,
    },
  
    {
     tag: "nantou_country",
     place: "南投縣",
     people:40700,
    },
  
    {
     tag: "yunlin_country",
     place: "雲林縣",
     people:46931,
    },
  
    {
     tag: "chiayi_city",
     place: "嘉義市",
     people:21628,
    },
  
    {
     tag: "chiayi_country",
     place: "嘉義縣",
     people:34092,
    },
  
    {
     tag: "pingtung_country",
     place: "屏東縣",
     people:84961,
    },
  
    {
     tag: "yilan_country",
     place: "宜蘭縣",
     people:61903,
    },
  
    {
     tag: "hualien_country",
     place: "花蓮縣",
     people:48215,
    },
  
    {
     tag: "taitung_country",
     place: "台東縣",
     people:24654,
    },
  
    {
     tag: "penghu_country",
     place: "澎湖縣",
     people:5706,
    },
  
    {
     tag: "chin_country",
     place: "金門縣",
     people:3844,
    },
  
    {
     tag: "L_country",
     place: "連江縣",
     people:965,
    },
  ]
  ;

function ready(data){
  const svg_width = 700;
    const svg_height = 700;
    const chart_margin = {top:50,right:40,bottom:40,left:80};
    const chart_width = svg_width - (chart_margin.left + chart_margin.right);
    const chart_height = svg_height - (chart_margin.top + chart_margin.bottom);
    const this_svg = d3.select('#chartBar').append('svg')
    .attr('width', svg_width).attr('height',svg_height).attr('id',"chartBar2").append('g')
    .attr('transform',`translate(${chart_margin.left},${chart_margin.top})`);
    const xMax = d3.max(data,d => d.checkAll);
    const xMin = d3.min(data,d => d.checkAll);
    const xScale_v3 = d3.scaleLinear([0,xMax],[0,chart_width]);
    const yScale = d3.scaleBand().domain(data.map(d=>d.date)).rangeRound([0, chart_height]).paddingInner(0.25);
    const bars = this_svg.selectAll('bar').data(data).enter()
    .append('rect').attr('class','bar').attr('x',0).attr('y',d=>yScale(d.date))
    .attr('width',d=>xScale_v3(d.checkAll)).attr('height',yScale.bandwidth()).style('fill','rgb(37, 86, 30)');

    const header = this_svg.append('g').attr('class','bar-header').attr('transform',`translate(0,${-chart_margin.top/2})`).append('text');
    header.append('tspan').text('全台灣COVID-19累績確診人數');

    const xAxis = d3.axisTop(xScale_v3).tickSizeInner(-chart_height).tickSizeOuter(0);         
    const xAxisDraw = this_svg.append('g').attr('class','xaxis').call(xAxis);
    const yAxis = d3.axisLeft(yScale).tickSize(0);
    const yAxisDraw = this_svg.append('g').attr('class','yaxis').call(yAxis);
}
function type(d){
    return{
        date:d.date,
        checkAll:+d.all
    }
}
d3.csv('./owl_world_taiwan_v1-3.csv',type).then(
  res =>{
      console.log(res);
      ready(res);
  }
);
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
    //var s = $(this).attr("id");
    //debugger;
    //var a = getElementById(s);
    //a.setAttribute('backgroundcolor','red');
    vm.filter=name;
    //var peo;
    /*for(var i = 0;i < 22;i++){
        if(parsed[i] == name){
            peo = parsed[i][1];
        }
    }
    a.p = peo;*/
    console.log(name);
    //console.log(s);
  });
  
  
  date = new Date();
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  document.getElementById("current_date").innerHTML ="時間: " + year + "/" + month + "/" + day;