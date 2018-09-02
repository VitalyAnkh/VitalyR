<template>
    <div id="theblog">
        <main >
            <div id="bcontainer">
                <div id="mei">
                    <div id="title">
                            <h1> {{ theme.title }} </h1> 
                            <span v-if="saveorno == false" id="save" @click="save">save</span>
                            <span v-else id="saved">saved</span>
                            <span id="like">like <span id="likeid">{{like}} </span> </span>
                            <span id="right"> 
                            <span id="info" class="first"><a :href="'/a/home/' + theme_category_name">blog</a></span> • 
                            <span id="info"><a :href="'/a/user/' + theme_user.id">{{ theme_user.username }}</a></span> •   
                            <span id="info">{{ theme_rtime }}</span>  
                            </span>
                    </div>
                </div>
                <div id="center">
                    <div id="theme">
                        <div id="content" v-html="theme.content" v-highlight> </div>
                    </div>
                    <hr>
                    <div id="comment">
                        <div id="count">Comment &nbsp; {{ theme.comment_count }} </div>
                        <div v-for="(comment, index) in theme_comments" :key="index">
                            <div id="detail">
                                <div id="infos">
                                    <span id="info" >{{ index + 1 }}&nbsp;</span>
                                    <span id="info"><a :href="'/a/user/' + comment.user_id">{{ comment.username }}</a></span> • <span id="info">{{ comment.rtime }}</span>
                                </div>
                                <div id="content" v-html="comment.content" v-highlight> </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div id="reply" v-if="signin_user">
                        <div id="messagenote">
                            <p><strong>Note: </strong>message fmt:[<strong>@username content</strong>]A Space between username and content</p>
                        </div>
                        <div id="editor">
                            <mavon-editor name="content" v-model="Content" :ishljs = "true" style="height: 100%;" :toolbars="set"></mavon-editor>
                        </div>
                        <button style="margin-top: 1vh;
                                        width:66px; 
                                        line-height:25px;
                                        background-color:#ffffff;
                                        border :1px solid #a39c9c;" type="submit" id="submit" @click="comment">评论
                        </button>
                    </div>  
                    <div v-else style="margin: 10px;">Please login fisrt then comment.
                        <a href="/a/signin" style="background-color:aqua;">Login</a>
                    </div>    
                </div>
            </div>
        </main>
    </div>
</template>

<script>
/* eslint-disable */
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import URLprefix from '../../config'
export default {
    name: 'theblog',
    components: {
        mavonEditor
    },
    data: function() {
        return {
            Content: '',
            theme: '',
            theme_user: '',
            theme_category_name: '',
            theme_rtime: '',
            theme_comments: '',
            signin_user: '',
            like: '',
            saveorno: '',
            set:{
                bold: true, 
                italic: true, 
                header: true, 
                quote: true, 
                ul: true, 
                link: true, 
                code: true, // code
                table: true, 
                trash: true, 
                fullscreen: true, 
                htmlcode: true, 
                preview: true, 
                help: true, 
                
                underline: false, 
                strikethrough: false, 
                mark: false, 
                ol: false, 
                 alignleft: false, 
                aligncenter: false, 
                alignright: false, 
                superscript: false, 
                subscript: false, 
                undo: false, 
                redo: false, 
                imagelink: false, 
                readmodel: false, 
                save: false, 
                navigation: false, 
                subfield: false, 
            }
        }
    },
    mounted: function() {
        this.saveorno = false
        let theme_id = this.$route.params.id
        if (localStorage.getItem('signin_user')){
            this.signin_user = JSON.parse(localStorage.getItem('signin_user'))
            let user_id = JSON.parse(localStorage.getItem('signin_user')).id
            let data = { 
                theme_id: Number.parseInt(theme_id),
                user_id: user_id
            }
            fetch(URLprefix + 'api/blog/like', {
                  body: JSON.stringify(data), 
                  headers: {
                    'content-type': 'application/json'
                  },
                  method: 'POST',
                  mode: 'cors'
              }).then(response => response.json())
              .then(json => {
                  this.like = json.number
                  this.saveorno = json.saveorno
              })
              .catch((e) => {
                console.log(e)
              })
        }else{
            let user_id = 0
            let data = { 
                theme_id: Number.parseInt(theme_id),
                user_id: user_id
            }
            fetch(URLprefix + 'api/blog/like', {
                  body: JSON.stringify(data), 
                  headers: {
                    'content-type': 'application/json'
                  },
                  method: 'POST',
                  mode: 'cors'
              }).then(response => response.json())
              .then(json => {
                  this.like = json.number
                  this.saveorno = json.saveorno
              })
              .catch((e) => {
                console.log(e)
              })
        }
        
        fetch(URLprefix + 'api/theme/'+ this.$route.params.id,{
            method: 'GET',
        }).then(response => response.json())
        .then(json => {
            this.theme = json.theme
            this.theme_user = json.theme_user
            this.theme_rtime = json.theme_rtime
            this.theme_category_name = json.theme_category_name
            this.theme_comments = json.theme_comments
        }).catch((e) => {
            console.log(e)
        })
  },
  methods: {
    comment () {
        let comment = this.Content
        let theme_id = this.$route.params.id
        let user_id = JSON.parse(localStorage.getItem('signin_user')).id
        let theme_user_id = this.theme_user.id
        let data = {
            theme_id: Number.parseInt(theme_id),
            theme_user_id: Number.parseInt(theme_user_id),
            user_id: Number.parseInt(user_id),
            comment: comment
        }
        if(comment == ''){
                alert("comment can't be null")
                return
        }else{
            fetch(URLprefix + 'api/theme/' + this.$route.params.id, {
                  body: JSON.stringify(data), 
                  headers: {
                    'content-type': 'application/json'
                  },
                  method: 'POST',
                  mode: 'cors'
              }).then(response => response.json())
              .then(json => {
                  window.location.reload ( true ) 
              })
              .catch((e) => {
                console.log(e)
              })  
        }
    },
    save(){
        if (localStorage.getItem('signin_user')){
            let save = document.getElementById("save")
            let likeid = document.getElementById("likeid")
            save.style.color = "green"
            save.innerHTML = "saved"
            likeid.innerHTML = Number.parseInt(likeid.innerHTML) + 1
            let user_id = JSON.parse(localStorage.getItem('signin_user')).id
            let theme_id = this.$route.params.id
            let data = { 
                user_id: Number.parseInt(user_id),
                theme_id: Number.parseInt(theme_id)
            }
            fetch(URLprefix + 'api/blog/save', {
                  body: JSON.stringify(data), 
                  headers: {
                    'content-type': 'application/json'
                  },
                  method: 'POST',
                  mode: 'cors'
              }).then(response => response.json())
              .then(json => {
                  window.location.reload ( true )
              })
              .catch((e) => {
                console.log(e)
              })
        }
    }
  }
}
</script>

<style>
#theblog #center {
    line-height: 1.8rem;
    background-color: #ffffff;
}
#theblog #center #content {
    padding: 0.5rem;
    word-break: break-all;
    word-wrap: break-word;
}
#theblog a {
    color: #0541af;
}
#theblog #center #comment, #theblog #center #reply {
    border-top: 1px solid fuchsia;
}
#theblog hr {
    height: 11px;
    background-color: #faf5f5;
    border: 0;
}
#theblog #center #comment #count {
    font-weight: bold;
    color: fuchsia;
    padding: 10px;
    border-bottom: 1px solid rgb(223, 223, 223);
}
#theblog #center #comment #detail {
    border-bottom: 1px solid rgb(223, 223, 223);
}
#theblog #center #comment #detail #infos{
    margin: 10px;
    margin-bottom: 10px;
}
#theblog #center #comment #detail #info{
    display: inline-block;
    font-size: 14px;
}
#theblog #reply #messagenote {
    color: fuchsia;
}
#theblog #center h1,
#theblog #center h2,
#theblog #center h3,
#theblog #center h4,
#theblog #center h5,
#theblog #center h6 {
    padding: 1.1vh 0;
}
#theblog #center #editor {
    margin: 0 auto;
    height: 333px;
}
#theblog #center iframe {
    margin: 0.5rem auto;
    width: 99%;
}
#theblog #center img {
        margin: 1rem auto;
        padding: 0.1rem;
        width: 100%;
}
#theblog #center blockquote {
    padding: 0.8rem;
    border-left: 5px solid #ccc;
    background: ghostwhite;
    width: 100%;
}
#theblog #center ul li {
    margin: 1vh 0;
    padding: 0 0.5vw;
    border-left: 2px solid var(--purple);
}
#theblog #center ol li {
    margin: 1vh 1vw;
    list-style-type:decimal;
}
#theblog #center table {
    padding: 0.3rem;
    border: 2px solid  #aaa;
}
#theblog #center table td {
    padding: 0.5rem;
    border-top: 1px solid  #aaa;
}
#theblog #center pre {
    display: block;
    padding: 5px;
    margin: 5px 0;
    line-height: 1.5;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #fcf4fc;
    border: 1px solid rgb(246, 226, 252);
    text-shadow: none;
}

#theblog #center code {
    padding: 2px 4px;
    background-color: #f5f5f5;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: var(--purple);
    text-shadow: none;
}

#theblog #center pre code {
    padding: 0;
    font-size: inherit;
    color: inherit;
    /* white-space: pre-wrap; */
    background-color: transparent;
    border-radius: 0;
    border: 0;
}
#theblog #mei {
    background:url(../../../static/imgs/baner.png) no-repeat;
    background-size:100% 100%;
}
#theblog #mei h1 {
    color: #00FF00;
}
#theblog #mei #title {
    color: yellow;
}
@media only screen and (max-width: 600px) {
    #theblog {
        margin: 2vh auto;
        width: 97%;
    }
    #theblog #mei {
        margin: -1vh 0 1vh;
        padding: 1rem;
    }
    #theblog #mei h1 {
        text-align: center;
        padding: 3rem 1rem;
        font-size: 1.8rem;
        vertical-align: middle;
    }
    #theblog #mei #title #save, #theblog #mei #title #saved {
        font-size: 0.8rem;
        margin-left: 0.5rem;
        padding: 0.8vh 0.9vw 0.3vh 0.7vw;
    }
    #theblog #mei #title #save {
        border: 0.1px solid fuchsia;
    }
    #theblog #mei #title #saved {
        color:  #00FF00;
    }
    #theblog #mei #title #like {
        font-size: 0.85rem;
        margin-left: 0.5rem;
    }
    #theblog #mei #title #right {
        float: right;
        font-size: 0.85rem;
        margin-right: 0.5rem;
    }
}
@media only screen and (min-width: 600px) and (max-width: 850px) {
    #theblog main{
        margin: 0 auto;
        width: 80%;
        padding-top: 77px;
    }
    #theblog #mei {
        padding: 1rem;
    }
    #theblog #mei h1 {
        text-align: center;
        margin: 4rem 2rem;
        font-size: 1.8rem;
        vertical-align: middle;
    }
    #theblog #mei #title #save, #theblog #mei #title #saved {
        font-size: 0.9rem;
        margin-left: 2rem;
        padding: 0.8vh 0.5vw 0.3vh 0.4vw;
    }
    #theblog #mei #title #save {
        border: 0.1px solid fuchsia;
    }
    #theblog #mei #title #saved {
        color:  #00FF00;
    }
    #theblog #mei #title #like {
        font-size: 0.9rem;
        margin-left: 1rem;
    }
    #theblog #mei #title #right {
        float: right;
        font-size: 1rem;
        margin-right: 2rem;
    }
}
@media only screen and (min-width: 850px) {
    #theblog {
        margin: 0 auto;
        width: 60%;
        padding-top: 77px;
    }
    #theblog #mei {
        padding: 1rem;
    }
    #theblog #mei h1 {
        text-align: center;
        margin: 6rem 3rem;
        font-size: 2rem;
        vertical-align: middle;
    }
    #theblog #mei #title #save, #theblog #mei #title #saved {
        font-size: 0.9rem;
        margin-left: 4rem;
        padding: 0.8vh 0.3vw 0.3vh 0.2vw;
    }
    #theblog #mei #title #save {
        border: 0.1px solid fuchsia;
    }
    #theblog #mei #title #saved {
        color:  #00FF00;
    }
    #theblog #mei #title #like {
        font-size: 0.9rem;
        margin-left: 2rem;
    }
    #theblog #mei #title #right {
        float: right;
        font-size: 0.9rem;
        margin-right: 2rem;
    }
}
</style>