<?php
/*
Plugin Name: ASPS Launch Button
Plugin URI: http://www.artistscope.com/asps-web-browser-launch-button-wordpress.asp
Version: 2.1
Description: Launches the ASPS Web Browser using the default browser
Author: ArtistScope
Author URI: http://www.artistscope.com

	Copyright 2015 ArtistScope Pty Limited

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
 
class Launch_Button extends WP_Widget
{
  function Launch_Button()
  {
    $widget_ops = array('classname' => 'Launch_Button', 'description' => 'Button to launch the ASPS Web Browser');
    $this->WP_Widget('Launch_Button', 'ASPS Launch Button', $widget_ops);
  }
 
  function form($instance)
  {
    $instance = wp_parse_args((array) $instance, array( 'title' => '' ));
    $title = $instance['title'];
?>
  <p><label for="<?php echo $this->get_field_id('title'); ?>">Title: <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>" /></label></p>
<?php
  }
 
  function update($new_instance, $old_instance)
  {
    $instance = $old_instance;
    $instance['title'] = $new_instance['title'];
    return $instance;
  }
 
  function widget($args, $instance)
  {
    extract($args, EXTR_SKIP);
 
    echo $before_widget;
    $title = empty($instance['title']) ? '' : apply_filters('widget_title', $instance['title']);
 
    if (!empty($title))
    //    echo $before_title . $title . $after_title;;
 
?>
    <input id="asps-plugin-url" value="<?php echo plugins_url(); ?>" type="hidden" />
	<script type="text/javascript" src="<?php echo plugins_url(); ?>/asps-launch-button/asps-launch-button.js"></script>
	<script type="text/javascript">

	document.write("<a href='");
	document.write(retLink);
	document.write("' onMouseOut='MM_swapImgRestore()'");
	document.write(" onMouseOver=MM_swapImage('launch','','");
	document.write(imgMouseOver);
	document.write("',0)><img src='");
	document.write(imgMouseOff);
	document.write("' width='163' height='43' name='launch' border='0'");
	document.write(" OnClick='LaunchClick(");
	document.write(appLaunch);
	document.write(");'></a>");
	
	</script>
<?php
    echo $after_widget;
  }
}
add_action( 'widgets_init', create_function('', 'return register_widget("Launch_Button");') );
 
?>