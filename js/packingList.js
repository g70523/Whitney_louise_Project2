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
		if($('userForm').prefer.checked){
			checkBoxValue = $('userForm').prefer.value;
			}else{
			checkBoxValue = "Driving";
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
        
function displayData(n){
		switch(n){
			case "on":
				$('userForm').style.display = "none";
				$('clearUser').style.display = "inline";
				$('showUser').style.display = "none";
				$('addUser').style.display = "inline";
				break;
			case "off":	
				$('userForm').style.display = "block";
				$('clearUser').style.display = "inline";
				$('showUser').style.display = "inline";
				$('addUser').style.display = "none";
				$('users').style.display = "none";
				break;
		}
	}

        
function saveUser(key){
                if (!key){
                         var keyNum = Math.floor(Math.random()*1000001111);
                }else{
                         keyNum = key;     
                }
		radioButton();
		checkBox();
		var data = {};
			data.fname		 = ["Users First Name", $('firstname').value];
			data.lname 		 = ["Users Last Name", $('lastname').value];
			data.email 		 = ["Users Email Address", $('eml').value];
			data.telephone 		 = ["Users Telephone Number", $('tele').value];
			data.usersSex 		 = ["This User is a", radioButton()];
			data.trips 		 = ["Amount of user Trips", $('points').value];
			data.preference          = ["Users Prefered Method of Travel is", checkBoxValue];
			data.input 		 = ["Users Favorite Spots", $('userForm').textBox.value];
                        data.date                = ["Users Next Travel Date", $('travelDate').value];
			data.length              = ["Users Travel Length", $('choose').value];
                        
	var newInfo = localStorage.setItem(keyNum, JSON.stringify(data));
		if (!key) {
                        alert("You Have Created A New User!");        //code
                }else{
                        alert("User Data Saved Sucessfully!");
                }
                
		window.location.reload();
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
                displayData("on");
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
                        var editLi = document.createElement('li');
			myUl.appendChild(myLi);
                        myLi.appendChild(editLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var showData = JSON.parse(value);
			var myUser = document.createElement('ul');
			myLi.appendChild(myUser);
			for(var n in showData){
				var myUser = document.createElement('li');
				myUser.setAttribute("class", "show");
				myLi.appendChild(myUser);
				var userInfo = showData[n][0]+" - "+showData[n][1];
				myUser.innerHTML = userInfo;
				
			}
                        editButtons(localStorage.key(i), editLi);
		}
	}
}

function editButtons(key, editLi){
		editLi.style.marginTop = "10px";
		editLi.style.marginBottom = "10px";
		var change = document.createElement('a');
		    change.href = "#";
		change.key = key;
		change.style.paddingRight = "10px";
		var editText = "EDIT USER";
		change.addEventListener("click", editUser);
		change.innerHTML = editText;
		editLi.appendChild(change);
		
               
		
		var delUser = document.createElement('a');
		    delUser.href = "#";
		delUser.key = key;
		
		
		var delUserText = "DELETE USER";
		delUser.addEventListener("click", delUserItem);
		delUser.innerHTML = delUserText;
		editLi.appendChild(delUser);
		
		
	}
        
function editUser(){
                
                displayData("off");
		var value = localStorage.getItem(this.key);
		var data = JSON.parse(value);
		
		$('firstname').value = data.fname[1];
		$('lastname').value = data.lname[1];
		$('eml').value = data.email[1];
		$('tele').value = data.telephone[1];
		var rad = $('userForm').sex.length;
		for(var i=0; i<rad.length; i++){
			if(rad[i].value == "male" && data.sex[1] == "male"){
				rad[i].setAttribute("checked", "checked");
			}else if(rad[i].value == "female" && data.sex[1] == "female"){
				rad[i].setAttribute("checked", "checked");
			}
		}
		if(data.preference[1] == "yes"){
			$('userPref').setAttribute("checked", "checked");
		}
			$('choose').value = data.length[1];
			$('userForm').textBox.value = data.input[1];
                        $('points').value = data.trips[1];
			$('travelDate').value = data.date[1];
			
		register.removeEventListener("click", saveUser);
		$('button').value = "EDIT USER";
		var edit = $('button');
		edit.addEventListener("click", validate);
		edit.key = this.key;
       }

function delUserItem(){
		var con = confirm("Do You Want To Delete This User?");
		if(con){
                        alert("User Information Has Been Deleted!");
			localStorage.removeItem(this.key);
			window.location.reload();
		}else{
			alert("No User Information Has been Deleted");
		}
	}

function validate(x) {
                        var userName 		= $('firstname');
			var userLast 		= $('lastname');
			var userEmail		= $('eml');
			var userPhone		= $('tele');		
			var messages 		= [];
			
                        messages.innerHTML = "";
		
			
			if(userName.value == ""){
                                alert("Please Enter Your First Name");
                                return;
			}
			if(userLast.value == ""){
                                alert("Please Enter Your Last Name");
                                return;
			}
			var emailVal = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
			if(!emailVal.exec(userEmail.value)){
                                alert("Please Enter a Valid Email Address");
                                return;
			}
			var phoneVal = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
			if(!phoneVal.exec(userPhone.value)){
                                alert("Please Enter a Valid Telephone Number");
                                return;
			}
			if(messages.length >= 1){
				for(i=0, j=messages.length; i<j; i++){
					var mes = document.createElement('li');
					mes.innerHTML = messages[i];
				}
				x.preventDefault();
				return false;
				
			}else{
				saveUser(this.key);
			}//code
}
        
var travelTime = ["--How long do you want to stay?--", "Overnight", "2 Nights", "3 Nights", "4 Nights", "5 Nights", "6 Nights", "One Week", "Two Weeks"];
    checkBoxValue = "Driving";
  




pickOne();






var register = $('button');
	register.addEventListener("click", validate);
var clear = $('clearUser');
	clear.addEventListener("click", deleteUser);
var show = $('showUser');
	show.addEventListener("click", viewUser);






});