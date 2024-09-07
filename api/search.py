import meilisearch
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())


class SearchMeili:
    def __init__(
            self,
            index: str
    ) -> None:
        self.index = index
        self.host = os.getenv("MEILISEARCH_HOST")
        self.api_key = os.getenv("MEILISEARCH_API_KEY")
        self.client = meilisearch.Client(url=self.host, api_key=self.api_key)

    def ingest_data(self, data):
        self.client.index('movies').add_documents(data)
        return

    def search(
        self,
        search_term: str,
        page: int = 0,
        items_per_page: int = 10
    ):

        offset = page * items_per_page
        limit = items_per_page
        resp = self.client.index(self.index) \
            .search(
                search_term,
                {
                    "limit": limit,
                    "offset": offset
                }
            )
        return resp["hits"]

    def search_index(
        self,
        idx: int
    ):

        resp = self.client.index(self.index) \
            .search('', {
                'filter': f'id = {idx}',
            })

        return resp["hits"][0]
