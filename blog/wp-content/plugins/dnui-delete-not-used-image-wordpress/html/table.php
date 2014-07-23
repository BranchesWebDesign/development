<script type="text/template" id="dnui_table" >
    <thead> 
    <tr>
    <th class="check-column" scope="col"><input id="dnui-select-all" type="checkbox" ></th>
    <td class="manage-column column-title"><?php _e('Name', 'dnui') ?></td>
        <td class="manage-column column-title"><?php _e('id', 'dnui') ?></td>
        <td class="manage-column column-title"><?php _e('size', 'dnui') ?></td>
    <td class="manage-column column-title"><?php _e('Options', 'dnui') ?></td>
    <td class="manage-column column-title"><?php _e('Status', 'dnui') ?></td>
    </tr>
    </thead>
</script>


<script type="text/template" id="dnui_option" >

<tbody>
<tr>
    <td scope="row"><?php _e('Quantity of image to search','dnui') ?></td>
    <td><input class="dnui_cant" data-dnui="cantInPage" type="number" max="100" min="1" name="quantity" value="<%= option.cantInPage %>"> </td>
</tr>
<tr>
    <td scope="row"><?php _e('Order','dnui') ?> </td>
    <td>
        <select class="dnui_select"  data-dnui="order">
            <option <% if(option.order==0){  %>  selected <% } %> value="0">
            <?php _e('First','dnui') ?>
            </option>

            <option <%  if(option.order==1){ %>  selected <% } %> value="1">
            <?php _e('Last','dnui') ?>
            </option>
        </select>
        </td>
</tr>
<tr>
    <td scope="row"><?php _e('Update database if image is not in server (use with precaution)','dnui') ?></td>
    <td>
        <input class="dnui_check" type="checkbox" data-dnui="updateInServer"  <% console.log(option.updateInServer); if(option.updateInServer) { %> checked <% } %> >
    </td>
</tr>
<tr>     
    <td scope="row"><?php _e('Auto scan (not yet)','dnui') ?></td>
    <td>
        <input class="dnui_option" data-dnui="scan" type="checkbox" disabled  <% if(option.scan) { %> checked <% } %> >
    </td>
</tr>
<tr>     
    <td scope="row"><?php _e('Number of page','dnui') ?></td>
    <td>
        <input type="number" value="<%= option.numberOfPage  %>" disabled/>
        <button disabled class="button-primary"  ><?php _e('Reset','dnui') ?></button>
    </td>
</tr>
<tr>
    <td scope="row"><?php _e('Make backup (not yet)','dnui') ?></td>
    <td>
        <input class="dnui_check" data-dnui="backup" type="checkbox" disabled>
    </td>
</tr>
<tr>
    <td scope="row"><?php _e('Delete backup after (not yet)','dnui') ?></td>
    <td>
                <select disabled>
                     <option><?php _e('1 Hour','dnui') ?></option>
                     <option><?php _e('1 Day','dnui') ?></option>
                     <option><?php _e('1 Week','dnui') ?></option>
                     <option><?php _e('1 Month','dnui') ?></option>
                </select>
        
    </td>
</tr>
<tr>
    <td scope="row"><?php _e('Ignore sizes (not yet)','dnui') ?></td>
    <td>
                <select disabled>
                     <option></option>
                     
                </select>
        
    </td>
</tr>

</tbody>
</script>

<script type="text/template" id="dnui_button">

<h2>
<button class="button-primary dnui_delete"  type="button"><?php _e('Delete all selected','dnui') ?> </button> 
<button class="button-primary dnui_next"    type="button"><?php _e('Next','dnui') ?> </button> 
<button class="button-primary dnui_before"  type="button"><?php _e('Before','dnui') ?> </button> 

</h2>
</script>

<script id="dnui_tbody">
    <% 
    var father,son,keys,image,href,id,base;
    var use="use";
    var dis="disabled";
    var notUse="not-use";
    
    father= image.meta_value;
	
    id=image.id;
    base=image.base; 
        
    %>

        <tr class="dnui_original" >
			<th class="check-column validate" scope="row">
                        
                        <input  data-id="<%= id %>" data-base="" data-type="original" class="dnui_father" type="checkbox" <% if(father.use||_.contains(father.sizes,true)) { %> disabled <% } %> >
                        
                        </th> 
			
			<td><%= father.file %></td>
			<td><%= '('+id+') '+ 'original' %></td>
			<td><%= father.width +'x'+father.height %></td>
			<td>
				<div id="<%= 'original_'+id %>" style="display:none;">
					<img src="<%= base+'/'+father.file %>" />
				</div>
			<% href='#TB_inline?width='+father.width+'&height='+father.height+'&inlineId=original_'+id; %>
				<a href="<%= href %>" class="thickbox"><span class="wp-menu-image dashicons-before dashicons-admin-comments"></span></a>
				<a href="<%= base+'/'+father.file %>" target="_blank" ><span class="wp-menu-image dashicons-before dashicons-admin-page"></span></a>
			</td>
			<td <% if ( father.use) { classUse=use;  }else{ classUse=notUse; } %> class="dnui <%= classUse %>"><%= classUse %></td>
			</tr>
		<%
		keys=_.pairs(father.sizes);
		_.each(keys, function(son){
                    
				%>
				<tr>
					<th class="check-column" scope="row"><input class="dnui_sons" data-id="<%= id %>" data-type="<%= son[0] %>" type="checkbox" <% if(son[1].use) { %> disabled <% } %>  ></th>
					<% href='#TB_inline?width='+son[1].width+'&height='+son[1].height+'&inlineId='+son[0]+'_'+id; %>
					<td><%= son[1].file %></td>
					<td><%= '('+id+') '+son[0] %></td>
					<td><%= son[1].width +'x'+son[1].height  %></td>
					<td>
						<div id="<%= son[0]+'_'+id %>" style="display:none;">
							<img src="<%= base+'/'+son[1].file %>" />
						</div>
						<a href="<%= href %>"  class="thickbox"><span class="wp-menu-image dashicons-before dashicons-admin-comments"></span></a>
						<a href="<%=  base+'/'+son[1].file %>" target="_blank" ><span class="wp-menu-image dashicons-before dashicons-admin-page"></span></a>
					</td>
					<td <% if ( son[1].use) { classUse=use;  }else{ classUse=notUse; } %> class="dnui <%= classUse %>"><%= classUse %></td>
			</tr>
    
    <% }); %>
  
    <% }
    
    
    </script>
    
<script id="dnui_search_dir">
        <option>A</option>
 <option>B</option>
       <% console.log(dirs);  %>
 
 </script>