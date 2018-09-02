use actix_web::{HttpMessage, HttpRequest, HttpResponse, AsyncResponder, FutureResponse};
use futures::Future;

use router::AppState;
use model::info::OuisrcInfo;

pub fn ouisrc_info(req: HttpRequest<AppState>) -> FutureResponse<HttpResponse> {
    req.state().db.send(OuisrcInfo)
        .from_err()
        .and_then(|res| {
            match res {
                Ok(msgs) => Ok(HttpResponse::Ok().json(msgs)),
                Err(_) => Ok(HttpResponse::InternalServerError().into())
            }
        }).responder()
}
