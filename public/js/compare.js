

function addFarmToDisplay(farmName){
  tbl = d.getElementById("farmTable");
  num = tbl.dataset.num;
  num++;
  tbl.dataset.num = num;
  div = d.createElement("div");
  div.className = 'farm';
  inner = '<p onclick="fieldClick(\'farm#\')" id="farm#">'+farmName+'</p></div>';
  innerE = inner.replace(/#/g, num);
  div.innerHTML = innerE;
  tbl.appendChild(div);
}

function fieldClick(id){
  /* if (d.getElementById(id).innerHTML == 'remove_circle_outline'){
  z = d.getElementById(id).parentNode;
  z.parentNode.removeChild(z);
  // d.getElementById("ingTable").dataset.num--; TODO just dropping this by one causes problems
} else*/

if (selectedFarm == id){
  d.getElementById(selectedFarm).style = "color: black;";
  selectedFarm = '';
} else {
  if (selectedFarm != '' && d.getElementById(selectedFarm) != null){
    d.getElementById(selectedFarm).style = "color: black;";
  }
  selectedFarm = id;
  d.getElementById(id).style = "color: #FB8C00;";
}
}

function keyUp(event){
  if (d.getElementById(activeId) != null && d.getElementById(activeId).innerHTML != "remove_circle_outline") {
    inn = d.getElementById(activeId).innerHTML;
    if (event.keyCode == 8){
      d.getElementById(activeId).innerHTML = inn.slice(0, -1);
      if (d.getElementById(activeId).innerHTML.length == 0 || d.getElementById(activeId).innerHTML == "Name"){
        /*TODO get the above to work, it dosnt it its called Name :( */
        d.getElementById(activeId).innerHTML = 'remove_circle_outline';
        d.getElementById(activeId).className = "material-icons md-light md-24";
      }
    }
  }
}

/* TODO limit field size */
function keyPress(e){
  el = d.getElementById(activeId);
  if (el != null) {
    if (el.innerHTML == "remove_circle_outline" || el.innerHTML == "Name") {
      el.innerHTML = String.fromCharCode(e.which);
      el.className = "";
    } else {
      el.innerHTML += String.fromCharCode(e.which);
    }
  }
}

function getFarmList(){

  $.ajax({
    url: "/getfarmlist",
    success: function( result ) {
      farmslist = result;

      if(farmslist == null){
        d.getElementById('farmTable').innerHTML = '<p>Failed to get farm list</p>';
      } else {
        for(var farm in farmslist){
          addFarmToDisplay(farms.name);
        }
      }
    }
  });
}

function updateRightSide(){
  var currentfarm = {};
  for(var farm in farmslist){
    if(farm.name==selectedFarm){
      currentfarm = farm;
    }
    if(currentfarm == null){
      d.getElementById('farmDataTable').innerHTML = '<p>Select A Farm</p>';
    }


  }
}

window.onload = function(){
  d = document;
  activeId = '';
  selectedFarm = '';
  farmlist = [];
  getFarmList();

  d.onkeyup = function(e) {keyUp(e)};
  d.onkeypress = function(e) {keyPress(e)};
}