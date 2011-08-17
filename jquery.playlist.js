/*
 * jQuery Playlist Plugin
 * 
 * Author: Cameron Skene
 * Description: List any YouTube Playlist
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($){
    
    jQuery.fn.playlist = function(options) {
        
        defaults = {
            id: "D1D23519DF6539EC",
            orderBy: "position",
            startIndex: "1",
            maxResults: "20",
            thumbSize: "hqDefault"
        };
        
        o = $.extend(defaults, options);
                
        return this.each(function() {
            
            var elem = $(this);
            
            $.getJSON("https://gdata.youtube.com/feeds/api/playlists/"+o.id+"?v=2&alt=jsonc&orderby="+o.orderBy+"&start-index="+o.startIndex+"&max-results="+o.maxResults+"&callback=?",function(data) {
                
                var data = data.data;
                
                var author = data.author;
                
                var title = data.title;
                                
                var items = data.items;
                
                var html = [];
                
                html.push("<h2>"+author+"</h2>");
                
                html.push("<h3>"+title+"</h3>");
                
                html.push("<ol>");
                
                $.each(items, function(index, value) {
                    
                    var item = items[index];
                                        
                    var itemThumb = item.video.thumbnail[o.thumbSize],
                    itemTitle = item.video.title,
                    itemURL = item.video.player["default"];
                
                    html.push("<li>");
                    html.push("<h4 class='item-title'>");
                    html.push(itemTitle);
                    html.push("</h4>");
                    html.push('<a href="'+itemURL+'"><img src="'+itemThumb+'" alt=""/></a>');
                })
                
                html.push("</ol>");
                                                
                elem.append(html.join(''));
                
            })
            
            
        })
    };
    
})(jQuery);