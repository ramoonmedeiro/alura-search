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
        print("\n\n\n\n\n")
        print("*********************")
        print(self.host)
        print(self.api_key)
        print("*********************")
        print("\n\n\n\n\n")
        resp = self.client.index(self.index) \
            .search(
                search_term,
                {
                    "limit": limit,
                    "offset": offset
                }
            )
        return resp["hits"]
