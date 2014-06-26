require 'rack/contrib/try_static'
require 'rack/contrib/not_found'
require 'rack/rewrite'

use Rack::Deflater

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
    ["/", {'Cache-Control' => 'public, max-age=259200'}],
  ]

run Rack::NotFound.new('_site/404.html')

use Rack::Rewrite do
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
  r301 %r{^/hnv?$}, '/locations/hnv/'
  r301 %r{^/okc?$}, '/locations/okc/'
  r301 %r{^/ykn?$}, '/locations/ykn/'
  r301 %r{^/mes?$}, '/locations/'
  r301 %r{^/southokc_new/public/about_life/job_opportunities.php?$}, '/jobs/'
  r301 %r{^/network?$}, '/equipping-churches/'
  r301 %r{^/wichita?$}, '/locations/wch/'
  r301 %r{^/resources/lk_list/music?$}, '/kids/'
  r301 %r{^/okc_new/public/about_life/beliefs_scriptures.php?rv=12?$}, '/beliefs/'
  r301 %r{^/tulsa?$}, '/locations/tul/'
  r301 %r{^/message-archive/one-prayer/5?$}, '/watch/one-prayer-2010/'
  r301 %r{^/watch/life-money-hope/1?$}, '/watch/life-money-hope/'
  r301 %r{^/message-archive/one-prayer/2?$}, '/watch/one-prayer-2010/'
end
