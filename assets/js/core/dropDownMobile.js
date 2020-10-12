var $j      = jQuery.noConflict(),
	$window = $j( window );

( function( owp ) {
	owp( function() {
		"use strict";
		// Drop down mobile menu
		oceanwpDropDownMobile();
	} );
} )( oceanWP );

/* ==============================================
DROPDOWN MOBILE SCRIPT
============================================== */
function oceanwpDropDownMobile() {
	'use strict';

	if( oceanWP( 'body' ).hasClass( 'dropdown-mobile' ) ) {

		// Open drop down menu
		oceanWP( '.mobile-menu' ).on( 'click', function() {
			// @todo SlideToggle is not yet converted to VJS
			$j( '#mobile-dropdown' ).slideToggle( 500 );
			oceanWP( this ).toggleClass( 'opened' );
			oceanWP( '.mobile-menu > .hamburger' ).toggleClass( 'is-active' );
			return false;
		} );

		// Close menu function
		var oceanwpDropDownMobileClose = function( e ) {
				// @todo slideUp is not yet converted to VJS
				$j( '#mobile-dropdown' ).slideUp( 200 );
				oceanWP( '.mobile-menu' ).removeClass( 'opened' );
				oceanWP( '.mobile-menu > .hamburger' ).removeClass( 'is-active' );
			},
			$owpmenu                   = oceanWP( '.mobile-menu > .hamburger' ),
			isMenuOpen                 = false;

		$owpmenu.on( 'click', function() {
			isMenuOpen = !isMenuOpen;
			$owpmenu.attr( 'aria-expanded', isMenuOpen );
		} );

		// Declare useful vars
		var $hasChildren = $j( '#mobile-dropdown .menu-item-has-children' );

		// Add dropdown toggle (plus)
		$hasChildren.children( 'a' ).append( '<span class="dropdown-toggle"></span>' );


		// Check localization
		// Toggle dropdowns
		var $dropdownTargetSelector = ( oceanwpLocalize.sidrDropdownTarget == 'link' ) ? '#mobile-dropdown li.menu-item-has-children > a' : '.dropdown-toggle',
			$dropdownTarget         = oceanWP( $dropdownTargetSelector );

		// Add toggle click event
		$dropdownTarget.on( 'tap click', function() {
			var $toggleParentLi = ( oceanwpLocalize.sidrDropdownTarget == 'link' ) ? $j( this )
				.parent( 'li' ) : $j( this ).parent( 'a' ).parent( 'li' );

			// Get parent items and dropdown
			var $allParentLis = $toggleParentLi.parents( 'li' );

			// Toogle items
			if( !$toggleParentLi.hasClass( 'active' ) ) {
				$hasChildren.not( $allParentLis ).removeClass( 'active' ).children( 'ul' ).slideUp( 'fast' );
				$toggleParentLi.addClass( 'active' ).children( 'ul' ).slideDown( 'fast' );
			} else {
				$toggleParentLi.removeClass( 'active' ).children( 'ul' ).slideUp( 'fast' );
			}

			// Return false
			return false;

		} );

		// Close menu
		$j( document ).on( 'click', function() {
			oceanwpDropDownMobileClose();
		} ).on( 'click', '#mobile-dropdown', function( e ) {
			e.stopPropagation();
		} );

		// Close on resize
		$window.resize( function() {
			if( $window.width() >= 960 ) {
				oceanwpDropDownMobileClose();
			}
		} );

		// Close menu if anchor link
		$j( '#mobile-dropdown li a[href*="#"]:not([href="#"])' ).on( 'click', function() {
			oceanwpDropDownMobileClose();
		} );

	}

}

( function() {

	var owpHeader = document.getElementById( 'site-header' ),
		navWarap  = document.querySelectorAll( '#mobile-dropdown nav' )[ 0 ];
	if( !owpHeader || !navWarap ) {
		return;
	}

	document.addEventListener( 'keydown', function( event ) {

		var selectors = 'input, a, button',
			elements  = navWarap.querySelectorAll( selectors ),
			closMenu  = document.querySelector( '.mobile-menu.opened' ),
			lastEl    = elements[ elements.length - 1 ],
			firstEl   = elements[ 0 ],
			activeEl  = document.activeElement,
			tabKey    = event.keyCode === 9,
			shiftKey  = event.shiftKey;


		if( !shiftKey && tabKey && lastEl === activeEl ) {
			event.preventDefault();
			closMenu.focus();
		}

		if( shiftKey && tabKey && firstEl === activeEl ) {
			event.preventDefault();
			closMenu.focus();
		}

		if( shiftKey && tabKey && closMenu === activeEl ) {
			event.preventDefault();
			lastEl.focus();
		}

	} );

}() );