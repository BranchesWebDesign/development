<?php
/*
Plugin Name: Auto Content Poster
Text Domain: auto-content-poster
Plugin URI: http://www.acp.y5q.net
Description: Allows users to automatically post products/link from commission junction API to WordPress.
Version: 1.5
Author: Bhavin Toliya
Author URI: http://www.acp.y5q.net
License: GPL v2.
*/
ini_set('display_errors', 1 ); 
set_time_limit(600);

class ACP_Wordpress {

	//Install default data
	public function activate() {
		$options = array( 'advertiser_relationship' => 'joined' ,
		 'cache_duration' => '3600');
    if ( ! get_option('ACP_settings')){
      add_option('ACP_settings' , $options);
    } else {
      update_option('ACP_settings' , $options);
	}
	}
	
	
	public function add_admin_items() {
		add_options_page('Auto Content Poster Settings', 'ACP Settings', 'administrator', 'ACPoptions', array($this,'ACP_options'));
		
	}
	public function add_advance_items() {
		 $page_hook_suffix = add_options_page('Auto Content Poster Advance Settings', 'ACP Advance Settings', 'administrator', 'PostSetting', array($this,'ACP_options2'));
		 add_action('admin_print_scripts-' . $page_hook_suffix, array($this,'ACP_scripts'));
	}
	
	public function ACP_scripts(){
		 wp_enqueue_script( 'ACP-script' );
	}

	public function register_aioasettings() {
		register_setting( 'ACP_settings', 'ACP_settings' );
		
	}	
	public function register_advance_settings() {
		$advoptions = array();
		 add_option('ACP_advance_settings' , $advoptions);
		register_setting( 'ACP_advance_settings', 'ACP_advance_settings' );
		wp_register_script( 'ACP-script', plugins_url( 'js/acp.js', __FILE__ ) );
	}	
	public function ACP_options() {
		include('includes/options-page.php');
	}
	public function ACP_options2() {
		include('includes/options2.php');
	}
	
}

function ACP_interval($c,$int=''){
	switch($c){
		case 'daily':
			wp_clear_scheduled_hook('ACPdailyevent');
			wp_schedule_event(time(),'daily','ACPdailyevent');
			break;
		case 'hourly':
			wp_clear_scheduled_hook('ACPdailyevent');
			wp_schedule_event(time(),'hourly','ACPdailyevent');
			break;
		case 'twicedaily':
			wp_clear_scheduled_hook('ACPdailyevent');
			wp_schedule_event(time(),'twicedaily','ACPdailyevent');
			break;
		case 'custom':
			if($int){
				add_filter('cron_schedules', 'ACP_cron_schedules');
				
				function ACP_cron_schedules() {
					global $in;
     				return array('custom' => array(
         				 'interval' => $in, // seconds
         				 'display'  => __('Custom Interval')
    				 ));
				}
				wp_clear_scheduled_hook('ACPdailyevent');
				wp_schedule_event(time(),'custom','ACPdailyevent');
				
			}
			break;
	}

}

function ACP_deactivate() {
		global $wpdb;
		wp_clear_scheduled_hook('ACPdailyevent');
		delete_option('ACP_settings');
		delete_option('ACP_advance_settings');
		$q = "DROP TABLE bestcjdb";
		$q2 = "DROP TABLE acp_tmp";
		$q3 = "DROP TABLE opttable";
		$wpdb->query($q);
		$wpdb->query($q2);
		$wpdb->query($q3);
	}

function ACP_cj($b){
		global $api_key;
	$url = 'https://advertiser-lookup.api.cj.com/v3/advertiser-lookup?advertiser-ids=joined'.
			'&records-per-page=100'.
			'&page-number='.$b;
		//Request results from CJ REST API and return results as XML.
		$headers = array( 'Authorization' => $api_key );
		$request = new WP_Http;
		$result = $request->request( $url , array( 'method' => 'GET', 'headers' => $headers, 'sslverify' => false ) );
		if ( is_wp_error($result) ) {
			return $result;
		} else {
		$xml = new SimpleXMLElement($result['body']);
			 return $xml;
		}
}

function ACP_alltodb(){
			
	
		global $wpdb;		//wordpress class

$sql = "CREATE TABLE bestcjdb( 
       id INT AUTO_INCREMENT,
	   adid INT,
	   adname TEXT,
	   adcat VARCHAR(20),
	   tmp INT,
	   PRIMARY KEY ( id )); ";
$sql2 = "SHOW TABLES LIKE 'bestcjdb'";
$retval =  $wpdb->query($sql2); //wpdb class method

//table check if exits or not
if($retval == 0)
{
   $wpdb->query($sql);
  
}else{
	$wpdb->query("TRUNCATE TABLE `bestcjdb`");
}

$pn=1;
$advs = ACP_cj($pn);
foreach ($advs->advertisers[0] as $adv) 
		{
	$adn = str_replace("'","",$adv->{'advertiser-name'});
			$adc = str_replace("'","",$adv->{'primary-category'}->child);
	$wpdb->query("INSERT INTO `bestcjdb`(`id`,`adid`,`adname`,`adcat`)
VALUES(NULL,'".$adv->{'advertiser-id'}."','".$adn."','".$adc."')");
		}
$attributes = $advs->advertisers->attributes();
$n = $attributes->{'total-matched'};
$t = (int)($attributes->{'total-matched'}/100);
$s = $attributes->{'total-matched'}%100;
if($s!=0){
	$t+=1;
}

if($t>=2){
for($i=2;$i<=$t;$i++){
	$advs = ACP_cj($i);
	foreach ($advs->advertisers[0] as $adv) 
		{
			$adn = str_replace("'","",$adv->{'advertiser-name'});
			$adc = str_replace("'","",$adv->{'primary-category'}->child);
	$wpdb->query("INSERT INTO `bestcjdb`(`id`,`adid`,`adname`,`adcat`)
VALUES(NULL,'".$adv->{'advertiser-id'}."','".$adn."','".$adc."')");
		}
  }
 }
 $wpdb->query('UPDATE bestcjdb SET tmp=1 WHERE id=1');
}	

function ACP_checkdb(){
	global $wpdb;
	$sql = "SHOW TABLES LIKE 'bestcjdb'";
$retval =  $wpdb->query($sql); //wpdb class method
$sql2 = "SELECT count(id) FROM bestcjdb";
$retval2 =  $wpdb->get_results($sql2,ARRAY_N);
//table check if exits or not
if($retval == 0 || $retval2[0][0] == 0)
{
   return true;
  
}else{
	return false;
}
}

function ACPposter(){
		global $wpdb,$api_key,$webid,$record,$cat,$table,$amazon,$acckey,$prikey,$asstag,$region,$ebay,$ebayaff,$ebc;
		$r = $wpdb->get_results('SELECT MAX(id) FROM '.$table);
		$max = $r[0]->{'MAX(id)'};
		$r2 = $wpdb->get_results('SELECT tmp FROM '.$table.' WHERE id=1');
		$b = $r2[0]->tmp;
		$resu = $wpdb->get_results('SELECT adid,adname,adcat FROM '.$table.' WHERE id='.$b);
		
		if($b<$max){
		$wpdb->query('UPDATE '.$table.' SET tmp=tmp+1 WHERE id=1');
		}else{
		$wpdb->query('UPDATE '.$table.' SET tmp=1 WHERE id=1');
		
		}
		$url = 'https://product-search.api.cj.com/v2/product-search?website-id='.$webid.
			'&advertiser-ids='.$resu[0]->adid.
			'&records-per-page='.$record;
		$headers = array( 'Authorization' => $api_key );
		$request = new WP_Http;
		$result = $request->request( $url , array( 'method' => 'GET', 'headers' => $headers, 'sslverify' => false ) );
		$data = new SimpleXMLElement($result['body']);
		$attributes = $data->products->attributes();
	
		if ($attributes->{'total-matched'} == 0)
		{
			//if products not availabe for given advertiser id then getting text link
			$url = 'https://linksearch.api.cj.com/v2/link-search?website-id='.$webid.'&advertiser-ids='.$resu[0]->adid.'&link-type=text+link&records-per-page=1';
		$headers = array( 'Authorization' => $api_key );
		$request = new WP_Http;
		$result = $request->request( $url , array( 'method' => 'GET', 'headers' => $headers, 'sslverify' => false ) );
		$data = new SimpleXMLElement($result['body']);
		foreach ($data->links[0] as $link) 
							{
							// Sanitize data.
							$pd = $link->{'link-code-html'};
							preg_match("/a[\s]+[^>]*?href[\s]?=[\s\"\']+".
										"(.*?)[\"\']+.*?>"."([^<]+|.*?)?<\/a>/",$pd,$matches);
							preg_match('#<img\s+src\s*=\s*"([^"]+)"#i',$pd,$mat);
							if($cat){
								$ids = get_term_by('slug', $cat, 'link_category');//wordpress function
								if($ids){
									$id = (int)$ids->term_id;
								}else{
									$catarr = array('cat_name' => $cat, 
													'taxonomy' => 'link_category');
									$id = wp_insert_category($catarr);
								}
							}else{
								$ids = get_term_by('slug', $resu[0]->adcat, 'link_category');//wordpress function
								if($ids){
									$id = (int)$ids->term_id;
								}else{
									$catarr = array('cat_name' => $resu[0]->adcat, 
													'taxonomy' => 'link_category');
									$id = wp_insert_category($catarr);
								}
							}
							$p = array('link_name'    => $link->{'advertiser-name'},
  										'link_url'  => $matches[1],
 			 							'link_description' =>$link->description,
										'link_image' => $mat[1],
										'link_category'  =>$id,
										'link_target' => '_blank');
							$pr = wp_insert_link( $p, true );//wordpress function
							wp_reset_query();  // Restore global post data stomped by the_post().
							}
		}else{
				foreach ($data->products[0] as $product) 
				{
				// Sanitize data.
				
				$image = '<a href="'.$product->{'buy-url'}.'"><img src="'.$product->{'image-url'}.'" style="float: right;"/></a>';
				if($product->{'sale-price'}){
					$price = $product->{'sale-price'};
				}else{
					$price = $product->price;
				}
				$pd =  $image.$product->description .'<br/><b>Price:</b>'.$price.' '.$product->currency.'&nbsp;&nbsp;&nbsp;<a href="'.$product->{'buy-url'}.'">Read More and Buy it here!</a>';
				$pd .= '<br><table>';
				if($amazon){
					$asin = acp_asin(acp_amazon_search($prikey,$product->name,$region,$acckey,$asstag));
					if($asin){
						$x = 0;
						$pd .= '<tr><th>Related Products In Amazon</th>';
						foreach($asin as $as){
							$am = acp_itemlookup($as[0]);
							$amz = acp_offers($am);
							$pd .= '<td>'.$amz['thumbnail'].$amz['description'].'<br/><b>Price:</b>'.$amz['price'].'&nbsp;&nbsp;&nbsp;'.$amz['buynow'].'</td>';
							if($x == 1){
								break;
							}
							$x++;
						}
						$pd .= '</tr>';
					}else{
						$pd .= '<tr><th>Related Products In Amazon</th><td>No Matched Products found in Amazon</td></tr>';
					}
				}
				if($ebay){
					$doc = acp_ebay($product->name,$ebayaff,$ebc);
					$return = acp_ebayparseRSS($doc);
					if($return){
						$pd .= $return;
					}else{
						$pd .= '<tr><th>Related Products In Ebay</th><td>No Matched Products found in Ebay</td></tr>';
					}
				}
				$pd .= '</table>';
				if($cat){
					$ids = get_term_by('slug', $cat, 'link_category');//wordpress function
					if($ids){
						$id = (int)$ids->term_id;
					}else{
						$id = wp_create_category($cat);
					}
				}else{
					$ids = get_term_by('slug', $resu[0]->adcat, 'link_category');//wordpress function
					if($ids){
						$id = (int)$ids->term_id;
					}else{
						$id = wp_create_category($resu[0]->adcat);
					}
				}
				$p = array('post_title'    => $product->name,
  					'post_content'  => $pd,
 				 	'post_status'   => 'publish',
  					'post_author'   => 1,
  					'post_category'  =>array($id));
				$pr = wp_insert_post($p);
				
				
				}
			}
	
}

function ACP_get_interval(){
	foreach (_get_cron_array() as $timestamp => $crons) {
	foreach ($crons as $cron_name => $cron_args) {
		foreach ($cron_args as $cron) {
			if($cron_name == 'ACPdailyevent'){
				return $cron['interval'];
			}
		}
	}
}
}

function ACP_select(){
	global $wpdb;
	$sql = "select adcat,count(*) as c from bestcjdb group by adcat having c>0 ORDER BY adcat";
	$retval =  $wpdb->get_results($sql,ARRAY_N);
	$select = '';
	foreach($retval as $n){
	
		$select .= '<option value="'.$n[0].'">'.$n[0].' ('.$n[1].')</option>';
	
	}
	return $select;
}

function ACP_tmptable($a){
	global $wpdb;
	
	$s = "select adname,adid FROM bestcjdb WHERE adcat='".$a."'";
	$r = $wpdb->get_results($s,ARRAY_N);
	$sql = "create table acp_tmp( 
       id INT AUTO_INCREMENT,
	   adid INT,
	   adname TEXT,
	   adcat VARCHAR(20),
	   tmp INT,
	   PRIMARY KEY ( id )); ";
	
	$sql2 = "SHOW TABLES LIKE 'acp_tmp'";
	$retval =  $wpdb->query($sql2); //wpdb class method

//table check if exits or not
	if($retval == 0)
	{
   		$wpdb->query($sql);
  
	}
  	foreach($r as $m){
	
		$wpdb->query("INSERT INTO `acp_tmp`(id,adid,adname,adcat) VALUES(NULL,'".$m[1]."','".$m[0]."','".$a."')");
	
	}
	$wpdb->query('UPDATE acp_tmp SET tmp=1 WHERE id=1');
}

function ACP_deletetmptabel(){
	global $wpdb;
	$sql2 = "SHOW TABLES LIKE 'acp_tmp'";
	$retval =  $wpdb->query($sql2);
	if($retval != 0)
	{
   		$wpdb->query("TRUNCATE TABLE `acp_tmp`");
  
	}
}

function ACP_optiontable(){
			global $wpdb;		//wordpress class

$sql = "CREATE TABLE opttable( 
       id INT AUTO_INCREMENT,
	   opt_name TEXT,
	   opt_value TEXT,
	   PRIMARY KEY ( id )); ";
$sql2 = "SHOW TABLES LIKE 'opttable'";
$retval =  $wpdb->query($sql2); //wpdb class method

//table check if exits or not
if($retval == 0)
{
   $wpdb->query($sql);
}
}

function ACP_update_opttbl($a,$b){
	global $wpdb;
	if(ACP_check_opttbl_name($a)){
		$wpdb->query("INSERT INTO opttable(id,opt_name,opt_value) VALUES(NULL,'".$a."','".$b."')");
		
	}else{
		$wpdb->query("UPDATE opttable SET opt_value='".$b."' WHERE opt_name='".$a."'");
	}
}

function ACP_check_opttbl($a){
	global $wpdb;
	$re = $wpdb->get_results("select * FROM opttable WHERE opt_value='".$a."'");
	if($re){
		return FALSE;
	}else{
		return TRUE;
	}
}

function ACP_check_opttbl_name($a){
	global $wpdb;
	$re = $wpdb->get_results("select * FROM opttable WHERE opt_name='".$a."'");
	if($re){
		return FALSE;
	}else{
		return TRUE;
	}
}

function acp_hash_hmac($algo, $data, $key, $raw_output=False){
		// RFC 2104 HMAC implementation for php. Creates a sha256 HMAC.
		// Eliminates the need to install mhash to compute a HMAC. Hacked by Lance Rushing. source: http://www.php.net/manual/en/function.mhash.php. modified by Ulrich Mierendorff to work with sha256 and raw output
		$b = 64; // block size of md5, sha256 and other hash functions
		if (strlen($key) > $b){
			$key = pack("H*",$algo($key));
		}
		$key = str_pad($key, $b, chr(0x00));
		$ipad = str_pad('', $b, chr(0x36));
		$opad = str_pad('', $b, chr(0x5c));
		$k_ipad = $key ^ $ipad ;
		$k_opad = $key ^ $opad;
		$hmac = $algo($k_opad . pack("H*", $algo($k_ipad . $data)));
		if ($raw_output){
			return pack("H*", $hmac);
		}else{
			return $hmac;
		}
	} 

function acp_amazon_search($privatekey,$Keyword,$region,$acckey,$asstag){
	$Operation = "ItemSearch";
	$Version = "2011-08-01";
	$ResponseGroup = "Small";
	$pkey = $privatekey;
	$Keywords = rawurlencode($Keyword);
	$method = "GET";
	$host = "ecs.amazonaws.".$region; //new API 12-2011
	$uri = "/onca/xml";
	$time = rawurlencode(gmdate("Y-m-d\TH:i:s\Z"));
	$request = "AWSAccessKeyId=".$acckey."&AssociateTag=".$asstag."&Keywords=".$Keywords."&Operation=".$Operation."&ResponseGroup=".$ResponseGroup."&SearchIndex=All&Service=AWSECommerceService&Timestamp=".$time."&Version=2011-08-01";
	$string_to_sign = $method."\n".$host."\n".$uri."\n".$request;
	$signature = base64_encode(acp_hash_hmac("sha256", $string_to_sign, $pkey, True));
	$signature = rawurlencode($signature);
	$request = "http://".$host.$uri."?".$request."&Signature=".$signature;
	$xml = simplexml_load_string(file_get_contents($request));
	return $xml;
}

function acp_asin($parsed_xml){
	$numOfItems = $parsed_xml->Items->TotalResults;
	if($numOfItems>0){
		foreach($parsed_xml->Items->Item as $current){
			$asin[] = $current->ASIN;
		}
	}
	return $asin;
}

function acp_itemlookup($asin){
	global $prikey,$acckey,$region,$asstag;
	$Operation = "ItemLookup";
	$Version = "2011-08-01";
	$ResponseGroup = "Large";
	$pkey = $prikey;
	$method = "GET";
	$host = "ecs.amazonaws.".$region; //new API 12-2011
	$uri = "/onca/xml";
	$time = rawurlencode(gmdate("Y-m-d\TH:i:s\Z"));
	$request = "AWSAccessKeyId=".$acckey."&AssociateTag=".$asstag."&ItemId=".$asin."&Operation=".$Operation."&ResponseGroup=".$ResponseGroup."&Service=AWSECommerceService&Timestamp=".$time."&Version=2011-08-01";
	$string_to_sign = $method."\n".$host."\n".$uri."\n".$request;
	$signature = base64_encode(acp_hash_hmac("sha256", $string_to_sign, $pkey, True));
	$signature = rawurlencode($signature);
	$request = "http://".$host.$uri."?".$request."&Signature=".$signature;
	$xml = simplexml_load_string(file_get_contents($request));
	return $xml;
}

function acp_offers($pxml){
	
	if($pxml->Items->Item->CustomerReviews->IFrameURL) {
			foreach($pxml->Items->Item as $item) {	

				$desc = "";					
				if (isset($item->EditorialReviews->EditorialReview)) {
					foreach($item->EditorialReviews->EditorialReview as $descs) {
						$desc .= $descs->Content;
					}		
				}	
				
							
				
				$features = "";
				if (isset($item->ItemAttributes->Feature)) {	
					$features = "<ul>";
					foreach($item->ItemAttributes->Feature as $feature) {
						$posx = strpos($feature, "href=");
						if ($posx === false) {
							$features .= "<li>".$feature."</li>";		
						}
					}	
					$features .= "</ul>";				
				}
				
				$timg = $item->MediumImage->URL;
				if($timg == "") {$timg = $item->SmallImage->URL;}				
				$thumbnail = '<a href="'.$item->DetailPageURL.'" rel="nofollow"><img style="float:left;margin: 0 20px 10px 0;" src="'.$timg.'" /></a>';					
				$link = '<a href="'.$item->DetailPageURL.'" rel="nofollow">'.$item->ItemAttributes->Title.'</a>';	
				$price = str_replace("$", "$ ", $item->OfferSummary->LowestNewPrice->FormattedPrice);
				$listprice = str_replace("$", "$ ", $item->ItemAttributes->ListPrice->FormattedPrice);

				if($price == "Too low to display" || $price == "Price too low to display") {
					$price = $listprice;
				}
				
				$acontent = array();
				$acontent['title'] = $item->ItemAttributes->Title;
				$acontent['description'] = $desc;
				$acontent['features'] = $features;
				$acontent['thumbnail'] = $thumbnail;
				$acontent['smallimage'] = '<img src="'.$item->SmallImage->URL.'"/>';				$acontent['mediumimage'] = '<img src="'.$item->MediumImage->URL.'"/>';					$acontent['buynow'] = '<a href="'.$item->DetailPageURL.'">Buy it from Amazon</a>';		
				
				$acontent['price'] = $price;
				$acontent['listprice'] = $listprice;
				$savings = str_replace("$ ", "", $listprice) - str_replace("$ ", "", $price);
				$acontent['savings'] = $savings;
				$acontent['url'] = $item->DetailPageURL;	
				
			}		

			return $acontent;
		}
}

function acp_ebay($keyword,$affkey,$programid){
	$keyword = str_ireplace(' ','+',$keyword);
	$keyword = preg_replace('/[^A-Za-z0-9\+]/', '', $keyword);
	$sortorder = 'BestMatch';
	$rssurl= "http://rest.ebay.com/epn/v1/find/item.rss?keyword=".$keyword."&campaignid=".urlencode($affkey)."&sortOrder=".$sortorder."&programid=".$programpid."descriptionSearch=true";
$data = file_get_contents($rssurl);
$doc = new SimpleXmlElement($data, LIBXML_NOCDATA);
return $doc;
}

function acp_ebayparseRSS($xml){
$desc = "<tr><th>Related Products In Ebay</th>";
$cnt = count($xml->channel->item);
if($cnt > 1){
	for($i=0; $i<$cnt; $i++)
	{
		$desc .= '<td>'.$xml->channel->item[$i]->description.'</td>';
		if ($i == 1)
		{
 		break;
		}
	}
	$desc .= '</tr>';
	return $desc;
}else{
	return FALSE;
}
}

if( class_exists( 'ACP_Wordpress' ) ) {
	$ACP = new ACP_Wordpress();
	
	//actions
	add_action('admin_menu', array(&$ACP,'add_admin_items') );
	add_action( 'admin_init', array(&$ACP,'register_aioasettings') );
	
	
	
	//registration hooks
	register_activation_hook( __FILE__, array(&$ACP, 'activate'));
	register_deactivation_hook( __FILE__, 'ACP_deactivate');
	$options = get_option('ACP_settings');
	$advoptions = get_option('ACP_advance_settings');
	$c = ACP_checkdb();
 if(!empty($options['ACP_key']) and $c == true){
		$api_key = $options['ACP_key'];
		ACP_alltodb();
	}
 if(!empty($options['ACP_amz_key']) && !empty($options['ACP_amz_pkey']) && !empty($options['ACP_amz_atag'])){
 	include_once('includes/sha.php');
 	$acckey = $options['ACP_amz_key'];
 	$prikey = $options['ACP_amz_pkey'];
 	$asstag = $options['ACP_amz_atag'];
 	$region = $options['rselect'];
 	$amazon = TRUE;
 }else{
 	$amazon = FALSE;
 }
 if(!empty($options['ACP_ebay_key'])){
 	$ebay = TRUE;
 	$ebayaff = $options['ACP_ebay_key'];
 	$ebc = $options['eb_select'];
 }else{
 	$ebay = FALSE;
 }
  if(!empty($options['ACP_key'])){
		add_action('admin_menu', array(&$ACP,'add_advance_items') );
	add_action( 'admin_init', array(&$ACP,'register_advance_settings') );
	}
 if(!empty($advoptions['post_record'])){
 	if(!empty($advoptions['category']) and $advoptions['category']=='manual' and !empty($advoptions['category_name'])){
		$cat = strtolower($advoptions['category_name']);
	}else{
		$cat = FALSE;
	}
	if($advoptions['category_cj'] == 'manual_cj' and !empty($advoptions['cselect'])){
		$cjcat = $advoptions['cselect'];
		$optname = 'manual_cj';
		ACP_optiontable();
		if(ACP_check_opttbl($cjcat)){
			ACP_tmptable($cjcat);
			ACP_update_opttbl($optname,$cjcat);
		}
		
		$table = 'acp_tmp';
	}else{
		ACP_deletetmptabel();
		$table = 'bestcjdb';
	}
	$s = wp_get_schedule('ACPdailyevent');
	
	if($s != $advoptions['interval'] && $advoptions['interval'] != 'custom'){
		
			ACP_interval($advoptions['interval']);
		
	}
	if(!empty($advoptions['custom_int']) && $advoptions['interval'] == 'custom'){
		$optname2 = 'custom_int';
		$cjcat2 = $advoptions['custom_int'];
		$in = (int)$advoptions['custom_int']*3600;
		ACP_optiontable();
		ACP_interval($advoptions['interval'],$in);
		if(ACP_check_opttbl($cjcat2)){
			
			ACP_update_opttbl($optname2,$cjcat2);
		}
	}
 	include_once(ABSPATH.'wp-admin/includes/taxonomy.php');
 	include_once(ABSPATH.'wp-admin/includes/bookmark.php');
	$record = $advoptions['post_record'];
	$api_key = $options['ACP_key'];
	$webid = $options['cj_site_id'];
	add_action('ACPdailyevent','ACPposter');
	
}
}

if (!get_option('link_manager_enabled')){
	add_filter( 'pre_option_link_manager_enabled', '__return_true' );//wordpress option
}
?>