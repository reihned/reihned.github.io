// rules notes
// white balls 1-69 cannot repeat
// power balls 1-26

// official source
var source = "http://www.powerball.com/powerball/winnums-text.txt";
var proxy = "http://cors.io/?u=" //cors proxy because text file dont got no headers yo
var source_raw = "";

//cutoff since the max number increase
var cutoff = "09/30/2015";

// for holding relevant data, since change to maxnum 69
var relevant = "";
var processed_row_col = []
var wb_pool = [];
var pb_pool = [];

$.ajax({
  url: proxy+source,
  type: 'GET',
  crossDomain: true,
  contentType: 'text/plain',
  xhrFields: {
    withCredentials: false
  },
  success: function (data) {
    source_raw = data;
  }
}).done(function() {
  relevant = source_raw.split(cutoff)[0];
  processed_row_col = relevant.match(/[^\r\n]+/g);
  processed_row_col = processed_row_col.map(function(row){
    return row.split(/\s+/);
  });
  processed_row_col.shift();
  wb_pool = processed_row_col.map(function(row) {
    return row.slice(1,6);
  }).reduce(function(a, b) {
    return a.concat(b);
  });
  pb_pool = processed_row_col.map(function(row) {
    return row.slice(6,7);
  }).reduce(function(a, b) {
    return a.concat(b);
  });
});

function is_same(array1, array2){
  //http://stackoverflow.com/questions/22395357/how-to-compare-two-arrays-are-equal-using-javascript-or-jquery
  //http://jsfiddle.net/47WCQ/1/
  var is_same = array1.length == array2.length && array1.every(function(element, index) {
    return element === array2[index];
  });

  return is_same;
}

function wb_generate(){
  //to generate white ball selection
  //take 5 numbers from white ball pool

  var wb_results = [];
  var wb_pool_temp = wb_pool.slice(0);

  for(i = 0; i < 5; i++) {
    var wb_sample = wb_pool_temp[Math.floor(Math.random()*wb_pool_temp.length)];

    //they cannot repeat so remove duplicates from array
    while(wb_pool_temp.indexOf(wb_sample) > 0 ) {
      wb_pool_temp.splice(wb_pool_temp.indexOf(wb_sample), 1);
    }

    wb_results.push(wb_sample);
  }//for 5 times

  return wb_results
}

function pb_generate(){
  var pb_sample = pb_pool[Math.floor(Math.random()*pb_pool.length)];
  return pb_sample;
}

function render_tickets(tickets){
  //expecting an array of str
  tickets.forEach(function(ticket){
    $("#powerball_yield").append("<li>"+ticket+","+pb_generate()+"</li>");
  });
}

function ticket_generate(){
  var tickets = [];
  var count = parseInt($("#powerball_tickets").val())

  //tickets should not repeat
  // this method is inefficient
  for(i = 0; i < count; i++) {
    while(tickets.length<(i+1)){
      var ticket_temp = wb_generate();
      var duplicate = false; //default
      tickets.forEach(function(ticket){
        if( is_same (ticket_temp, ticket) ){
          duplicate = true;
        }
      });
      if( duplicate == false ){
        tickets.push(ticket_temp);
      }
    }
  }

  render_tickets(tickets);
}
