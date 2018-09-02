<template>
    <div id="theme">
        <main id="main">
            <div id="container">
                <div id="center">
                    <div id="theme">
                        <div id="title">
                            <h2> {{ theme.title }} </h2> 
                            <span id="info"><a :href="'/a/home/' + theme_category_name">{{ theme_category_name }}</a></span> • 
                            <span id="info"><a :href="'/a/user/' + theme_user.id">{{ theme_user.username }}</a></span> •   
                            <span id="info">{{ theme_rtime }}</span>  
                        </div>
                        <div id="content" v-html="theme.content" v-highlight> </div>
                    </div>
                    <hr>
                    <div id="comment">
                        <div id="count">Comment &nbsp; {{ theme.comment_count }} </div>
                        <div v-for="(comment, index) in theme_comments" :key="index">
                            <div id="detail">
                                <div id="infos">
                                    <span id="info" >{{ index + 1 }}&nbsp;</span>
                                    <span id="info"><a :href="'/a/user/' + comment.user_id">{{ comment.username }}</a></span> • 
                                    <span id="info">{{ comment.rtime }}</span>
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
                <side></side>
            </div>
        </main>
    </div>
</template>

<script>
/* eslint-disable */
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import URLprefix from '../../config'
import Side from '../../components/side/Side'
export default {
    name: 'theme',
    components: {
        mavonEditor,
        "side": Side
    },
    data: function() {
        return {
            Content: '',
            theme: '',
            theme_user: '',
            theme_category_name: '',
            theme_category_name_cn: '',
            theme_rtime: '',
            theme_comments: '',
            signin_user: '',
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
        if (localStorage.getItem('signin_user')){
            this.signin_user = JSON.parse(localStorage.getItem('signin_user'))
        }
        fetch(URLprefix + 'api/theme/'+ this.$route.params.id,{
            method: 'GET',
        }).then(response => response.json())
        .then(json => {
            this.theme = json.theme
            this.theme_user = json.theme_user
            this.theme_rtime = json.theme_rtime
            this.theme_category_name_cn = json.theme_category_name_cn
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
    }
  }
}
</script>

<style>
#main #center {
    line-height: 1.8rem;
    background-color: #ffffff;
}
#main #center #content {
    padding: 0.5rem;
    word-break: break-all;
    word-wrap: break-word;
}
#main a {
    color: #0541af;
}
#main #center #theme, #main #center #comment, #main #center #reply {
    border-top: 1px solid fuchsia;
}
#main #center #theme > #title {
    margin-top: 2px;
    padding: 10px;
    border-bottom: 1px solid rgb(223, 223, 223);
}
#main #center #theme > #title h2 { 
    padding-bottom: 0.3rem;
}
#main #center #theme > #title #info {
    display: inline-block;
    font-size: 14px;
}
#main hr {
    height: 11px;
    background-color: #faf5f5;
    border: 0;
}
#main #center #comment > #count {
    font-weight: bold;
    color: fuchsia;
    padding: 10px;
    border-bottom: 1px solid rgb(223, 223, 223);
}
#main #center #comment #detail {
    border-bottom: 1px solid rgb(223, 223, 223);
}
#main #center #comment #detail #infos{
    margin: 10px;
    margin-bottom: 10px;
}
#main #center #comment #detail #info{
    display: inline-block;
    font-size: 14px;
}
#main #center h1,
#main #center h2,
#main #center h3,
#main #center h4,
#main #center h5,
#main #center h6 {
    padding: 1.1vh 0;
}
#main #center #editor {
    margin: auto;
    height: 333px;
}
#main #reply #messagenote {
    color: fuchsia;
}

#main #center iframe {
    margin: 0.5rem auto;
    width: 99%;
}
#main #center img {
    margin: 1rem auto;
    padding: 0.1rem;
    width: 100%;
}
#main #center blockquote {
    padding: 0.8rem;
    border-left: 5px solid #ccc;
    background: ghostwhite;
    width: 100%;
}
#main #center ul li {
    margin: 1vh 0;
    padding: 0 0.5vw;
    border-left: 2px solid var(--purple);
}
#main #center ol li {
    margin: 1vh 1rem;
    list-style-type:decimal;
}
#main #center table {
    padding: 0.3rem;
    border: 2px solid  #aaa;
}
#main #center table td {
    padding: 0.5rem;
    border-top: 1px solid  #aaa;
}
#main #center pre {
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
#main #center code {
    padding: 2px 4px;
    background-color: #f5f5f5;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: var(--purple);
    text-shadow: none;
}
#main #center pre code {
    padding: 0;
    font-size: inherit;
    color: inherit;
    /* white-space: pre-wrap; */
    background-color: transparent;
    border-radius: 0;
    border: 0;
}

@media only screen and (max-width: 600px) {
    #main  {
       margin: 2vh auto;
       width: 97%;
    }
    #main #center iframe {
        height: 320px;
    }
}
@media only screen and (min-width: 600px) and (max-width: 850px) {
    #main {
        margin: 0 auto;
        width: 80%;
        padding-top: 77px;
    }
    #main #container {
      display: flex;
      flex-flow: row;
    }
    #main #container #center {
        width: 90%;
        margin-right: 1vw;
    }
    #main #container #side {
        flex: 1;
    }
    #main #center iframe {
        height: 280px;
    }
}
@media only screen and (min-width: 850px) {
    #main {
        margin: 0 auto;
        width: 72%;
        padding-top: 77px;
    }
    #main #container {
      display: flex;
      flex-flow: row;
    }
    #main #container #center {
        width: 80%;
        margin-right: 1vw;
    }
    #main #container #side {
        flex: 1;
    }
}
</style>