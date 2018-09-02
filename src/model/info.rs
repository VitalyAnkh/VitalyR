use actix_web::{Error,actix::Message};

#[derive(Deserialize,Serialize, Debug)]
pub struct OuisrcInfo;

impl Message for OuisrcInfo {
    type Result = Result<OuisrcInfoMsgs, Error>;
}

#[derive(Deserialize,Serialize, Debug)]
pub struct OuisrcInfoMsgs {
    pub status: i32,
    pub message : String,
    pub ouisrc_info : Vec<u32>,
}