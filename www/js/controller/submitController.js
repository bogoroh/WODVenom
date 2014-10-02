/// =====================================================================================
/// 							SUBMIT CONTROLLER
/// =====================================================================================

url.controller('submitCtrl',['$scope','$location','$firebase','$rootScope','$routeParams',function($scope,$location,$firebase,$rootScope,$routeParams){
	var ref = new Firebase('https://wodvenom.firebaseio.com/wods/'+$routeParams.id);
	var refUser = new Firebase('https://wodvenom.firebaseio.com/wods/'+$routeParams.id);
	$scope.wod = $firebase(ref).$asObject();
	$scope.newScore = {
		level:"rx"
	};

	$scope.newScore.user = $rootScope.loginObj.user.displayName;
	$scope.newScore.gender = $rootScope.loginObj.user.thirdPartyUserData.gender;
	$scope.newScore.time = $scope.wod.time;
	$scope.wod.$loaded().then(function(){
		//console.log($scope.wod.time);
		
		var dateSplit = $scope.wod.time;
		var tempArray = [];
		// Function to change / to - so it won't filter this in the firebase
		function reverse(dateSplit){
			$scope.newScore.date = dateSplit.split("/");
			var tempDay = $scope.newScore.date[1];
			var tempMonth = $scope.newScore.date[0];
			var tempYear = $scope.newScore.date[2];
			tempArray.push(tempYear,tempMonth,tempDay);
			$scope.newScore.date = tempArray.join('/');
			tempArray = [];
		}

		reverse(dateSplit);

		var refscores = new Firebase('https://wodvenom.firebaseio.com/scores/'+$scope.newScore.date);
		$scope.score = $firebase(refscores).$asArray();
	});

	// Function to submit your local score.
	$scope.submitScore = function()
	{
		// When the user submits their score they're beeing redirected to the mainpage
		console.log($scope.newScore);
		$scope.newScore.purl = $scope.loginObj.user.thirdPartyUserData.picture.data.url;
		var intTime = $scope.newScore.time.split(":").join('');
		$scope.newScore.intTime = Number(intTime);
		$scope.score.$add($scope.newScore).then(function(){
			$scope.newScore = {};
			$location.path('user');
		});
	}
	// New ref for comments
	var commentRef = new Firebase('https://wodvenom.firebaseio.com/wods/'+$routeParams.id+"/comments");
	$scope.comments = $firebase(commentRef).$asArray();


	// Save the facebook username to be displayed in the comment
	var userName = $rootScope.loginObj.user.displayName;
	$scope.newComment = {};
	$scope.newComment.username = userName;
	$scope.newComment.id = $routeParams.id;

	// Function to Add comment to a workout
	$scope.addComment = function(e){
		if (e.keyCode != 13){
			return;
		} 
		$scope.comments.$add($scope.newComment).then(function(){
			$scope.newComment = '';
		});
		
	}
}]);