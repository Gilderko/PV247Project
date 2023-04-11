# Task 08 - Async

Your task for this lesson is to practice work with asynchronous code and Firebase services.

## Initialization

1. Create Firebase project with Email/Password authentication and Cloud Firestore setup.
1. Correctly initialize firebase app with your `firebaseConfig`.

Use these rules for Firestore database config.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

> These rules will make sure that not logged in users will be able to only read the data, and logged in user will also be able to write data.

## Reviews

- Hide `Add review` button for not logged in users.
- Limit reviews to one per user by hiding the `Add review` button if a logged in user already has a review.
- Change how a review is submitted. Instead of using `addDoc` that automatically generated a random id for the document, use the `setDoc` function (that accepts a `DocumentReference`) and use the user email as an id.
- In the `ReviewPreview` add option for users to delete their own review (again check against logged in user).
- Add new section with 3 latest reviews to the bottom of the home page with link to all reviews.

## Matches

- Add a `matchesCollection` to `utils/firebase.ts`. Matches should contain duration, final board state, winner, submission date and optional user email that will be auto-filled if user is logged in.
- Implement match duration tracker and automatic submitting of matches after match ends in `useGame`.
- Add simple cards showing last 3 finished matches on bottom of the `Home` page with link to new `/matches` page.
- Create new `/matches` route that will list all previous matches with a board preview and all available info.

## Hints

- Use the `reviewsDocument` helper to get a `DocumentReference` where necessary
- Use `Board` component in `readOnly` mode with `initialBoard` set to show finished game state in `/matches`
- Buttons for cards can be placed inside `CardActions` component
- To get current time use the `Timestamp.now()` function from `firebase/firestore`
