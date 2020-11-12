<?php
/**
 * Archive product template.
 *
 * @package OceanWP WordPress theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $product, $post;

do_action( 'ocean_before_archive_product_item' );

echo '<ul class="woo-entry-inner clr">';

// Get elements.
$elements = oceanwp_woo_product_elements_positioning();

	// Loop through elements.
foreach ( $elements as $element ) {

	// Image.
	if ( 'image' === $element ) {

		echo '<li class="image-wrap">';

		do_action( 'ocean_before_archive_product_image' );
		if ( class_exists( 'OceanWP_WooCommerce_Config' ) ) {
			OceanWP_WooCommerce_Config::add_out_of_stock_badge();
		}
		woocommerce_show_product_loop_sale_flash();
		if ( class_exists( 'OceanWP_WooCommerce_Config' ) ) {
			OceanWP_WooCommerce_Config::loop_product_thumbnail();
		}
		do_action( 'ocean_after_archive_product_image' );

		echo '</li>';

	}

	/*
	* ULYWHY: eliminamos categorias del producto para los distribuiodres
	*/
			// Category.
	//if ( 'category' === $element){
	if ( 'category' === $element && !is_distribuidor_id($product->get_id())) {
	/*
	 * FIN
	 */
		do_action( 'ocean_before_archive_product_categories' );
		echo wp_kses_post( wc_get_product_category_list( $product->get_id(), ', ', '<li class="category">', '</li>' ) );
		do_action( 'ocean_after_archive_product_categories' );

	}

	// Title.
	if ( 'title' === $element ) {

		do_action( 'ocean_before_archive_product_title' );
		echo '<li class="title">';
			do_action( 'ocean_before_archive_product_title_inner' );
		/*
		 * ULYWHY: eliminamos links a paginas de producto para los distribuiodres
		 */
			if(is_distribuidor_id($product->get_id())){
				//elimina el sufijo 'MAY' del nombre del producto
				//echo esc_html( get_the_title() );
				echo '<h2>'. esc_html( str_replace('May', '', get_the_title()) ). '</h2>' ;
			}else{
				echo '<a href="' . esc_url( get_the_permalink() ) . '">' . esc_html( get_the_title() ) . '</a>';
			}
		/*
		 * FIN
		 */
			do_action( 'ocean_after_archive_product_title_inner' );
		echo '</li>';

		do_action( 'ocean_after_archive_product_title' );

	}

	// Price/Rating.
	if ( 'price-rating' === $element ) {

		do_action( 'ocean_before_archive_product_inner' );

		echo '<li class="inner">';
			do_action( 'ocean_before_archive_product_price' );
			woocommerce_template_loop_price();
			do_action( 'ocean_before_archive_product_rating' );
			woocommerce_template_loop_rating();
			do_action( 'ocean_after_archive_product_rating' );
		echo '</li>';

		do_action( 'ocean_after_archive_product_inner' );

	}

	// Description.
	if ( 'description' === $element ) {

		do_action( 'ocean_before_archive_product_description' );

		if ( ( oceanwp_is_woo_shop() || oceanwp_is_woo_tax() )
			&& get_theme_mod( 'ocean_woo_grid_list', true ) ) {
			$length = get_theme_mod( 'ocean_woo_list_excerpt_length', '60' );
			echo '<li class="woo-desc">';
			if ( ! $length ) {
				echo wp_kses_post( strip_shortcodes( $post->post_excerpt ) );
			} else {
				echo wp_trim_words( strip_shortcodes( $post->post_excerpt ), $length ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			echo '</li>';
		}

		do_action( 'ocean_after_archive_product_description' );

	}

	// Add to cart button.
	if ( 'button' === $element ) {

		do_action( 'ocean_before_archive_product_add_to_cart' );

		echo '<li class="btn-wrap clr">';

			do_action( 'ocean_before_archive_product_add_to_cart_inner' );

			woocommerce_template_loop_add_to_cart();


			do_action( 'ocean_after_archive_product_add_to_cart_inner' );

		echo '</li>';

		do_action( 'ocean_after_archive_product_add_to_cart' );

	}
}

echo '</ul>';

do_action( 'ocean_after_archive_product_item' );
