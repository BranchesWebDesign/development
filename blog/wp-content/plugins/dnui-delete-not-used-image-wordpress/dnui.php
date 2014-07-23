<?php

/*
  Plugin Name: DNUI (Delete not used images)
  Version: 1.2
  Plugin URI: http://www.nicearma.com/delete-not-used-image-wordpress-dnui/
  Author: Nicearma
  Author URI: http://www.nicearma.com/
  Text Domain: dnui
  Description: This plugin will delete all not used images file, the plugin search all image, not referred by any post and page of wordpress
 */

/*
  Copyright (c) 2014 http://www.nicearma.com
  Released under the GPL license
  http://www.gnu.org/licenses/gpl.txt
 */

include_once 'php/dnuiL.php';

add_action('admin_init', 'DNUI_js');
add_action('wp_enqueue_scripts', 'DNUI_js');
add_action('admin_menu', 'DNUI_option_menu');

function DNUI_option_menu() {
    if (function_exists('add_options_page')) {
        add_options_page('DNUI option', 'DNUI', 8, basename(__FILE__), 'DNUI_options');
    }
}

function DNUI_js() {
    wp_register_style('dnui-css', plugins_url('css/dnui.css', __FILE__));
    wp_register_script('dnui-js', plugins_url('js/dnui.js', __FILE__), array('backbone', 'jquery', 'jquery-ui-tabs'));
    
}

function DNUI_options() {
    include_once 'html/table.php';
    add_thickbox();
    wp_enqueue_style('dnui-css');
    wp_enqueue_script('dnui-js');
    ?>

    <p><?php _e('DNUI - Delete not used/unused image') ?></p>
   
    <div id="dnui_general">
        <ul>
            <li><a href="#dnui_tabs_db"><?php _e('Scan DATABASE') ?></a></li>
            <li><a href="#dnui_tabs_folder"><?php _e('Scan FOLDER') ?></a></li>
            <li><a href="#dnui_tabs_backup"><?php _e('Backup') ?></a></li>
             <li><a href="#dnui_tabs_option"><?php _e('Option') ?></a></li>
        </ul>
        <div class="tabDetails">
        <div id="dnui_tabs_db">
            <h1>DNUI search unused/used image in database</h1>
        </div>
        <div id="dnui_tabs_folder">
             <h1>DNUI search/scan folder upload</h1>
        </div>
        <div id="dnui_tabs_backup">
             <h1>DNUI backup</h1>
        </div>
        <div id="dnui_tabs_option">
             <h1>DNUI option</h1>
        </div>
            </div>
        
        
    </div>
    <?php
    
}

add_action('wp_ajax_dnui_all', 'DNUI_ajax_image');

function DNUI_ajax_image() {
    $validator=array_filter(DNUI_validator($_POST["option"]));
    if (empty($validator)){
       $out = DNUI_getImages($_POST["option"]["numberOfPage"], $_POST["option"]["cantInPage"],$_POST["option"]["order"]);
       $out= json_encode($out);
       DNUI_add_option($_POST["option"]);
    } else {
       $out= json_encode($validator);
    }
    echo $out;
    
    die();
}

function DNUI_add_option($options) {
    $validator=array_filter(DNUI_validator($options));
    
    if (empty($validator)) {
        $options=serialize($options);
        update_option("dnui_options",$options );
    }
}

add_action('wp_ajax_dnui_get_option', 'DNUI_get_option');

function DNUI_get_option() {
    //var_dump(unserialize(get_option("dnui_options")));
    echo json_encode(unserialize(get_option("dnui_options")));
        die();
}

function DNUI_transform_bool(&$var){
    if($var== 'true'){
        $var=true;
    }else{
        $var=false;
    }
}

function DNUI_validator(&$options) {
    $validator = array();
    DNUI_transform_bool($options["updateInServer"]);
    
    DNUI_transform_bool($options["scan"]);
    
    
    if (!(is_numeric($options["order"]))) {
       array_push($validator, "order is not good");  
    }else{
        if( ($options["order"] == 0 || $options["order"] == 1)){
            $options["order"]=  intval($options["order"]);
        }
       
    }
    if (!(is_numeric($options["numberOfPage"]) && $options["numberOfPage"] >= 0)) {
       array_push($validator, "numberOfPage is not good"); 
    }else{
         $options["numberOfPage"]=  intval($options["numberOfPage"]);
    }
    if (!(is_numeric($options["cantInPage"]) && $options["cantInPage"] >= 0)) {
        array_push($validator, "cantInPage is not good");
    }else{
          $options["cantInPage"]=  intval($options["cantInPage"]);
          if($options["cantInPage"]>100){
              $options["cantInPage"]=100;
          }
    }
     return $validator;
}

    add_action('wp_ajax_dnui_delete', 'DNUI_ajax_delete');

    function DNUI_ajax_delete() {
        
        if (!empty($_POST["imageToDelete"])) {
            $result=array_filter(DNUI_delete($_POST["imageToDelete"],unserialize(get_option("dnui_options"))));
            if(empty($out)){
              $out["isOk"]=true; 
            }else{
               $out["isOk"]=false;  
               $out["msg"]=$result; 
            }
            echo json_encode($out);
        }
        die();
    }
    
    
    add_action('wp_ajax_dnui_get_dirs', 'DNUI_ajax_get_dirs');

    function DNUI_ajax_get_dirs() {
        $base = wp_upload_dir();
        $base = $base['basedir'];
        echo json_encode(DNUI_get_all_dir_or_files($base, 0));
        die();
    }
 
 function DNUI_install(){
     
     $option=array('numberOfPage'=> 0,
        'cantInPage'=>25,
        'updateInServer'=> true,
        'scan'=>true,
        'order'=>0);
     DNUI_add_option($option);
     
 }
 
 register_activation_hook( __FILE__, 'DNUI_install' );