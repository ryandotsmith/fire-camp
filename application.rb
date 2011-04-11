require 'sinatra'
require 'json'

@@data = []
@@count = 0

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/messages' do
  content_type :json
  @@data.to_json
end

post '/messages' do
  content_type :json
  message = JSON.parse(request.body.read.to_s).merge(:id => @@count += 1 )
  @@data << message
  message.to_json
end
