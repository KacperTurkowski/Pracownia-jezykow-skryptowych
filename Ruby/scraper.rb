require 'nokogiri'
require 'net/http'

def crawler
	
	search_phrase = "Jabra"
	
	for page in 1..10 do
	    uri = URI("https://www.amazon.pl/gp/bestsellers/electronics/20788403031/ref=zg_bs_pg_#{page}?ie=UTF8&pg=#{page}")

		amazon_page = Nokogiri::HTML.parse(Net::HTTP.get(uri))
	
		headphones = amazon_page.css('div.zg-grid-general-faceout')
		
		headphones.each do |headphone|
			title = headphone.css('div._p13n-zg-list-grid-desktop_truncationStyles_p13n-sc-css-line-clamp-3__g3dy1').text
			price = headphone.css('span.p13n-sc-price').text
			temp = {
				title: title,
				price: price
			}
			if title.include? search_phrase
				puts temp
			end
		end
	end
	
end

crawler