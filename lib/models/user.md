The User
========


On page load the app will assign the user a session id. If he is logged in it will link it to it.
If not the user's actions are still recorded (as necessary) and if he decides to sign up/sign in the two are merged.
(If he signs in it is a non overwriting merge) This means that someone could write up a comment.
However to publish it they will need an account. To take away the headache the post is linked to the current session and
as he signs in/up the post is automagically assigned as his and he can then publish it.