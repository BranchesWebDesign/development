<?php
/*
    Plugin Name: NotifyVisitors - Notification automation tool for Wordpress
    Plugin URI: http://www.notifyvisitors.com
    Description: Simplest tool to create and show notifications on site based on visitor behaviour. Select from multiple targeting rules including visitor duration or frequency, browser or device type, url source, time of the day and many more. For example, show feature announcement or site maintenance notification. Show notification to visitors coming through specific adword campaign. Schedule notification during specific time of the day and many more. To get started: 1) Get your key by registering your site at <a target="_blank" href="http://www.notifyvisitors.com">notifyvisitors.com</a>, 2) Enter your key on the <a target='_blank' href='options-general.php?page=notifyvisitors-plugin'>Settings->notifyVisitors</a> menu, and 3) Click on the Activate link to the left of this description.
    Version: 1.0
    Author: notifyVisitors
    Author URI: http://www.notifyvisitors.com
*/

// Version check
global $wp_version;
if(!version_compare($wp_version, '3.0', '>='))
{
    die("notifyVisitors requires WordPress 3.0 or above. <a target='_blank' href='http://codex.wordpress.org/Upgrading_WordPress'>Please update!</a>");
}
// END - Version check


//this is to avoid getting in trouble because of the
//wordpress bug http://core.trac.wordpress.org/ticket/16953
$notifyvisitors_file = __FILE__; 

if ( isset( $mu_plugin ) ) { 
    $notifyvisitors_file = $mu_plugin; 
} 
if ( isset( $network_plugin ) ) { 
    $notifyvisitors_file = $network_plugin; 
} 
if ( isset( $plugin ) ) { 
    $notifyvisitors_file = $plugin; 
} 

$GLOBALS['notifyvisitors_file'] = $notifyvisitors_file;


// Make sure class does not exist already.
if(!class_exists('NotifyVisitors')) :

    class NotifyVisitorsWidget extends WP_Widget {
        function NotifyVisitorsWidget() {
            parent::WP_Widget(false, 'NotifyVisitors Widget', array('description' => 'Description'));
        }

        function widget($args, $instance) {
            echo '<div id="notifyvisitors_widget"></div>';
        }

        function update( $new_instance, $old_instance ) {
            // Save widget options
            return parent::update($new_instance, $old_instance);
        }

        function form( $instance ) {
            // Output admin widget options form
            return parent::form($instance);
        }
    }

    function notifyvisitors_widget_register_widgets() {
        register_widget('NotifyvisitorsWidget');
    }

    // Declare and define the plugin class.
    class NotifyVisitors
    {
        // will contain id of plugin
        private $plugin_id;
        // will contain option info
        private $options;

        /** function/method
        * Usage: defining the constructor
        * Arg(1): string(alphanumeric, underscore, hyphen)
        * Return: void
        */
        public function __construct($id)
        {
            // set id
            $this->plugin_id = $id;
            // create array of options
            $this->options = array();
            // set default options
            $this->options['secretkey'] = '';            
            $this->options['brandID'] = '';

            /*
            * Add Hooks
            */
            // register the script files into the footer section
            add_action('wp_footer', array(&$this, 'notifyvisitors_scripts'));
            // initialize the plugin (saving default options)
            register_activation_hook(__FILE__, array(&$this, 'install'));
            // triggered when plugin is initialized (used for updating options)
            add_action('admin_init', array(&$this, 'init'));
            // register the menu under settings
            add_action('admin_menu', array(&$this, 'menu'));
            // Register sidebar widget
            add_action('widgets_init', 'notifyvisitors_widget_register_widgets');

           
        }

        /** function/method
        * Usage: return plugin options
        * Arg(0): null
        * Return: array
        */
        private function get_options()
        {
            // return saved options
            $options = get_option($this->plugin_id);
            return $options;
        }
        /** function/method
        * Usage: update plugin options
        * Arg(0): null
        * Return: void
        */
        private function update_options($options=array())
        {
            // update options
            update_option($this->plugin_id, $options);
        }

        /** function/method
        * Usage: helper for loading notifyvisitors.js
        * Arg(0): null
        * Return: void
        */
        public function notifyvisitors_scripts()
        {
            if (!is_admin()) {
                $options = $this->get_options();
                $secretkey = trim($options['secretkey']);
                $brandID = trim($options['brandID']);
                $this->show_notifyvisitors_reward_js($secretkey,$brandID);
            }
        }
        
        public function show_notifyvisitors_reward_js($secretkey="",$brandID="")
        {        	
            //$current_user = wp_get_current_user(); //display_name, user_email, ID
            //$t = time(); 
            $bid = $brandID; 
            $secKey = $secretkey; 
            //$setUserEmail = $current_user->data->user_email;// the user email id
            /* Optional parameters if passing email id as well */
            //$fname = $current_user->data->display_name;//first name of customer		
            //$md5SecretKey = strtoupper(md5($secKey.'|'.$bid.'|'.$t.'|'.$setUserEmail));
            //echo 'alert(hello)';
            echo "<div id='notifyvisitorstag'></div>
            <script>	
            var notify_visitors = window.notify_visitors || {}; (function() { 
                    notify_visitors.auth = { bid_e : '".$secKey."',
                    bid : '".$bid."', t : '420' };	
            var script = document.createElement('script');script.async = true;
                script.src = (document.location.protocol == 'https:' ? '//d2933uxo1uhve4.cloudfront.net' : '//cdn.notifyvisitors.com') + '/js/notify-visitors-1.0.js';
                var entry = document.getElementsByTagName('script')[0];entry.parentNode.insertBefore(script, entry); })();
            </script>";
                        
        }

        /** function/method
        * Usage: helper for hooking activation (creating the option fields)
        * Arg(0): null
        * Return: void
        */
        public function install()
        {
            $this->update_options($this->options);
        }
        
        /** function/method
        * Usage: helper for hooking (registering) options
        * Arg(0): null
        * Return: void
        */
        public function init()
        {
            register_setting($this->plugin_id.'_options', $this->plugin_id);
        }
                
        /** function/method
        * Usage: show options/settings form page
        * Arg(0): null
        * Return: void
        */
        public function options_page()
        {
            if (!current_user_can('manage_options'))
            {
                wp_die( __('You can manage options from the Settings->NotifyVisitors Options menu.') );
            }

            // get saved options
            $options = $this->get_options();
            $updated = false;

            if ($updated) {
                $this->update_options($options);
            }
            include('notifyvisitors_options_form.php');
        }
        /** function/method
        * Usage: helper for hooking (registering) the plugin menu under settings
        * Arg(0): null
        * Return: void
        */
        public function menu()
        {
            add_options_page('NotifyVisitors Options', 'NotifyVisitors', 'manage_options', $this->plugin_id.'-plugin', array(&$this, 'options_page'));
        }
    }

    // Instantiate the plugin
    $NotifyVisitors = new NotifyVisitors('notifyvisitors');

// END - class exists
endif;
?>