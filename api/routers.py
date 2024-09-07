from fastapi import APIRouter, HTTPException
from search import SearchMeili
from typing import Any, Dict


router = APIRouter()


@router.get("/health_check")
def health_check():
    return {"status": "ok"}


@router.post("/search")
def search_term_requester(
    request: Dict[Any, Any] = None,
    page: int = 0,
    items_per_page: int = 10
):
    if request is None:
        raise HTTPException(
            status_code=400, detail="No body request"
        )

    search_term = request.get("search_term")

    if search_term is None:
        raise HTTPException(
            status_code=400, detail="No search_term field"
        )

    sm = SearchMeili(index="movies")
    resp_search = sm.search(
        search_term=search_term,
        page=page,
        items_per_page=items_per_page
    )

    return resp_search
