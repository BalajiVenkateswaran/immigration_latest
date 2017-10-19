require 'net/http'

uri = URI('http://localhost/assets/css/Immigration.css')

req = Net::HTTP::Get.new(uri)

$i = 0
$num = 600
$smoke_test_status = 'fail'

while  $i < $num  do
        begin
                res = Net::HTTP.get_response(uri)
                if res.code == '200' then
                        puts 'response code ===> '+res.code
                        $smoke_test_status = 'pass'
                        break
                else
                        puts 'getting '+res.code+', hence retrying...'
                        sleep 25
                        $i +=25
                end
        rescue Exception => e
                puts 'getting exception'+e.message+', hence retrying after 25s...'
                sleep 25
                $i +=25
        end
end

if $smoke_test_status == 'pass' then
        puts 'Smoke test successful!!!'
else
        raise "Smoke test failed!!!"
end