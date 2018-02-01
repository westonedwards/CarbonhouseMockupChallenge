$(document).ready(() => {
    var carouselInner = $('.carousel-inner');
    var html = [];
    $.get('http://wes2k.com:8080/', (data) => {
        if(data) {
            for(var i = 0; i < data.length; i++) {
                // Format date
                var split = data[i].created_at.split(' ');
                var time = split.splice(3,1);
                time = time.toString().split(':');
                var hours = Number(time[0]);
                var minutes = Number(time[1]);
                var seconds = Number(time[2]);
                var timeValue;
                if (hours > 0 && hours <= 12)
                {
                    timeValue= "" + hours;
                } else if (hours > 12)
                {
                    timeValue= "" + (hours - 12);
                }
                else if (hours == 0)
                {
                    timeValue= "12";
                }
                timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
                timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
                timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM
                var date = split.splice(1,2).reverse();
                var year = split[split.length-1];
                date.push(year);
                date = date.join(' ');

                // Find URL and change it
                var linkify = (inputText) => {
                    var replacedText, replacePattern1;
                    //URLs starting with http://, https://, or ftp://
                    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
                    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
                    replacedText = replacedText.replace(/@(\S+)/g, '<a href="https://twitter.com/$1" target="_blank">@$1</a>');
                    replacedText = replacedText.replace(/#(\S+)/g, '<a href="https://twitter.com/hashtag/$1" target="_blank">#$1</a>');
                    return replacedText;
                };
                var convertedText = linkify(data[i].text);

                if(i == 0) {
                    html += [
                        '<div class="item tweet-box active">',
                            '<i class="fa fa-twitter" aria-hidden="true"></i><h4>@CHVenue</h4>',
                            '<div class="tweet-data">' + convertedText + '</div>',
                            '<div class="timestamp">' + date + ' / ' + timeValue + '</div>',
                        '</div>',
                    ].join('\n');
                }
                else {
                    html += [
                        '<div class="item tweet-box">',
                            '<i class="fa fa-twitter" aria-hidden="true"></i><h4>@CHVenue</h4>',
                            '<div class="tweet-data">' + convertedText + '</div>',
                            '<div class="timestamp">' + date + ' / ' + timeValue + '</div>',
                        '</div>'
                    ].join('\n');
                }
            }
            carouselInner.html(html);
        }
        });
    $('#twitter').css('display', 'block');
    $('.social-tabs').click(function() {
        var x = $('.social-tabs');
        for(var i = 0; i < x.length; i++) {
            $(x[i]).removeClass('active-tab');
        }
        var y = $('.section');
        for(var j = 0; j < y.length; j++) {
            $(y[j]).css('display', 'none');
        }
        addCSSClass($(this));
    });
    var addCSSClass = (selector) => {
        var id = selector.attr('data');
        $(selector).addClass('active-tab');
        $('#' + id).css('display', 'block');
    };
});