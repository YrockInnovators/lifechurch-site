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
    ["/", {'Cache-Control' => 'public, max-age=86400'}],
  ]

run Rack::NotFound.new('_site/404.html')

use Rack::Rewrite do
  r301 %r{^/digerati?$}, '/digital-missions/'
end
