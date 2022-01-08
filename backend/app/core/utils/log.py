from fastapi.routing import APIRoute
from typing import Callable
from fastapi import Request, Response
import time
import datetime
import json


class LoggingContextRoute(APIRoute):
    def get_route_handler(self) -> Callable:  # type: ignore
        original_route_handler = super().get_route_handler()

        async def custom_route_handler(request: Request) -> Response:
            """
            時間計測
            """
            before = time.time()
            response: Response = await original_route_handler(request)
            duration = round(time.time() - before, 4)

            record = {}
            time_local = datetime.datetime.fromtimestamp(before)
            record["time_local"] = time_local.strftime("%Y/%m/%d %H:%M:%S%Z")
            if await request.body():
                record["request_body"] = (await request.body()).decode("utf-8")
            record["request_headers"] = {  # type: ignore
                k.decode("utf-8"): v.decode("utf-8")
                for (k, v) in request.headers.raw
            }
            record["remote_addr"] = request.client.host
            record["request_uri"] = request.url.path
            record["request_method"] = request.method
            record["request_time"] = str(duration)
            record["status"] = str(response.status_code)
            record["response_body"] = response.body.decode("utf-8").strip("/")
            record["response_headers"] = {  # type: ignore
                k.decode("utf-8"): v.decode("utf-8")
                for (k, v) in response.headers.raw
            }
            print(json.dumps(record, sort_keys=True, indent=4))
            return response

        return custom_route_handler
