require 'rack/contrib/try_static'
require 'rack/contrib/not_found'
require 'rack/rewrite'
require 'rack-slashenforce'


use Rack::Deflater
use Rack::AppendTrailingSlash

use Rack::Rewrite do
  r301 %r{(.*)}, 'http://www.life.church$&', :if => Proc.new {|rack_env|
    (rack_env['HTTP_HOST'] =~ /www.lifechurch.tv/) == 0
  }
  
  r301 %r{^/digerati?$}, '/digital-missions/'
  r301 %r{^/carols?$}, '/watch/carols/'
  r301 %r{^/welcome?$}, '/who-we-are/'
  r301 %r{^/lifekids_resources?$}, '/kids/'
  r301 %r{^/current_series?$}, '/watch/'
  r301 %r{^/giving/digital-missions/results?$}, 'digital-missions/'
  r301 %r{^/campus?$}, '/locations/'
  r301 %r{^/about?$}, '/who-we-are/'
  r301 %r{^/giving/digital-missions?$}, 'digital-missions/'
  r301 %r{^/message-archive?$}, '/watch/archive/'
  r301 %r{^/message-archive/hostage2?$}, '/watch/archive/'
  r301 %r{^/message-archive/search?$}, '/watch/archive/'
  r301 %r{^/message-archive/watch/margin/2/message/low-res?$}, '/watch/margin/'
  r301 %r{^/one-prayer?$}, '/watch/one-prayer-2010/'
  r301 %r{^/free-church-resources?$}, '/equipping-churches/'
  r301 %r{^/open?$}, '/equipping-churches/'
  r301 %r{^/jobs/68/worship-pastor?$}, '/jobs/'
  r301 %r{^/lgresources?$}, '/lifegroups/'
  r301 %r{^/lifekids_resources/series/scoundrels?$}, '/kids/'
  r301 %r{^/message-archive/one-prayer/3?$}, '/watch/one-prayer-2010/'
  r301 %r{^/giving/digital-missions?$}, '/digital-missions/'
  r301 %r{^/at-the-movies?$}, '/atthemovies/'
  r301 %r{^/podcasts?$}, '/tools/'
  r301 %r{^/relief?$}, '/lifemissions/'
  r301 %r{^/message-archive/one-prayer/1?$}, '/watch/one-prayer-2010/'
  r301 %r{^/lcswerve?$}, '/kids/'
  r301 %r{^/open?$}, '/equipping-churches/'
  r301 %r{^/mes?$}, '/locations/'
  r301 %r{^/southokc_new/public/about_life/job_opportunities.php?$}, '/jobs/'
  r301 %r{^/network?$}, '/equipping-churches/'
  r301 %r{^/resources/lk_list/music?$}, '/kids/'
  r301 %r{^/okc_new/public/about_life/beliefs_scriptures.php?rv=12?$}, '/beliefs/'
  r301 %r{^/tulsa?$}, '/locations/tul/'
  r301 %r{^/message-archive/one-prayer/5?$}, '/watch/one-prayer-2010/'
  r301 %r{^/message-archive/one-prayer/2?$}, '/watch/one-prayer-2010/'
  r301 %r{^/(.*).aspx(.*)?$}, '/'
  r301 %r{^/message-archive/(.*)?$}, '/watch/archive/'
  r301 %r{^/feeds?$}, '/tools/'
  r301 %r{^/secondlife?$}, '/beliefs/'
  r301 %r{^/int?$}, '/locations/'
  r301 %r{^/store?$}, '/'
  r301 %r{^/central-staff?$}, '/jobs/'
  r301 %r{^/believe?$}, '/beliefs/'
  r301 %r{^/resources/lifegroups/video?$}, '/lifegroups/'
  r301 %r{^/locations/church-online?$}, '/locations/'
  r301 %r{^/campus-staff?$}, '/jobs/'
  r301 %r{^/swerve?$}, '/kids/'
  r301 %r{^/current-series?$}, '/'
  r301 %r{^/causes?$}, '/lifemissions/'
  r301 %r{^/causes/stories?$}, '/lifemissions/'
  r301 %r{^/causes/digital-missions?$}, '/digital-missions/'
  r301 %r{^/causes/overview?$}, '/lifemissions/'
  r301 %r{^/causes/story/13-youversion?$}, '/digital-missions/'
  r301 %r{^/causes/support?$}, '/lifemissions/'
  r301 %r{^/causes/compassion?$}, '/lifemissions/'
  r301 %r{^/causes/story/11-csp-in-ecuador?$}, '/lifemissions/'
  r301 %r{^/causes/story/9-hope-in-haiti?$}, '/lifemissions/'
  r301 %r{^/causes/story/8-hnv-campus-launch?$}, '/locations/hnv/'
  r301 %r{^/causes/stories/oneprayer?$}, '/watch/'
  r301 %r{^/causes/5-distinctives?$}, '/lifemissions/'
  r301 %r{^/causes/my-causes?$}, '/lifemissions/'
  r301 %r{^/message?$}, '/watch/'
  r301 %r{^/resources/lifekids?$}, '/kids/'
  r301 %r{^/contact-us?$}, '/contact/'
  r301 %r{^/hnv?$}, '/locations/hnv/'
  r301 %r{^/annualreport?$}, '/giving/'
  r301 %r{^/lifekids_resources/menu?$}, '/kids/'
  r301 %r{^/resources/lifegroups/print?$}, '/lifegroups/'
  r301 %r{^/locations/int?$}, '/locations/'
  r301 %r{^/christmas_1?$}, '/watch/'
  r301 %r{^/leadership-team?$}, '/who-we-are/'
  r301 %r{^/volunteer?$}, '/serving/'
  r301 %r{^/lifekids_resources/toon_town/series/road-trip?$}, '/kids/'
  r301 %r{^/leadership-development?$}, '/digital-missions/'
  r301 %r{^/leadershipxp?$}, '/jobs/'
  r301 %r{^/resources/podcasts?$}, '/watch/'
  r301 %r{^/give?$}, '/giving/'
  r301 %r{^/japan?$}, '/locations/'
  r301 %r{^/resources/lifegroups?$}, '/lifegroups/'
  r301 %r{^/giving/login?$}, '/giving/'
  r301 %r{^/history?$}, '/who-we-are/'
  r301 %r{^/digerati?$}, '/digital-missions/'
  r301 %r{^/Locations/Ykn?$}, '/locations/ykn/'
  r301 %r{^/giving/three-month-challenge?$}, '/giving/challenge/'
  r301 %r{^/tulsa_new?$}, '/locations/tul/'
  r301 %r{^/locations/socFind?$}, '/locations/soc/'
  r301 %r{^/player-only/atm08_anythingshortofsin?$}, '/watch/'
  r301 %r{^/locations/okcVer?$}, '/locations/okc/'
  r301 %r{^/mystory?$}, '/watch/my-story/'
  r301 %r{^/giving/types?$}, '/giving/ways/'
  r301 %r{^/mwc?$}, '/locations/mwc/'
  r301 %r{^/(.*).php(.*)?$}, '/' 
  r301 %r{^/locations/okc/?$}, '/okc/'
  r301 %r{^/locations/bnb/?$}, '/broadwaybritton/'
  r301 %r{^/locations/edm/?$}, '/edmond/'
  r301 %r{^/locations/mwc/?$}, '/midwestcity/'
  r301 %r{^/locations/wch/?$}, '/wichita/'
  r301 %r{^/locations/mor/?$}, '/moore/'
  r301 %r{^/locations/noc/?$}, '/northwestokc/'
  r301 %r{^/locations/soc/?$}, '/southwestokc/'
  r301 %r{^/locations/ykn/?$}, '/yukon/'
  r301 %r{^/locations/stw/?$}, '/stillwater/'
  r301 %r{^/locations/bao/?$}, '/brokenarrow/'
  r301 %r{^/locations/jnk/?$}, '/jenks/'
  r301 %r{^/locations/ows/?$}, '/owasso/'
  r301 %r{^/locations/tul/?$}, '/tulsa/'
  r301 %r{^/locations/sto/?$}, '/southtulsa/'
  r301 %r{^/locations/ftw/?$}, '/fortworth/'
  r301 %r{^/locations/klr/?$}, '/keller/'
  r301 %r{^/locations/wel/?$}, '/wellington/'
  r301 %r{^/locations/alb/?$}, '/albany/'
  r301 %r{^/locations/hnv/?$}, '/hendersonville/'
  r301 %r{^/switch?$}, '/kids/#switch'
  r301 %r{^/Christmas?$}, '/christmas/'
  r301 %r{^/whatsnext/?$}, '/next/'
  r301 %r{^/equipping-churches/?$}, '/churches/'
  r301 %r{^/serveatchurchonline/?$}, '/serving/#church-online'
  r301 %r{^/southwestokc?$}, '/southokc/'
  r301 %r{^/Churches?$}, '/churches/'

#Redirects to External Urls

  r301 %r{/bible/(\?.*)?}, 'http://app.bible.com/lifechurch$1'
  r301 %r{/catalyst/(\?.*)?}, 'http://open.church/catalyst$1'

end

use Rack::TryStatic,
  urls: %w[/],
  root: "_site",
  try: ['index.html', '/index.html'],
  header_rules: [
    [["html"],  {'Content-Type' => 'text/html; charset=utf-8'}],
    [["css"],   {'Content-Type' => 'text/css'}],
    [["js"],    {'Content-Type' => 'text/javascript'}],
    [["png"],   {'Content-Type' => 'image/png'}],
    [["svg"],   {'Content-Type' => 'image/svg+xml'}],
    [["jpg"],   {'Content-Type' => 'image/jpg'}],
    [["ico"],   {'Content-Type' => 'image/x-icon'}],
    [:fonts, {'Access-Control-Allow-Origin' => '*'}],
    ["/", {'Cache-Control' => 'public, max-age=86400'}],
  ]



run Rack::NotFound.new('_site/404.html')
