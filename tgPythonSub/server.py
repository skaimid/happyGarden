from http.server import HTTPServer, BaseHTTPRequestHandler
import asyncio
import random
from aiohttp import web

from telethon import TelegramClient

# Use your own values from my.telegram.org
from telethon.tl.types import InputMessagesFilterPhotos

api_id = 13705394
api_hash = '93f6b257ed5cb3f839cc002702933b5b'


async def getRandomPic(request):
    # The first parameter is the .session file name (absolute paths allowed)
    async with TelegramClient('anon', api_id, api_hash) as client:
        async for dialog in client.iter_dialogs():
            if dialog.entity.username == request.query['name']:
                async for message in client.iter_messages(dialog.entity, None, filter=InputMessagesFilterPhotos,
                                                          ids=random.randint(1, dialog.message.id)):
                    data = await client.download_media(message, file=bytes, thumb=-1)
                    return web.Response(body=data, content_type="image/png")


# coro = getRandomPic('ArkPics', '')
# result = event_loop.run_until_complete(coro)  # 通过调用事件循环的 run_until_complete() 启动协程
# # data = {'result': 'this is a test'}
# host = ('localhost', 8888)


async def index(request):
    await asyncio.sleep(0.5)
    return web.Response(body=b'<h1>Index</h1>')


async def hello(request):
    await asyncio.sleep(0.5)
    text = '<h1>hello, %s!</h1>' % request.match_info['name']
    return web.Response(body=text.encode('utf-8'))


async def init(loop):
    app = web.Application(loop=loop)
    app.router.add_route('GET', '/', index)
    app.router.add_route('GET', '/hello/{name}', hello)
    app.router.add_route('GET', '/tg/randomPic', getRandomPic)
    srv = await loop.create_server(app.make_handler(), '127.0.0.1', 8000)
    print('Server started at http://127.0.0.1:8000...')
    return srv


loop = asyncio.get_event_loop()
loop.run_until_complete(init(loop))
loop.run_forever()
