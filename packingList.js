window.addEventListener("DOMContentLoaded", function(){

function $(x){
		var myElement = document.getElementById(x);
		return myElement;
	}
        
function radioButton(){
		var radio = $('userForm').sex.length;
		for(var i=0; i<radio; i++){
			if($('userForm').sex[i].checked){
				var userSex = $('userForm').sex[i].value;
				return userSex;
			}
		}
	}
        
function checkBox(){
		for(i=0, x=$('userForm').prefer.length; i<x; i++){
			if($('userForm').prefer[i].checked){
				var checkBoxValue = $('userForm').prefer[i].value;
				return checkBoxValue;

			}
		}
	}
        
function deleteUser(){
		if(localStorage.length === 0){
			alert("No Users Have Been Created Yet!");
		}else{
			var check = confirm("Are You Sure That You Want To Delete All User Information?");
				if(check==true){					
					alert("All user Information Has Been Deleted!");
                                        localStorage.clear();
				}else{
					alert("No User Information Has Been Deleted.");
				}
			
			location.reload();
		}
	}
        
function saveUser(){
		var keyNum = Math.floor(Math.random()*1000001111);
		radioButton();
		checkBox();
		var data = {};
			data.fname		 = ["Users First Name", $('firstname').value];
			data.lname 		 = ["Users Last Name", $('lastname').value];
			data.email 		 = ["Users Email Address", $('eml').value];
			data.telephone 		 = ["Users Telephone Number", $('tele').value];
			data.usersSex 		 = ["This User is a", radioButton()];
			data.trips 		 = ["Amount of user Trips", $('points').value];
			data.preference          = ["Users Prefered Method of Travel is", checkBox()];
			data.input 		 = ["Users Favorite Spots", $('userForm').textBox.value];
                        data.date                = ["Users Next Travel Date", $('travelDate').value];
			data.length              = ["Users Travel Length", $('choose').value];
                        
	var newInfo = localStorage.setItem(keyNum, JSON.stringify(data));
		alert("You Have Created A New User!")
		location.reload();
}

        
function pickOne(){
			var newTag = document.getElementsByTagName("form"); 
					newli = $('select');
					newSelect = document.createElement('select');
					newSelect.setAttribute("id", "choose");
				for(var i=0, x=travelTime.length; i<x; i++){
					var selectOption = document.createElement('option');
					var choices = travelTime[i];
					selectOption.setAttribute("value", choices);
					selectOption.innerHTML = choices;
					newSelect.appendChild(selectOption);
				}	
				newli.appendChild(newSelect);
			}


function viewUser(){
		if(localStorage.length === 0){
			alert("Currently there are no Users to view.");
		}else{
		var myDiv = document.createElement('div');
		myDiv.setAttribute("id", "users");
		var myUl = document.createElement('ul');
		myDiv.appendChild(myUl);
		$('nav').appendChild(myDiv);
		$('users');
		for(var i=0, x = localStorage.length; i<x; i++){
			var myLi = document.createElement('li');
			myUl.appendChild(myLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var showData = JSON.parse(value);
			var myUser = document.createElement('ul');
			myLi.appendChild(myUser);
			for(var n in showData){
				var myUser = document.createElement('li');
				myUser.setAttribute("class", "show");
				myLi.appendChild(myUser);
				var userInfo = showData[n][0]+". "+showData[n][1];
				myUser.innerHTML = userInfo;
				$('userForm').style.display = "none";
			}
		}
	}
}
var travelTime = ["--How long do you want to stay?--", "Overnight", "2 Nights", "3 Nights", "4 Nights", "5 Nights", "6 Nights", "One Week", "Two Weeks"];




pickOne();






var register = $('button');
	register.addEventListener("click", saveUser);
var clear = $('clearUser');
	clear.addEventListener("click", deleteUser);
var show = $('showUser');
	show.addEventListener("click", viewUser);






});