import requests
import textwrap
from urllib.parse import quote_plus
from bs4 import BeautifulSoup
from rest_framework.response import Response
from rest_framework.decorators import api_view


BASE_CRAGSLIST_URL = "https://toronto.craigslist.org/search/sss?query={}"
BASE_KIJIJI_URL = "https://www.kijiji.ca/b-city-of-toronto/{}/k0l1700273"


@api_view(['POST'])
def craigslist(request):
    search = request.POST.get('search')
    final_search = BASE_CRAGSLIST_URL.format(quote_plus(search))
    response = requests.get(final_search)
    data = response.text
    soup = BeautifulSoup(data, features="html.parser")
    # Cragslist part
    post_listing = soup.find_all('li', {'class': 'result-row'})
    final_posting = []
    BASE_IMAGE_URL = "https://images.craigslist.org/{}_300x300.jpg"
    i = 0
    for post in post_listing:
        post_title = post.find(class_='result-title').text
        post_url = post.find('a').get('href')
        if post.find(class_='result-price'):
            post_price = post.find(class_='result-price').text
        else:
            post_price = 'N/A'

        if post.find(class_='result-image').get('data-ids'):
            post_image = post.find(class_='result-image').get('data-ids')
            post_image = post_image.split(",")[0].split(":")[1]
            post_image = BASE_IMAGE_URL.format(post_image)
        else:
            post_image = "https://image-not-available.s3.us-east-2.amazonaws.com/image-not-available.png"
        i += 1

        final_posting.append((post_title, post_url, post_price, post_image))
    if not i:
        i = 'There was no results for "{}"'.format(search)
    else:
        i = '{} results by Cragslist'.format(i)
    result_to_frontend = {
        'search': search,
        'final_posting': final_posting,
        'i': i,
    }
    return Response(result_to_frontend)



@api_view(['POST'])
def kijiji(request):
    search = request.POST.get('search')
    final_search = BASE_KIJIJI_URL.format(quote_plus(search))
    response = requests.get(final_search)  # sending request by using requests method
    data = response.text
    soup = BeautifulSoup(data, features="html.parser")
    data_listing = soup.find_all('div', {'class': 'search-item'})
    final_posting = []
    i = 0

    for attr in data_listing:
        post_url = "https://www.kijiji.ca{}".format(attr.find('div', class_='title').a["href"])
        post_title = textwrap.dedent(attr.find('div', class_='title').text.replace('\n', ''))
        if attr.find('div', class_='price'):
            post_price = textwrap.dedent(attr.find('div', class_='price').text.replace('\n', ''))
        else:
            post_price = 'N/A'

        if attr.find('div', class_='image').find('img').get('data-src'):
            post_image = attr.find('div', class_='image').find('img').get('data-src')
        else:
            post_image = "https://image-not-available.s3.us-east-2.amazonaws.com/image-not-available.png"
        final_posting.append((post_title, post_url, post_price, post_image))
        i += 1
    i = '{} results by Kijiji   '.format(i)
    result_to_frontend = {
        'search': search,
        'final_posting': final_posting,
        'i': i,
    }
    return Response(result_to_frontend)
