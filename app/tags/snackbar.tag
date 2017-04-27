<snackbar>
	<div>{ opts.content }</div>

<script>


</script>
<style>
/* The snackbar - position it at the bottom and in the middle of the screen */
snackbar {
    visibility: hidden; /* Hidden by default. Visible on click */
    min-width: 250px; /* Set a default minimum width */
    margin-left: -125px; /* Divide value of min-width by 2 */
    background-color: #fff; /* Black background color */
    color: #333; /* White text color */
    text-align: center; /* Centered text */
    border-radius: 2px; /* Rounded borders */
    padding: 16px; /* Padding */
    position: fixed; /* Sit on top of the screen */
    z-index: 1000000; /* Add a z-index if needed */
    left: 50%; /* Center the snackbar */
    bottom: 15px; /* 30px from the bottom */
	box-shadow: 0px 0px 12px 0px grey;

}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
snackbar.show {
    visibility: visible; /* Show the snackbar */

/* Add animation: Take 0.5 seconds to fade in and out the snackbar. 
However, delay the fade out process for 2.5 seconds */
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 15px; opacity: 1;}
}

@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 15px; opacity: 1;}
}

@-webkit-keyframes fadeout {
    from {bottom: 15px; opacity: 1;} 
    to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
    from {bottom: 15px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
}
</style>
</snackbar>