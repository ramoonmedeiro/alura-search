import requests


def get_results_from_api(
    search_term: str,
    page: int = 0,
    items_per_page: int = 10
) -> list:

    headers = {
        'accept': 'application/json'
    }

    params = {
        'page': page,
        'items_per_page': items_per_page,
    }

    json_data = {
        'search_term': search_term,
    }

    response = requests.post(
        url='http://localhost:8000/search',
        params=params,
        headers=headers,
        json=json_data
    )

    return response.json()
