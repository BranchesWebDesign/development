<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('WP_CACHE', true); //Added by WP-Cache Manager
define( 'WPCACHEHOME', '/home1/branchiz/public_html/brancheswebsolutions/blog/wp-content/plugins/wp-super-cache/' ); //Added by WP-Cache Manager
define('DB_NAME', 'branchiz_wor2');

/** MySQL database username */
define('DB_USER', 'branchiz_wor2');

/** MySQL database password */
define('DB_PASSWORD', 'qIgO8hl2');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

define('WP_HOME','http://www.brancheswebsolutions.com/blog/');
define('WP_SITEURL','http://www.brancheswebsolutions.com/blog/');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '.Sjkc%11.-,-kE9`lX3B:S4aOkp[kv%B!k9B<-cp-c&%R3+uBpVwmXn:UkQ^9E>3');
define('SECURE_AUTH_KEY',  'EXK}8AvMT} &5=6UJi<$8*kSQWQLX| o+k$Cxej^[9S#.$v#M:~N:xYzJlb>UTVF');
define('LOGGED_IN_KEY',    '^-2kr51|Q6u}K4^`COP|hA%GA_23({.w:ZY](|8z+E{jD4e_KhFFi!q+$gB]5sS|');
define('NONCE_KEY',        'fv2%{~gWf&(/OnA7FY)|tc`ZBoS~+`-Dqa_?|%Gp_bmvlIwvs*j7|(9;*5]i$x);');
define('AUTH_SALT',        '``{hwc{ayJq}DU-,zPga2}ALci}%|qI?{p81=NCQu{u%kp%=#Tts]3EpMl20?G,$');
define('SECURE_AUTH_SALT', '+n-rbiXz;uPH-O(kaZ?JRaa#(CQ:<3U~Y<Pkfe{90`MBbw>$dBUpbE]4(b(<ff#4');
define('LOGGED_IN_SALT',   '&@z/Bt,h{1m)6lp>+5H:qH )3F8KnQg6u(GJt-y#+vdW6QI2R-^95f^?5OW? x{$');
define('NONCE_SALT',       'W?|lcuB+1 sGX*kX|-9%2^C%oLVo$mU:GO,7WBM?8k*;B]1t`S9$dzL-<871i;+A');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'apy_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
