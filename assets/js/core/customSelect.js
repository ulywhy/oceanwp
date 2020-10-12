( function( owp ) {
	owp( function() {
		"use strict";
		// Custom select
		oceanwpCustomSelects();
	} );
} )( oceanWP );

/* ==============================================
CUSTOM SELECT
============================================== */
function oceanwpCustomSelects() {
	"use strict"

	jQuery( oceanwpLocalize.customSelects ).customSelect( {
		customClass: 'theme-select'
	} );

}