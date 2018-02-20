/*-----------chart--------------*/
$('#four_day_table, #ohpMaxHolder, #ohpIncHolder').hide(); //hides all the four day stuff
$('#three_day_tab').on("click", function() { //onclick shows the 3 day table and hides 4 day
    if($('#three_day_table').is(':hidden')){
      $('#three_day_table').show();
      $('#ohpMaxHolder, #four_day_table, #ohpIncHolder').hide();
      $('#three_day_tab').addClass('clickedTab');
      $('#four_day_tab').removeClass('clickedTab');
    }
});
$('#four_day_tab').on("click", function() { //shows 4 day table stuff, hides 3 day
    if($('#four_day_table').is(':hidden')){
      $('#four_day_table, #ohpMaxHolder, #ohpIncHolder').show();
      $('#three_day_table').hide();
       $('#four_day_tab').addClass('clickedTab');
      $('#three_day_tab').removeClass('clickedTab');
    }
});

/*---------------Max weight reps and table formula--------------*/

$('#oneMax').on('click', maxRepFunction); //triggers the correct max rep chat/layout/numbers when the max rep radio button is clicked.
$('#threeMax').on('click', maxRepFunction);
$('#fiveMax').on('click', maxRepFunction);

function maxRepFunction(){
    switch($('input[name=repMax]:checked').attr('id')){ //checks value of the radio button
        case "oneMax":
            $('#ohpMaxNumber, #deadMaxNumber, #benchMaxNumber, #squatMaxNumber').html("One Rep Max:"); //sets everything to one rep max in lists
            $('#weekOneTD').html('Week One &ndash; 3x5 Reps'); //sets the column titles to be the correct rep range
            $('#weekTwoTD').html('Week One &ndash; 3x3 Reps');
            $('#weekThreeTD').html('Week One &ndash; 5/3/1 Reps');
            tableCalculation(); //triggers the calculate numbers for chart fill in function
            break;
        case "threeMax":
            $('#ohpMaxNumber, #deadMaxNumber, #benchMaxNumber, #squatMaxNumber').html("Three Rep Max:");
            $('#weekOneTD, #weekThreeTD').html('Week One &ndash; 3x5 Reps');
            $('#weekTwoTD').html('Week One &ndash; 3x3 Reps');
            tableCalculation();
            break;
        case "fiveMax":
            $('#ohpMaxNumber, #deadMaxNumber, #benchMaxNumber, #squatMaxNumber').html("Five Rep Max:");
            $('#weekOneTD, #weekTwoTD, #weekThreeTD').html('Week One &ndash; 3x5 Reps');
            tableCalculation();
            break;
    }
}

$('#calculateTable p').on("click", tableCalculation); //calculates full chart using the calculate button

function tableCalculation(){
    var ohpMax = $('#maxOHP').val();
    var deadMax = $('#maxDead').val();
    var benchMax = $('#maxBench').val();
    var squatMax = $('#maxSquat').val();
    var ohpInc = $('#ohpIncrease').val();
    var deadInc = $('#deadIncrease').val();
    var benchInc = $('#benchIncrease').val();
    var squatInc = $('#squatIncrease').val();
    
    var oneMax = {
      weekOne: function(lift, increase){return Math.round(lift * 0.65) + '<br>' + Math.round(lift * 0.75) + '<br>' + Math.round(lift * 0.85);},
      weekTwo: function(lift, increase){return Math.round(lift * 0.7) + '<br>' + Math.round(lift * 0.8) + '<br>' + Math.round(lift * 0.9);},
      weekThree: function(lift, increase){return Math.round(lift * 0.75) + '<br>' + Math.round(lift * 0.85) + '<br>' + Math.round(lift * 0.95);},
    };
    var threeMax = {
      weekOne: function(lift, increase){return Math.round(lift * 0.65) + '<br>' + Math.round(lift * 0.75) + '<br>' + Math.round(lift * 0.85);},
      weekTwo: function(lift, increase){return Math.round(lift * 0.7) + '<br>' + Math.round(lift * 0.8) + '<br>' + Math.round(lift * 0.9);},
      weekThree: function(lift, increase){return Math.round((Number(lift) + Number(increase)) * 0.65) + '<br>' + Math.round((Number(lift) + Number(increase)) * 0.75) + '<br>' + Math.round((Number(lift) + Number(increase)) * 0.85);}
    };
    var fiveMax = {
      weekOne: function(lift, increase){return Math.round((lift * 0.65)) + '<br>' + Math.round((lift * 0.75)) + '<br>' + Math.round((lift * 0.85));},
      weekTwo: function(lift, increase){return Math.round((Number(lift) + Number(increase)) * 0.65) + '<br>' + Math.round((Number(lift) + Number(deadInc)) * 0.75) + '<br>' + Math.round((Number(lift) + Number(increase)) * 0.85);},
      weekThree: function(lift, increase){return Math.round((Number(lift) + Number(increase) * 2) * 0.65) + '<br>' + Math.round((Number(lift) + Number(increase) * 2) * 0.75) + '<br>' + Math.round((Number(lift) + Number(increase) * 2) * 0.85);}
    };
console.log(deadMax);
    if($('#four_day_table').is(':hidden')){ //does it for 3 day table if it's visible
        switch($('input[name=repMax]:checked').attr('id')){ //checks radio button value for switch case to determine which rep max system to fill in
        case "oneMax":
            $('#dead_3week_1').html(oneMax.weekOne(deadMax, deadInc)); //puts in the three working rep numbers, one on each line, rounded to a whole number
            $('#dead_3week_2').html(oneMax.weekTwo(deadMax, deadInc));
            $('#dead_3week_3').html(oneMax.weekThree(deadMax, deadInc));

            $('#bench_3week_1').html(oneMax.weekOne(benchMax, benchInc));
            $('#bench_3week_2').html(oneMax.weekTwo(benchMax, benchInc));
            $('#bench_3week_3').html(oneMax.weekThree(benchMax, benchInc));
            
            $('#squat_3week_1').html(oneMax.weekOne(squatMax, squatInc));
            $('#squat_3week_2').html(oneMax.weekTwo(squatMax, squatInc));
            $('#squat_3week_3').html(oneMax.weekThree(squatMax, squatInc));
            break;
        case "threeMax":
            $('#dead_3week_1').html(threeMax.weekOne(deadMax, deadInc)); 
            $('#dead_3week_2').html(threeMax.weekTwo(deadMax, deadInc));
            $('#dead_3week_3').html(threeMax.weekThree(deadMax, deadInc));
            
            $('#bench_3week_1').html(threeMax.weekOne(benchMax, benchInc));
            $('#bench_3week_2').html(threeMax.weekTwo(benchMax, benchInc));
            $('#bench_3week_3').html(threeMax.weekThree(benchMax, benchInc));
            
            $('#squat_3week_1').html(threeMax.weekOne(squatMax, squatInc));
            $('#squat_3week_2').html(threeMax.weekTwo(squatMax, squatInc));
            $('#squat_3week_3').html(threeMax.weekThree(squatMax, squatInc));
            break;
        case "fiveMax":
            $('#dead_3week_1').html(fiveMax.weekOne(deadMax, deadInc)); 
            $('#dead_3week_2').html(fiveMax.weekTwo(deadMax, deadInc));
            $('#dead_3week_3').html(fiveMax.weekThree(deadMax, deadInc));
            
            $('#bench_3week_1').html(fiveMax.weekOne(benchMax, benchInc));
            $('#bench_3week_2').html(fiveMax.weekTwo(benchMax, benchInc));
            $('#bench_3week_3').html(fiveMax.weekThree(benchMax, benchInc));
            
            $('#squat_3week_1').html(fiveMax.weekOne(squatMax, squatInc));
            $('#squat_3week_2').html(fiveMax.weekTwo(squatMax, squatInc));
            $('#squat_3week_3').html(fiveMax.weekThree(squatMax, squatInc));
            break;
        }
    } else{ //for four day chart
        switch($('input[name=repMax]:checked').attr('id')){
        case "oneMax":
            $('#OHP_4week_1').html(oneMax.weekOne(ohpMax, ohpInc)); 
            $('#OHP_4week_2').html(oneMax.weekTwo(ohpMax, ohpInc));
            $('#OHP_4week_3').html(oneMax.weekThree(ohpMax, ohpInc));
            
            $('#dead_4week_1').html(oneMax.weekOne(deadMax, deadInc)); 
            $('#dead_4week_2').html(oneMax.weekTwo(deadMax, deadInc));
            $('#dead_4week_3').html(oneMax.weekThree(deadMax, deadInc));

            $('#bench_4week_1').html(oneMax.weekOne(benchMax, benchInc));
            $('#bench_4week_2').html(oneMax.weekTwo(benchMax, benchInc));
            $('#bench_4week_3').html(oneMax.weekThree(benchMax, benchInc));
            
            $('#squat_4week_1').html(oneMax.weekOne(squatMax, squatInc));
            $('#squat_4week_2').html(oneMax.weekTwo(squatMax, squatInc));
            $('#squat_4week_3').html(oneMax.weekThree(squatMax, squatInc));
            break;
        case "threeMax":
            $('#OHP_4week_1').html(threeMax.weekOne(ohpMax, ohpInc)); 
            $('#OHP_4week_2').html(threeMax.weekTwo(ohpMax, ohpInc));
            $('#OHP_4week_3').html(threeMax.weekThree(ohpMax, ohpInc));
            
            $('#dead_4week_1').html(threeMax.weekOne(deadMax, deadInc)); 
            $('#dead_4week_2').html(threeMax.weekTwo(deadMax, deadInc));
            $('#dead_4week_3').html(threeMax.weekThree(deadMax, deadInc));
            
            $('#bench_4week_1').html(threeMax.weekOne(benchMax, benchInc));
            $('#bench_4week_2').html(threeMax.weekTwo(benchMax, benchInc));
            $('#bench_4week_3').html(threeMax.weekThree(benchMax, benchInc));
            
            $('#squat_4week_1').html(threeMax.weekOne(squatMax, squatInc));
            $('#squat_4week_2').html(threeMax.weekTwo(squatMax, squatInc));
            $('#squat_4week_3').html(threeMax.weekThree(squatMax, squatInc));
            break;
        case "fiveMax":
            $('#OHP_4week_1').html(fiveMax.weekOne(ohpMax, ohpInc)); 
            $('#OHP_4week_2').html(fiveMax.weekTwo(ohpMax, ohpInc));
            $('#OHP_4week_3').html(fiveMax.weekThree(ohpMax, ohpInc));
            
            $('#dead_4week_1').html(fiveMax.weekOne(deadMax, deadInc)); 
            $('#dead_4week_2').html(fiveMax.weekTwo(deadMax, deadInc));
            $('#dead_4week_3').html(fiveMax.weekThree(deadMax, deadInc));
            
            $('#bench_4week_1').html(fiveMax.weekOne(benchMax, benchInc));
            $('#bench_4week_2').html(fiveMax.weekTwo(benchMax, benchInc));
            $('#bench_4week_3').html(fiveMax.weekThree(benchMax, benchInc));
            
            $('#squat_4week_1').html(fiveMax.weekOne(squatMax, squatInc));
            $('#squat_4week_2').html(fiveMax.weekTwo(squatMax, squatInc));
            $('#squat_4week_3').html(fiveMax.weekThree(squatMax, squatInc));
            break;
        }
    }
}

/*-------------------hide show accessory list--------------*/
$(".listCategory").children("ul").hide(); //deals with hide/show toggling of accessory list and expand/hide button toggle
$('.listTitle').on("click", function() {
    $(this).parent().children("ul").slideToggle(300, function () { //toggles the list of accessories, then swaps hide/expand 'buttons'
    if ($(this).is(":visible")) {
        $(this).parent().find(".toggleHolder").html("Hide");
    } else {
        $(this).parent().find(".toggleHolder").html("Expand");
    }
    });
});


/*------------------------ add accessories to clicked area ------------------------*/
$('#dead_3week_a, #bench_3week_a, #squat_3week_a, #OHP_4week_a, #bench_4week_a, #squat_4week_a, #dead_4week_a').on("click", function(){ //adds or removes class to accessory table slot when clicked "selects it"
   if ( $(this).hasClass("selectedAccessory")){
        $(this).removeClass("selectedAccessory");
   }else{
    $('#dead_3week_a, #bench_3week_a, #squat_3week_a, #OHP_4week_a, #bench_4week_a, #squat_4week_a, #dead_4week_a').removeClass("selectedAccessory");
    $(this).addClass("selectedAccessory");
   }
});

//add item
var remove = '';
$(".addItem").on("click", function(){ //adds the corresponding accessory to the selected (class added) accessory table slot
    var accessoryText = $(this).parent().children('a').html(); //adds the corresponding text to the accesoryText var
    $('.selectedAccessory').append(accessoryText + '<br>'); //appends it to the table cell with a <br> tag
})
//remove item
$(".removeItem").on("click", function(){ //removes the corresponding accessory from selected table slot
    var remove = $(this).parent().children('a').html() + '<br>'; //sets the name + a break into the remove var
    var string = $('.selectedAccessory').html(); //puts all of the html (accessories) in the selected accessory cellinto the string var
    var newString = string.replace(remove, ''); //creates a new string my replacing the remove var with '' in the string var
    $('.selectedAccessory').html(newString); //the new string replaces the existing string in the table cell
    
});