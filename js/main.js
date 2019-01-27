/*
 Copyright (c) 2017, Geert JM Vanderkelen
 */

var menuButton = document.getElementById('menu-button');
var menu = document.querySelector('.site-menu');
var narrowScreenWidth = 800;
var narrowScreen = window.innerWidth <= narrowScreenWidth;

var content = document.getElementById('content');
var siteNav = document.getElementById('site-nav');
var footer = document.getElementById('footer');

function hideSiteMenu() {
  menu.style.display = "none";
}

function showSiteMenu() {
  menu.style.display = "";
}

/**
 * Toggle the Site Menu
 *
 * This function will toggle the site menu based on various condition, force
 * example, window width.
 */
function toggleSiteMenu() {
  if (window.innerWidth > narrowScreenWidth) {
    // force showing the site menu
    showSiteMenu();
  } else {
    // force hiding; better than trying to figure out if we keep showing it
    hideSiteMenu();
  }
}

function moveFooter() {
  if (window.innerWidth > narrowScreenWidth) {
    siteNav.appendChild(footer);
  } else {
    content.appendChild(footer);
  }
}

function handleClicks(event) {
  var clickedInMenu = menu.contains(event.target);
  var clickedButton = menuButton.contains(event.target) || event.target == menuButton;

  if (clickedButton) {
    if (menu.style.display === "") {
      // hide menu
      hideSiteMenu();
    } else {
      showSiteMenu();
    }
  }

  // hide menu whenever we click outside menu and not on button
  if (!clickedInMenu && !clickedButton && narrowScreen) {
    hideSiteMenu();
  }
}

function handleWindowResize(event) {
  narrowScreen = window.innerWidth <= narrowScreenWidth;
  toggleSiteMenu();
  moveFooter();
}

// Main
(function() {
  toggleSiteMenu();
  moveFooter();
  window.addEventListener('click', handleClicks);
  window.addEventListener('resize', handleWindowResize, false);
})();
