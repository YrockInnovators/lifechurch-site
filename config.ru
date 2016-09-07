require 'rack/contrib/try_static'
require 'rack/contrib/not_found'
require 'rack/rewrite'
#require 'rack-slashenforce'


use Rack::Deflater
#use Rack::AppendTrailingSlash

use Rack::Rewrite do
  r301 %r{(.*)}, 'http://www.life.church$&', :if => Proc.new {|rack_env|
    (rack_env['HTTP_HOST'] =~ /www.lifechurch.tv/) == 0
  }

  r301 %r{^/(?i)digerati/?$}, '/digital-missions/'
  r301 %r{^/(?i)carols/?$}, '/watch/carols/'
  r301 %r{^/(?i)welcome/?$}, '/who-we-are/'
  r301 %r{^/(?i)lifekids_resources/?$}, '/kids/'
  r301 %r{^/(?i)current_series/?$}, '/watch/'
  r301 %r{^/(?i)giving/digital-missions/results/?$}, 'digital-missions/'
  r301 %r{^/(?i)campus/?$}, '/locations/'
  r301 %r{^/(?i)about/?$}, '/who-we-are/'
  r301 %r{^/(?i)giving/digital-missions/?$}, 'digital-missions/'
  r301 %r{^/(?i)message-archive/?$}, '/watch/archive/'
  r301 %r{^/(?i)message-archive/hostage2/?$}, '/watch/archive/'
  r301 %r{^/(?i)message-archive/search/?$}, '/watch/archive/'
  r301 %r{^/(?i)message-archive/watch/margin/2/message/low-res/?$}, '/watch/margin/'
  r301 %r{^/(?i)one-prayer/?$}, '/watch/one-prayer-2010/'
  r301 %r{^/(?i)free-church-resources/?$}, '/equipping-churches/'
  r301 %r{^/(?i)jobs/68/worship-pastor/?$}, '/jobs/'
  r301 %r{^/(?i)lgresources/?$}, '/lifegroups/'
  r301 %r{^/(?i)lifekids_resources/series/scoundrels/?$}, '/kids/'
  r301 %r{^/(?i)message-archive/one-prayer/3/?$}, '/watch/one-prayer-2010/'
  r301 %r{^/(?i)giving/digital-missions/?$}, '/digital-missions/'
  r301 %r{^/(?i)at-the-movies/?$}, '/atthemovies/'
  r301 %r{^/(?i)podcasts/?$}, '/tools/'
  r301 %r{^/(?i)relief/?$}, '/lifemissions/'
  r301 %r{^/(?i)message-archive/one-prayer/1/?$}, '/watch/one-prayer-2010/'
  r301 %r{^/(?i)lcswerve/?$}, '/kids/'
  r301 %r{^/(?i)mes/?$}, '/locations/'
  r301 %r{^/(?i)southokc_new/public/about_life/job_opportunities.php/?$}, '/jobs/'
  r301 %r{^/(?i)network/?$}, '/equipping-churches/'
  r301 %r{^/(?i)resources/lk_list/music/?$}, '/kids/'
  r301 %r{^/(?i)okc_new/public/about_life/beliefs_scriptures.php?rv=12/?$}, '/beliefs/'
  r301 %r{^/(?i)message-archive/one-prayer/5/?$}, '/watch/one-prayer-2010/'
  r301 %r{^/(?i)message-archive/one-prayer/2/?$}, '/watch/one-prayer-2010/'
  r301 %r{^/(.*).aspx(.*)?$}, '/'
  r301 %r{^/(?i)message-archive/(.*)?$}, '/watch/archive/'
  r301 %r{^/(?i)feeds/?$}, '/tools/'
  r301 %r{^/(?i)secondlife/?$}, '/beliefs/'
  r301 %r{^/(?i)int/?$}, '/locations/'
  r301 %r{^/(?i)store/?$}, '/'
  r301 %r{^/(?i)central-staff/?$}, '/jobs/'
  r301 %r{^/(?i)believe/?$}, '/beliefs/'
  r301 %r{^/(?i)resources/lifegroups/video/?$}, '/lifegroups/'
  r301 %r{^/(?i)locations/church-online/?$}, '/locations/'
  r301 %r{^/(?i)campus-staff/?$}, '/jobs/'
  r301 %r{^/(?i)swerve/?$}, '/kids/'
  r301 %r{^/(?i)current-series/?$}, '/'
  r301 %r{^/(?i)causes/?$}, '/lifemissions/'
  r301 %r{^/(?i)causes/stories/?$}, '/lifemissions/'
  r301 %r{^/(?i)causes/digital-missions/?$}, '/digital-missions/'
  r301 %r{^/(?i)causes/overview/?$}, '/lifemissions/'
  r301 %r{^/(?i)causes/story/13-youversion/?$}, '/digital-missions/'
  r301 %r{^/(?i)causes/support/?$}, '/lifemissions/'
  r301 %r{^/(?i)causes/compassion/?$}, '/lifemissions/'
  r301 %r{^/(?i)causes/story/11-csp-in-ecuador/?$}, '/lifemissions/'
  r301 %r{^/(?i)causes/story/9-hope-in-haiti/?$}, '/lifemissions/'
  r301 %r{^/(?i)causes/story/8-hnv-campus-launch/?$}, '/locations/hnv/'
  r301 %r{^/(?i)causes/stories/oneprayer/?$}, '/watch/'
  r301 %r{^/(?i)causes/5-distinctives/?$}, '/lifemissions/'
  r301 %r{^/(?i)causes/my-causes/?$}, '/lifemissions/'
  r301 %r{^/(?i)message/?$}, '/watch/'
  r301 %r{^/(?i)resources/lifekids/?$}, '/kids/'
  r301 %r{^/(?i)contact-us/?$}, '/contact/'
  r301 %r{^/(?i)hnv/?$}, '/locations/hnv/'
  r301 %r{^/(?i)annualreport/?$}, '/giving/'
  r301 %r{^/(?i)lifekids_resources/menu/?$}, '/kids/'
  r301 %r{^/(?i)resources/lifegroups/print/?$}, '/lifegroups/'
  r301 %r{^/(?i)locations/int/?$}, '/locations/'
  r301 %r{^/(?i)christmas_1/?$}, '/watch/'
  r301 %r{^/(?i)leadership-team/?$}, '/who-we-are/'
  r301 %r{^/(?i)volunteer/?$}, '/serving/'
  r301 %r{^/(?i)lifekids_resources/toon_town/series/road-trip/?$}, '/kids/'
  r301 %r{^/(?i)leadership-development/?$}, '/digital-missions/'
  r301 %r{^/(?i)leadership/?$}, '/leadershippodcast/'
  r301 %r{^/(?i)leadershipxp/?$}, '/jobs/'
  r301 %r{^/(?i)resources/podcasts/?$}, '/watch/'
  r301 %r{^/(?i)give/?$}, '/giving/'
  r301 %r{^/(?i)japan/?$}, '/locations/'
  r301 %r{^/(?i)resources/lifegroups/?$}, '/lifegroups/'
  r301 %r{^/(?i)giving/login/?$}, '/giving/'
  r301 %r{^/(?i)history/?$}, '/who-we-are/'
  r301 %r{^/(?i)digerati/?$}, '/digital-missions/'
  r301 %r{^/(?i)locations/Ykn/?$}, '/locations/ykn/'
  r301 %r{^/(?i)giving/three-month-challenge/?$}, '/giving/challenge/'
  r301 %r{^/(?i)tulsa_new/?$}, '/locations/tul/'
  r301 %r{^/(?i)locations/socFind/?$}, '/locations/soc/'
  r301 %r{^/(?i)player-only/atm08_anythingshortofsin/?$}, '/watch/'
  r301 %r{^/(?i)locations/okcVer/?$}, '/locations/okc/'
  r301 %r{^/(?i)mystory/?$}, '/watch/my-story/'
  r301 %r{^/(?i)giving/types/?$}, '/giving/ways/'
  r301 %r{^/(?i)mwc/?$}, '/locations/mwc/'
  r301 %r{^/(.*).php(.*)?$}, '/'
  r301 %r{^/(?i)locations/okc/?$}, '/okc/'
  r301 %r{^/(?i)locations/bnb/?$}, '/broadwaybritton/'
  r301 %r{^/(?i)locations/edm/?$}, '/edmond/'
  r301 %r{^/(?i)locations/mwc/?$}, '/midwestcity/'
  r301 %r{^/(?i)locations/wch/?$}, '/wichita/'
  r301 %r{^/(?i)locations/mor/?$}, '/moore/'
  r301 %r{^/(?i)locations/noc/?$}, '/northwestokc/'
  r301 %r{^/(?i)locations/soc/?$}, '/southwestokc/'
  r301 %r{^/(?i)locations/ykn/?$}, '/yukon/'
  r301 %r{^/(?i)locations/stw/?$}, '/stillwater/'
  r301 %r{^/(?i)locations/bao/?$}, '/brokenarrow/'
  r301 %r{^/(?i)locations/jnk/?$}, '/jenks/'
  r301 %r{^/(?i)locations/ows/?$}, '/owasso/'
  r301 %r{^/(?i)locations/tul/?$}, '/midtowntulsa/'
  r301 %r{^/(?i)tulsa/?$}, '/midtowntulsa/'
  r301 %r{^/(?i)locations/sto/?$}, '/southtulsa/'
  r301 %r{^/(?i)locations/ftw/?$}, '/fortworth/'
  r301 %r{^/(?i)locations/klr/?$}, '/keller/'
  r301 %r{^/(?i)locations/wel/?$}, '/wellington/'
  r301 %r{^/(?i)locations/alb/?$}, '/albany/'
  r301 %r{^/(?i)locations/hnv/?$}, '/hendersonville/'
  r301 %r{^/(?i)switch/?$}, '/kids/#switch'
  r301 %r{^/(?i)whatsnext/?$}, '/next/'
  r301 %r{^/(?i)equipping-churches/?$}, '/churches/'
  r301 %r{^/(?i)equippingchurches/?$}, '/churches/'
  r301 %r{^/(?i)serveatchurchonline/?$}, '/serving/#church-online'
  r301 %r{^/(?i)southwestokc/?$}, '/southokc/'
  r301 %r{^/(?i)churchonline/?$}, '/online/'

#Redirects for existing pages (case-sensitive fix)

  r301 %r{^/Christmas/?$}, '/christmas/'
  r301 %r{^/Watch/?$}, '/watch/'
  r301 %r{^/Easter/?$}, '/easter/'

#Redirects to External Urls

  r301 %r{^/(?i)keyboard/?$}, 'http://lifechurchkeyboard.webflow.io'
  r301 %r{^/(?i)bible/(\?.*)?}, 'http://app.bible.com/lifechurch$1'
  r301 %r{^/(?i)catalyst/(\?.*)?}, 'http://open.church/catalyst$1'
  r301 %r{^/(?i)open/(\?.*)?}, 'http://open.life.church'
  r301 %r{^/(?i)live/(\?.*)?}, 'http://live.life.church'
  r301 %r{^/(?i)20/(\?.*)?}, 'http://twenty.life.church'
  r301 %r{^/(?i)twenty/(\?.*)?}, 'http://twenty.life.church'
  r301 %r{^/(?i)brand/(\?.*)?}, ' https://lctv-site.s3.amazonaws.com/brand/LC_Pocket_Guidelines_Web.pdf'

#OPK Redirects

  r301 %r{^/(?i)more/(\?.*)?}, 'http://www.life.church/overlandpark/?utm_source=mailer&utm_medium=promoted&utm_campaign=opk_launch'
  r301 %r{^/(?i)details/(\?.*)?}, 'http://www.life.church/overlandpark/?utm_source=door&utm_medium=promoted&utm_campaign=opk_launch'
  r301 %r{^/(?i)info/(\?.*)?}, 'http://www.life.church/overlandpark/?utm_source=invite&utm_medium=promoted&utm_campaign=opk_launch'
  r301 %r{^/(?i)connect/(\?.*)?}, 'http://www.life.church/overlandpark/?utm_source=perforated&utm_medium=promoted&utm_campaign=opk_launch'
  r301 %r{^/(?i)stories/(\?.*)?}, 'http://go2.lc/stories'

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
