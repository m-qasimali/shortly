rules_version = '2';

service cloud.firestore {
match /databases/{database}/documents {

    // This rule allows anyone with your Firestore database reference to view, edit,
    // and delete all data in your Firestore database. It is useful for getting
    // started, but it is configured to expire after 30 days because it
    // leaves your app open to attackers. At that time, all client
    // requests to your Firestore database will be denied.
    //
    // Make sure to write security rules for your app before that time, or else
    // all client requests to your Firestore database will be denied until you Update
    // your rules
    // match /{document=**} {
    //   allow read, write: if request.time < timestamp.date(2023, 9, 4);
    // }
    match /links/{link} {
    allow get: if link.size() == 6;
    allow create: if request.auth != null;
    allow delete: if request.auth != null;
    }


    match /users/{userId}/links/{link} {

    function isOwner(){
    	return request.auth != null && request.auth.uid == userId
    }

    function verifyRequiredFields(){
    	let incommingData = request.resource.data;
    	let keys = ['createdAt', 'longURL', 'shortCode', 'name','totalClicks'];
      // return true;
    	return incommingData.keys().hasOnly(keys);
    }

    function verifyFieldsTypes(){
    	let incommingData = request.resource.data;
      // return incommingData.totalClicks is number;
    	return incommingData.createdAt is timestamp &&
    	incommingData.longURL is string &&
    	incommingData.shortCode is string &&
    	incommingData.name is string &&
    	incommingData.totalClicks is number;
    }

    function verifyFieldsValues(){
    	let incommingData = request.resource.data;

    	return incommingData.createdAt < request.time &&
      				incommingData.name.size() >=3 && incommingData.name.size() <=15 &&
              incommingData.totalClicks == 0 &&
              incommingData.longURL.matches("/^(ht|f)tp(s?):\\/\\/[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*((0-9)*)*(\\/?)([a-zA-Z0-9\\-\\.\\?\\,\\'\\/\\\\+&=%\\$#_]*)?$/") == true &&
              incommingData.shortCode.size() == 6 && !exists(/databases/$(database)/documents/links/$(incommingData.shortCode));
    }

    function verifyLinkUpdate(){
    	let futureDoc = request.resource.data;
      let currentDoc = resource.data;

      return futureDoc.diff(currentDoc).affectedKeys().hasOnly(['totalClicks']) && futureDoc.totalClicks == currentDoc.totalClicks + 1;
    }

    allow read: if isOwner();
    allow delete: if isOwner();
    allow create: if isOwner() && verifyRequiredFields() && verifyFieldsTypes();
    allow update: if verifyLinkUpdate();
    }

}
}
