/// =====================================================================================
/// 							HOME CONTROLLER
/// =====================================================================================

url.controller('homeCtrl',['$scope','$firebase',function($scope,$firebase){
	var refb = new Firebase('https://wodvenom.firebaseio.com/bwods/');
	var ref = new Firebase('https://wodvenom.firebaseio.com/wods/');
	var refl = new Firebase('https://wodvenom.firebaseio.com/scores/');
	$scope.bwods = $firebase(refb).$asObject();
	$scope.wods = $firebase(ref).$asArray();
	$scope.scores = $firebase(refl).$asObject();
	$scope.radioModel = 'male';

	
	// Preset for the model to be used
	$scope.leader = {
		day:"01",
		month:"01",
		year:"2014"
	};

	// Functions that will find the leader based on the date provided
	function searchNewScoreDate () {
		var searchScoreDate = new Firebase('https://wodvenom.firebaseio.com/scores/'+$scope.leader.year+"/"+$scope.leader.month+"/"+$scope.leader.day);
		$scope.searchScoreDate = $firebase(searchScoreDate).$asArray();
		
		console.log($scope.searchScoreDate);
	};

	$scope.searchDay = function (){
		searchNewScoreDate();
	}

	$scope.searchMonth = function (){
		searchNewScoreDate();
	}

	$scope.searchYear = function (){
		searchNewScoreDate();
	}

}]);