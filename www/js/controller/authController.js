/// =====================================================================================
/// 							AUTH LOGIN
/// =====================================================================================

url.run(['$firebase','$firebaseSimpleLogin','$location','$rootScope',function($firebase,$firebaseSimpleLogin,$location,$rootScope){
	var ref = new Firebase("https://wodvenom.firebaseio.com");
	
	
    $rootScope.loginObj = $firebaseSimpleLogin(ref);

    // User is logged on
    $rootScope.$on("$firebaseSimpleLogin:login",function(e,user){
    	console.log(user);
    	var refUser = new Firebase("https://wodvenom.firebaseio.com/users/"+user.uid);
    	$rootScope.currentUser = $firebase(refUser).$asObject();
    	$rootScope.currentUser.$loaded(function(data){
    		if(data.$value === null){
    			$rootScope.currentUser.pictureUrl = user.thirdPartyUserData.picture.data.url;
		    	$rootScope.currentUser.$save().then(function(){
					console.log("New picure created", $rootScope.currentUser)
				});
    		}

    	})
    	
    	$location.path('/user');

    });

    // User is logged out.
    $rootScope.$on("$firebaseSimpleLogin:logout",function(e,user){
    	console.log(user);

    	$location.path('/login');

    });

}])
