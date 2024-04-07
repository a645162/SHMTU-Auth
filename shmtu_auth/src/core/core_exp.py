from time import sleep as time_sleep

from .get_query_string_requests import is_connect_by_google, get_query_string_by_url
from .shmtu_auth_const_value import get_default_query_string

from ..utils.logs import get_logger

logger = get_logger()


def check_is_connected() -> bool:
    return is_connect_by_google()


def check_is_connected_retry(
        retry_times: int = 3,
        wait_time: int = 5,
) -> bool:
    for i in range(retry_times):
        if check_is_connected():
            return True
        else:
            # logger.info("[SHMTU Auth] Checking internet connection failed!")
            # logger.info(f"Waiting for {wait_time} seconds...")
            time_sleep(wait_time)
            # logger.info(f"[SHMTU Auth] Retrying({i + 1})...")


def get_query_string() -> str:
    try_str: str = get_query_string_by_url().strip()
    if len(try_str) > 0:
        return try_str
    else:
        return get_default_query_string().strip()
