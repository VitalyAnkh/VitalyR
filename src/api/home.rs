use actix_web::{fs::NamedFile, HttpRequest, Error, Result};
use router::AppState;

pub fn home(_req: &HttpRequest<AppState>) -> Result<NamedFile> {
    Ok(NamedFile::open("home/index.html")?)
}

pub fn path(_req: &HttpRequest<AppState>) -> Result<NamedFile> {
    Ok(NamedFile::open("public/index.html")?)
}